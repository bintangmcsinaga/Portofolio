import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { certifications, experiences, profile, skills } from '../src/data/profile.js';
import { projects } from '../src/data/projects.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pdfOutput = new URL('../public/Bintang-Sinaga-CV-ATS.pdf', import.meta.url);
const txtOutput = new URL('../public/Bintang-Sinaga-CV-ATS.txt', import.meta.url);
const portfolioUrl = profile.portfolio || 'https://bintang.web.id';

const PAGE = {
    width: 612,
    height: 792,
    marginX: 54,
    marginY: 48,
};

const styles = {
    title: { font: 'F2', size: 19, leading: 23 },
    subtitle: { font: 'F1', size: 11, leading: 14 },
    contact: { font: 'F1', size: 9.5, leading: 12 },
    section: { font: 'F2', size: 11.5, leading: 17, before: 9 },
    subheading: { font: 'F2', size: 10.5, leading: 14, before: 4 },
    meta: { font: 'F1', size: 9.5, leading: 12 },
    body: { font: 'F1', size: 9.8, leading: 13 },
    bullet: { font: 'F1', size: 9.6, leading: 12.6, indent: 12 },
    compact: { font: 'F1', size: 9.2, leading: 11.7 },
};

const cleanText = (value) =>
    String(value ?? '')
        .replace(/â€‘|â€“|â€”/g, '-')
        .replace(/â€˜|â€™/g, "'")
        .replace(/â€œ|â€/g, '"')
        .replace(/Â/g, '')
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201c\u201d]/g, '"')
        .replace(/[\u2010-\u2015]/g, '-')
        .replace(/\u00a0/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/[^\x20-\x7e]/g, '')
        .trim();

const stripNoise = (value) => cleanText(value).replace(/^Feature:\s*/i, '');

const normalizeUrl = (value) => cleanText(value).replace(/^https?:\/\//, '').replace(/\/$/, '');

const wrapText = (text, maxChars) => {
    const words = cleanText(text).split(' ').filter(Boolean);
    const lines = [];
    let current = '';

    words.forEach((word) => {
        if (!current) {
            current = word;
            return;
        }

        if (`${current} ${word}`.length <= maxChars) {
            current = `${current} ${word}`;
            return;
        }

        lines.push(current);
        current = word;
    });

    if (current) lines.push(current);
    return lines.length ? lines : [''];
};

const escapePdf = (value) =>
    cleanText(value)
        .replace(/\\/g, '\\\\')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)');

const gfExp = new Array(512);
const gfLog = new Array(256);
let gfValue = 1;
for (let i = 0; i < 255; i += 1) {
    gfExp[i] = gfValue;
    gfLog[gfValue] = i;
    gfValue <<= 1;
    if (gfValue & 0x100) gfValue ^= 0x11d;
}
for (let i = 255; i < gfExp.length; i += 1) {
    gfExp[i] = gfExp[i - 255];
}

const gfMultiply = (left, right) => {
    if (left === 0 || right === 0) return 0;
    return gfExp[gfLog[left] + gfLog[right]];
};

const appendBits = (bits, value, length) => {
    for (let i = length - 1; i >= 0; i -= 1) {
        bits.push((value >>> i) & 1);
    }
};

const bitsToCodewords = (bits) => {
    const codewords = [];
    for (let i = 0; i < bits.length; i += 8) {
        let value = 0;
        for (let j = 0; j < 8; j += 1) {
            value = (value << 1) | (bits[i + j] ?? 0);
        }
        codewords.push(value);
    }
    return codewords;
};

const reedSolomonDivisor = (degree) => {
    const result = Array(degree).fill(0);
    result[degree - 1] = 1;
    let root = 1;

    for (let i = 0; i < degree; i += 1) {
        for (let j = 0; j < degree; j += 1) {
            result[j] = gfMultiply(result[j], root);
            if (j + 1 < degree) result[j] ^= result[j + 1];
        }
        root = gfMultiply(root, 0x02);
    }

    return result;
};

const reedSolomonRemainder = (data, divisor) => {
    const result = Array(divisor.length).fill(0);

    data.forEach((codeword) => {
        const factor = codeword ^ result.shift();
        result.push(0);
        divisor.forEach((coefficient, index) => {
            result[index] ^= gfMultiply(coefficient, factor);
        });
    });

    return result;
};

const buildQrCodewords = (text) => {
    const bytes = [...Buffer.from(text, 'utf8')];
    const dataCodewordCount = 28;
    const bits = [];

    appendBits(bits, 0x04, 4);
    appendBits(bits, bytes.length, 8);
    bytes.forEach((byte) => appendBits(bits, byte, 8));

    const maxDataBits = dataCodewordCount * 8;
    appendBits(bits, 0, Math.min(4, maxDataBits - bits.length));
    while (bits.length % 8 !== 0) bits.push(0);

    const dataCodewords = bitsToCodewords(bits);
    const pads = [0xec, 0x11];
    let padIndex = 0;
    while (dataCodewords.length < dataCodewordCount) {
        dataCodewords.push(pads[padIndex % pads.length]);
        padIndex += 1;
    }

    return [...dataCodewords, ...reedSolomonRemainder(dataCodewords, reedSolomonDivisor(16))];
};

const qrMask = (x, y) => (x + y) % 2 === 0;

const createQrMatrix = (text) => {
    const size = 25;
    const modules = Array.from({ length: size }, () => Array(size).fill(false));
    const isFunction = Array.from({ length: size }, () => Array(size).fill(false));

    const setFunctionModule = (x, y, dark) => {
        if (x < 0 || y < 0 || x >= size || y >= size) return;
        modules[y][x] = dark;
        isFunction[y][x] = true;
    };

    const drawFinder = (centerX, centerY) => {
        for (let y = -4; y <= 4; y += 1) {
            for (let x = -4; x <= 4; x += 1) {
                const distance = Math.max(Math.abs(x), Math.abs(y));
                setFunctionModule(centerX + x, centerY + y, distance !== 2 && distance !== 4);
            }
        }
    };

    const drawAlignment = (centerX, centerY) => {
        for (let y = -2; y <= 2; y += 1) {
            for (let x = -2; x <= 2; x += 1) {
                const distance = Math.max(Math.abs(x), Math.abs(y));
                setFunctionModule(centerX + x, centerY + y, distance !== 1);
            }
        }
    };

    const reserveFormatAreas = () => {
        for (let i = 0; i <= 5; i += 1) {
            setFunctionModule(8, i, false);
            setFunctionModule(i, 8, false);
        }
        setFunctionModule(8, 7, false);
        setFunctionModule(8, 8, false);
        setFunctionModule(7, 8, false);
        for (let i = 9; i < 15; i += 1) setFunctionModule(14 - i, 8, false);
        for (let i = 0; i < 8; i += 1) setFunctionModule(size - 1 - i, 8, false);
        for (let i = 8; i < 15; i += 1) setFunctionModule(8, size - 15 + i, false);
        setFunctionModule(8, size - 8, true);
    };

    const drawFormatBits = () => {
        const formatData = 0;
        let remainder = formatData;
        for (let i = 0; i < 10; i += 1) {
            remainder = (remainder << 1) ^ (((remainder >>> 9) & 1) * 0x537);
        }
        const bits = ((formatData << 10) | remainder) ^ 0x5412;
        const bit = (index) => ((bits >>> index) & 1) === 1;

        for (let i = 0; i <= 5; i += 1) setFunctionModule(8, i, bit(i));
        setFunctionModule(8, 7, bit(6));
        setFunctionModule(8, 8, bit(7));
        setFunctionModule(7, 8, bit(8));
        for (let i = 9; i < 15; i += 1) setFunctionModule(14 - i, 8, bit(i));
        for (let i = 0; i < 8; i += 1) setFunctionModule(size - 1 - i, 8, bit(i));
        for (let i = 8; i < 15; i += 1) setFunctionModule(8, size - 15 + i, bit(i));
        setFunctionModule(8, size - 8, true);
    };

    drawFinder(3, 3);
    drawFinder(size - 4, 3);
    drawFinder(3, size - 4);
    for (let i = 0; i < size; i += 1) {
        if (!isFunction[6][i]) setFunctionModule(i, 6, i % 2 === 0);
        if (!isFunction[i][6]) setFunctionModule(6, i, i % 2 === 0);
    }
    drawAlignment(18, 18);
    reserveFormatAreas();

    const codewords = buildQrCodewords(text);
    let bitIndex = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
        if (right === 6) right -= 1;
        for (let vertical = 0; vertical < size; vertical += 1) {
            for (let column = 0; column < 2; column += 1) {
                const x = right - column;
                const upward = ((right + 1) & 2) === 0;
                const y = upward ? size - 1 - vertical : vertical;
                if (isFunction[y][x]) continue;

                let dark = false;
                if (bitIndex < codewords.length * 8) {
                    dark = ((codewords[bitIndex >>> 3] >>> (7 - (bitIndex & 7))) & 1) === 1;
                }
                modules[y][x] = dark !== qrMask(x, y);
                bitIndex += 1;
            }
        }
    }

    drawFormatBits();
    return modules;
};

const renderPortfolioQr = () => {
    const matrix = createQrMatrix(portfolioUrl);
    const size = 74;
    const quietZone = 4;
    const moduleSize = size / (matrix.length + quietZone * 2);
    const x = PAGE.width - PAGE.marginX - size;
    const y = PAGE.height - PAGE.marginY - size;
    const operations = [
        'q',
        '1 1 1 rg',
        `${x.toFixed(2)} ${y.toFixed(2)} ${size.toFixed(2)} ${size.toFixed(2)} re f`,
        '0 0 0 rg',
    ];

    matrix.forEach((row, rowIndex) => {
        row.forEach((dark, columnIndex) => {
            if (!dark) return;
            const moduleX = x + (columnIndex + quietZone) * moduleSize;
            const moduleY = y + size - (rowIndex + quietZone + 1) * moduleSize;
            operations.push(`${moduleX.toFixed(2)} ${moduleY.toFixed(2)} ${moduleSize.toFixed(2)} ${moduleSize.toFixed(2)} re f`);
        });
    });

    operations.push('Q');
    operations.push(`BT /F1 7 Tf ${x.toFixed(2)} ${(y - 10).toFixed(2)} Td (${escapePdf(normalizeUrl(portfolioUrl))}) Tj ET`);
    return operations;
};

const addLine = (items, text, style = 'body', options = {}) => {
    items.push({ text: cleanText(text), style, ...options });
};

const addBullet = (items, text, options = {}) => {
    items.push({ text: stripNoise(text), style: 'bullet', bullet: true, ...options });
};

const addSpace = (items, height = 5) => {
    items.push({ type: 'space', height });
};

const buildItems = () => {
    const items = [];
    const contact = [
        profile.location,
        profile.email,
        normalizeUrl(portfolioUrl),
        normalizeUrl(profile.socials.github),
        normalizeUrl(profile.socials.linkedin),
    ].filter(Boolean);

    addLine(items, profile.name.toUpperCase(), 'title');
    addLine(items, profile.role, 'subtitle');
    addLine(items, contact.join(' | '), 'contact', { maxChars: 70 });
    addSpace(items, 44);

    addLine(items, 'PROFESSIONAL SUMMARY', 'section');
    addLine(items, profile.summary, 'body');
    addSpace(items, 4);

    addLine(items, 'TECHNICAL SKILLS', 'section');
    addLine(items, skills.map((skill) => skill.name).join(', '), 'body');
    addSpace(items, 4);

    addLine(items, 'PROFESSIONAL EXPERIENCE', 'section');
    experiences.forEach((experience) => {
        addLine(items, `${experience.role} | ${experience.company}`, 'subheading');
        addLine(items, `${experience.period} | ${experience.location}`, 'meta');
        experience.highlights.forEach((highlight) => addBullet(items, highlight));
        addSpace(items, 3);
    });

    addLine(items, 'SELECTED PROJECTS', 'section');
    projects.forEach((project) => {
        addLine(items, `${project.title} | ${project.role} | ${project.date}`, 'subheading');
        addLine(items, `Tech: ${project.tags.join(', ')}`, 'meta');
        addLine(items, project.description, 'compact');
        project.features.slice(0, 4).forEach((feature) => addBullet(items, feature));
        if (project.viewCode) addLine(items, `Code: ${normalizeUrl(project.viewCode)}`, 'compact');
        addSpace(items, 3);
    });

    addLine(items, 'CERTIFICATIONS', 'section');
    certifications.forEach((certification) => {
        addBullet(
            items,
            `${certification.name} - ${certification.issuer}, ${certification.date} (${certification.credentialId})`
        );
    });

    return items;
};

const renderPages = (items) => {
    const pages = [];
    let operations = renderPortfolioQr();
    let y = PAGE.height - PAGE.marginY;

    const newPage = () => {
        if (operations.length) pages.push(operations.join('\n'));
        operations = [];
        y = PAGE.height - PAGE.marginY;
    };

    const writeText = (text, styleName, x) => {
        const style = styles[styleName];
        operations.push(`BT /${style.font} ${style.size} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${escapePdf(text)}) Tj ET`);
        y -= style.leading;
    };

    items.forEach((item) => {
        if (item.type === 'space') {
            y -= item.height;
            return;
        }

        const style = styles[item.style] ?? styles.body;
        if (style.before) y -= style.before;

        const indent = item.indent ?? style.indent ?? 0;
        const x = PAGE.marginX + indent;
        const contentWidth = PAGE.width - PAGE.marginX * 2 - indent;
        const maxChars = item.maxChars ?? Math.max(32, Math.floor(contentWidth / (style.size * 0.5)));
        const wrapped = item.bullet
            ? wrapText(item.text, maxChars - 2).map((line, index) => `${index === 0 ? '- ' : '  '}${line}`)
            : wrapText(item.text, maxChars);

        wrapped.forEach((line) => {
            if (y - style.leading < PAGE.marginY) newPage();
            writeText(line, item.style, x);
        });
    });

    if (operations.length) pages.push(operations.join('\n'));
    return pages;
};

const createPdf = (pageStreams) => {
    const objects = [];
    const pageRefs = [];
    let nextId = 5;

    objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
    objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
    objects[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';

    pageStreams.forEach((stream) => {
        const contentId = nextId;
        const pageId = nextId + 1;
        nextId += 2;

        objects[contentId] = `<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream`;
        objects[pageId] =
            `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE.width} ${PAGE.height}] ` +
            `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`;
        pageRefs.push(`${pageId} 0 R`);
    });

    objects[2] = `<< /Type /Pages /Kids [${pageRefs.join(' ')}] /Count ${pageRefs.length} >>`;

    const maxId = objects.length - 1;
    const offsets = [0];
    let pdf = '%PDF-1.4\n% ATS friendly resume generated from project data\n';

    for (let id = 1; id <= maxId; id += 1) {
        offsets[id] = Buffer.byteLength(pdf, 'utf8');
        pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
    }

    const xrefOffset = Buffer.byteLength(pdf, 'utf8');
    pdf += `xref\n0 ${maxId + 1}\n`;
    pdf += '0000000000 65535 f \n';
    for (let id = 1; id <= maxId; id += 1) {
        pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
    }
    pdf += `trailer\n<< /Size ${maxId + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

    return pdf;
};

const createPlainText = (items) =>
    items
        .map((item) => {
            if (item.type === 'space') return '';
            if (item.bullet) return `- ${stripNoise(item.text)}`;
            return cleanText(item.text);
        })
        .join('\n')
        .replace(/\n{3,}/g, '\n\n');

const items = buildItems();
const pageStreams = renderPages(items);

mkdirSync(dirname(fileURLToPath(pdfOutput)), { recursive: true });
writeFileSync(pdfOutput, createPdf(pageStreams));
writeFileSync(txtOutput, createPlainText(items));

console.log(`Generated ${pageStreams.length} PDF page(s) from project data in ${__dirname}.`);
