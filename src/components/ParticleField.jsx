import { useEffect, useRef } from 'react';

const DUST_COUNT = 50;
const STAR_COUNT = 12;

// Predefined constellation patterns (normalized 0-1 coords, scaled to canvas)
const CONSTELLATIONS = [
    // Orion-like (left area)
    {
        stars: [
            { x: 0.12, y: 0.2 },
            { x: 0.18, y: 0.15 },
            { x: 0.24, y: 0.18 },
            { x: 0.18, y: 0.35 },
            { x: 0.15, y: 0.5 },
            { x: 0.21, y: 0.52 },
            { x: 0.18, y: 0.65 },
        ],
        lines: [[0, 1], [1, 2], [1, 3], [3, 4], [3, 5], [4, 6], [5, 6]],
    },
    // Cassiopeia-like W shape (right area)
    {
        stars: [
            { x: 0.68, y: 0.22 },
            { x: 0.74, y: 0.38 },
            { x: 0.80, y: 0.20 },
            { x: 0.86, y: 0.40 },
            { x: 0.92, y: 0.18 },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
    },
    // Small triangle (center)
    {
        stars: [
            { x: 0.45, y: 0.25 },
            { x: 0.52, y: 0.12 },
            { x: 0.55, y: 0.30 },
        ],
        lines: [[0, 1], [1, 2], [2, 0]],
    },
];

const ParticleField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let time = 0;

        // Small dust particles
        const dust = Array.from({ length: DUST_COUNT }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 1.2 + 0.3,
            dx: (Math.random() - 0.5) * 0.12,
            dy: (Math.random() - 0.5) * 0.08,
            opacity: Math.random() * 0.3 + 0.05,
        }));

        // Bright twinkling stars
        const stars = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 2 + 1.5,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.02 + 0.008,
            minOpacity: 0.3,
            maxOpacity: 0.9,
        }));

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);
            time += 1;

            // Draw dust
            for (const p of dust) {
                p.x += p.dx / w;
                p.y += p.dy / h;
                if (p.x < 0) p.x = 1;
                if (p.x > 1) p.x = 0;
                if (p.y < 0) p.y = 1;
                if (p.y > 1) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.fill();
            }

            // Draw constellation lines
            for (const c of CONSTELLATIONS) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
                ctx.lineWidth = 0.8;
                for (const [a, b] of c.lines) {
                    const sa = c.stars[a];
                    const sb = c.stars[b];
                    ctx.beginPath();
                    ctx.moveTo(sa.x * w, sa.y * h);
                    ctx.lineTo(sb.x * w, sb.y * h);
                    ctx.stroke();
                }

                // Draw constellation stars (small dots at nodes)
                for (const s of c.stars) {
                    const twinkle = 0.15 + Math.sin(time * 0.015 + s.x * 20) * 0.1;
                    ctx.beginPath();
                    ctx.arc(s.x * w, s.y * h, 1.8, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${twinkle + 0.15})`;
                    ctx.fill();
                }
            }

            // Draw bright twinkling stars with glow
            for (const s of stars) {
                const pulse = Math.sin(time * s.speed + s.phase);
                const opacity = s.minOpacity + (s.maxOpacity - s.minOpacity) * ((pulse + 1) / 2);
                const sx = s.x * w;
                const sy = s.y * h;

                // Outer glow
                const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 4);
                glow.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.3})`);
                glow.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 0.08})`);
                glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.beginPath();
                ctx.arc(sx, sy, s.r * 4, 0, Math.PI * 2);
                ctx.fillStyle = glow;
                ctx.fill();

                // Core
                ctx.beginPath();
                ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.fill();

                // Cross-shaped twinkle rays
                const rayLen = s.r * 3 * ((pulse + 1) / 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(sx - rayLen, sy);
                ctx.lineTo(sx + rayLen, sy);
                ctx.moveTo(sx, sy - rayLen);
                ctx.lineTo(sx, sy + rayLen);
                ctx.stroke();
            }

            animationId = requestAnimationFrame(draw);
        };

        resize();
        draw();

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-x-0 top-0 z-[5] h-[25vh] w-full"
            aria-hidden="true"
        />
    );
};

export default ParticleField;
