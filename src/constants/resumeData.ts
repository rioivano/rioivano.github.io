export type Lang = "en" | "id";

export const RESUME_DATA = {
  name: "Rio Ivano",

  role: {
    en: "Programmer • Web Developer • Software Engineer • IT Enthusiast",
    id: "Programmer • Pengembang Web • Software Engineer • Pecinta Teknologi",
  },

  about: {
    en: `My name is Rio Ivano, a software engineer with over 4+ years of professional experience in building scalable web, mobile, and desktop applications. Currently driving innovation at PT Bina Citra Teknologi, I specialize in transforming complex business requirements into efficient digital solutions. I am highly passionate about the intersection of software engineering and Artificial Intelligence, constantly exploring new ways to leverage AI to accelerate development cycles and deliver smarter products.`,
    id: `Nama saya Rio Ivano, seorang software engineer dengan pengalaman profesional lebih dari 4 tahun dalam membangun aplikasi web, mobile, dan desktop yang skalabel. Saat ini mendorong inovasi di PT Bina Citra Teknologi, saya mengkhususkan diri dalam mengubah kebutuhan bisnis yang kompleks menjadi solusi digital yang efisien. Saya sangat bersemangat tentang perpaduan antara rekayasa perangkat lunak dan Kecerdasan Buatan, terus mengeksplorasi cara-cara baru untuk memanfaatkan AI guna mempercepat siklus pengembangan dan menghadirkan produk yang lebih cerdas.`,
  },

  contact: {
    email: "rioivano5@gmail.com",
    linkedin: "https://linkedin.com/in/rioivano",
    github: "https://github.com/rioivano",
    whatsapp: "628161114275",
    location: "South Tangerang, Indonesia",
  },

  skills: [
    {
      title: { en: "Frontend Excellence", id: "Keahlian Frontend" },
      items: "Next.js (App Router), React, TypeScript, Tailwind CSS, JavaScript (ES6+), Headless CMS Integration.",
    },
    {
      title: { en: "Backend & API Architecture", id: "Arsitektur Backend & API" },
      items: "Laravel, Express.js, CodeIgniter (3 & 4), .NET Core, RESTful API Design, Microservices Thinking.",
    },
    {
      title: { en: "Mobile & Desktop Development", id: "Pengembangan Mobile & Desktop" },
      items: "Flutter (Cross-platform), Desktop Application Development, Unity (AR/VR/Game).",
    },
    {
      title: { en: "Databases & Storage", id: "Database & Penyimpanan" },
      items: "MySQL, MongoDB, PostgreSQL, Sequelize ORM, Sequelize CLI, Redis.",
    },
    {
      title: { en: "AI & Future Tech", id: "AI & Teknologi Masa Depan" },
      items: "AI-Assisted Development (Claude AI/Gemini/GPT/Perplexity), Prompt Engineering for Developers, AI Agent Integration, Automation Workflows.",
    },
    {
      title: { en: "DevOps & Cloud", id: "DevOps & Cloud" },
      items: "Docker, Jenkins (CI/CD), Git/GitHub, Ubuntu Server, Google Cloud Console, Google APIs, Grafana Monitoring, Swagger API, Postman API.",
    },
    {
      title: { en: "Design & Tools", id: "Desain & Perkakas" },
      items: "Figma (UI/UX), Adobe Premiere (Technical Documentation Video), Adobe Illustrator, Adobe XD, Canva.",
    },
  ],

  experience: [
    {
      company: "PT Bina Citra Teknologi",
      role: "Software Engineer",
      period: "May 2024 - Present",
      description: {
        en: "Developing and maintaining enterprise-level applications, optimizing database performance, and implementing modern frontend frameworks to enhance user experience.",
        id: "Mengembangkan dan memelihara aplikasi tingkat enterprise, mengoptimalkan performa database, serta mengimplementasikan framework frontend modern untuk meningkatkan pengalaman pengguna.",
      },
    },
    {
      company: "PT Jenaka Rumah Kreatif",
      role: "Programmer",
      period: "Jun 2023 - Jul 2025",
      description: {
        en: "Successfully led the development of multiple web projects, focusing on scalable architecture and seamless third-party integrations.",
        id: "Berhasil memimpin pengembangan berbagai proyek web, berfokus pada arsitektur yang skalabel dan integrasi pihak ketiga yang mulus.",
      },
    },
    {
      company: "PT Inara Solusi Unggul",
      role: "IT Staff",
      period: "Jun 2022 - May 2023",
      description: {
        en: "Managed internal IT infrastructure, developed internal tools to automate repetitive tasks, and provided technical support for system stability.",
        id: "Mengelola infrastruktur IT internal, mengembangkan alat internal untuk mengotomatisasi tugas berulang, dan memberikan dukungan teknis untuk stabilitas sistem.",
      },
    },
    {
      company: "PT Melisa Yousuf Media",
      role: "Web Developer (Internship)",
      period: "Mar - Nov 2021",
      description: {
        en: "Assisted in building web applications and learned the fundamentals of professional software development lifecycles.",
        id: "Membantu dalam pembuatan aplikasi web dan mempelajari dasar-dasar siklus pengembangan perangkat lunak profesional.",
      },
    },
  ],

  education: [
    {
      school: "PAMULANG UNIVERSITY",
      degree: {
        en: "Bachelor of Computer Science (S.Kom)",
        id: "Sarjana Komputer (S.Kom)",
      },
      period: "2018 - 2023",
    },
    {
      school: "SMA N 2 KOTA SOLOK",
      degree: {
        en: "Science Major",
        id: "Jurusan IPA",
      },
      period: "2015 - 2018",
    },
  ],

  services: [
    {
      title: { en: "Custom SaaS Development", id: "Pengembangan SaaS Kustom" },
      description: {
        en: "Building tailored software solutions using Next.js and Laravel for business automation.",
        id: "Membangun solusi perangkat lunak yang disesuaikan menggunakan Next.js dan Laravel untuk otomatisasi bisnis.",
      },
    },
    {
      title: { en: "Legacy System Modernization", id: "Modernisasi Sistem Lama" },
      description: {
        en: "Migrating old CodeIgniter/PHP systems to modern stacks like Next.js and TypeScript.",
        id: "Migrasi sistem CodeIgniter/PHP lama ke stack modern seperti Next.js dan TypeScript.",
      },
    },
    {
      title: { en: "Cross-platform Desktop Apps", id: "Aplikasi Desktop Lintas Platform" },
      description: {
        en: "Creating powerful desktop applications using Flutter for internal enterprise tools.",
        id: "Membuat aplikasi desktop yang powerful menggunakan Flutter untuk alat enterprise internal.",
      },
    },
  ],
};
