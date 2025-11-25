import GoTobaLogo from './assets/images/GoToba/Logo.png'
import ProfilePhoto from './assets/images/ProfilePhoto.jpg'

const home_picture = "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d"

const logotext = "Bintang";
const meta = {
    title: "Bintang Sinaga",
    description: "i`m Bintang Sinaga, Back-End developer in North Sumatera Indonesia ",
};

const introdata = {
    title: "I’m Bintang",
    animated: {
        first: "My life is for code",
        second: "I serverless app",
        third: "I develop mobile apps",
    },
    description: "A tech enthusiast with a passion for developing scalable applications and implementing efficient workflows. Constantly learning and evolving to deliver impactful solutions in the tech industry.",
    your_img_url: home_picture,
};

const dataabout = {
    title: "a bit about my self",
    aboutme: "I'm a passionate Backend & Mobile Developer who loves turning ideas into scalable, efficient, and user-friendly applications. With a strong focus on backend development using Node.js (Express) and mobile development with Flutter, I enjoy crafting seamless experiences that work flawlessly across platforms.\nI have a deep interest in building robust APIs, optimizing databases, and implementing modern DevOps practices like Docker, Kubernetes, and CI/CD pipelines, ensuring smooth deployments and maintenance. My goal is to bridge the gap between technology and user needs by delivering secure, high-performance solutions.\nWhen I'm not coding, I enjoy exploring new technologies, learning about the latest trends in software development, and working on projects that challenge my skills and creativity. Always eager to collaborate, innovate, and push the boundaries of what's possible with technology.",
};
const worktimeline = [{
        jobtitle: "Mobile app developer",
        where: "Mikroskil University",
        date: "2024",
    },

];

const skills = [{
        name: "Python",
        value: 90,
    },
    {
        name: "flask",
        value: 85,
    },
    {
        name: "Javascript",
        value: 80,
    },
    {
        name: "React",
        value: 60,
    },
    {
        name: "MongoDB",
        value: 85,
    },
    {
        name: "Kubernetes",
        value: 70,
    },
    {
        name: "Docker",
        value: 70,
    },
    {
        name: "Flutter",
        value: 90,
    },
];

const services = [{
        title: "Back-End Developer",
        description: "A Backend Developer focuses on building and maintaining the server-side logic, databases, and APIs that power applications. They ensure data processing, security, and system scalability, working with technologies like Node.js, Python, PostgreSQL, MongoDB, and cloud services to deliver efficient and reliable backend solutions.",
    },
    {
        title: "Mobile Apps Developer",
        description: "A Mobile Apps Developer specializes in designing and developing applications for mobile platforms such as Android and iOS, ensuring smooth performance and an intuitive user experience. Using frameworks like Flutter or Kotlin, they create cross-platform applications that are visually appealing, responsive, and optimized for various devices.",
    },
    {
        title: "DevOps Engineer",
        description: "A DevOps Engineer focuses on bridging the gap between development and operations by automating, optimizing, and securing the software development lifecycle. They work with tools and practices such as CI/CD pipelines, containerization (Docker, Kubernetes), cloud platforms (AWS, GCP, Azure), and infrastructure as code (Terraform, Ansible) to ensure seamless deployment, scalability, and reliability of applications.",
    },
];

const dataportfolio = [{
        projectName:'GoToba App' ,
        img: GoTobaLogo,
        description: "This is a mobile application that offers booking services for hotels, boats, and buses specifically for the Danau Toba region in North Sumatra, Indonesia.",
        link: "https://github.com/zagasaki/sistem-rekomendasi-pariwisata-danau-toba",
    },

];

const contactConfig = {
    YOUR_EMAIL: "bintangsinaga007@gmail.com",
    YOUR_FONE: "(62)821-7868-2824",
    description: "Feel free to reach out for collaboration, inquiries, or just to connect! Whether you have a project idea, need technical support, or want to discuss the latest trends in technology, I'd love to hear from you. ",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
};

const socialprofils = {
    github: "https://github.com/zagasaki",
    facebook: "https://facebook.com",
    linkedin: "https://www.linkedin.com/in/bintang-sinaga-62b552229/",
    twitter: "https://twitter.com",
};
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};