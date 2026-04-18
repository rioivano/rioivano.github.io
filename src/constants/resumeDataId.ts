import type { ResumeData } from "./resumeData";

export const RESUME_DATA_ID: ResumeData = {
  name: "Rio Ivano",

  role: "Programmer • Pengembang Web • Software Engineer • Teknologi Antusias",

  about: `Nama saya Rio Ivano, seorang software engineer dengan pengalaman profesional lebih dari 4 tahun dalam membangun aplikasi web, mobile, dan desktop yang skalabel. Saat ini mendorong inovasi di PT Bina Citra Teknologi, saya mengkhususkan diri dalam mengubah kebutuhan bisnis yang kompleks menjadi solusi digital yang efisien. Saya sangat bersemangat tentang perpaduan antara rekayasa perangkat lunak dan Kecerdasan Buatan, terus mengeksplorasi cara-cara baru untuk memanfaatkan AI guna mempercepat siklus pengembangan dan menghadirkan produk yang lebih cerdas.`,

  contact: {
    email: "rioivano5@gmail.com",
    linkedin: "https://linkedin.com/in/rioivano",
    github: "https://github.com/rioivano",
    whatsapp: "628161114275",
    location: "Tangerang Selatan, Indonesia",
  },

  skills: [
    { title: "Keahlian Frontend", items: "Next.js (App Router), React, TypeScript, Tailwind CSS, JavaScript (ES6+), Headless CMS Integration." },
    { title: "Arsitektur Backend & API", items: "Laravel, Express.js, CodeIgniter (3 & 4), .NET Core, RESTful API Design, Microservices Thinking." },
    { title: "Pengembangan Mobile & Desktop", items: "Flutter (Cross-platform), Desktop Application Development, Unity (AR/VR/Game)." },
    { title: "Database & Penyimpanan", items: "MySQL, MongoDB, PostgreSQL, Sequelize ORM, Sequelize CLI, Redis." },
    { title: "AI & Teknologi Masa Depan", items: "AI-Assisted Development (Claude AI/Gemini/GPT/Perplexity), Prompt Engineering for Developers, AI Agent Integration, Automation Workflows." },
    { title: "DevOps & Cloud", items: "Docker, Jenkins (CI/CD), Git/GitHub, Ubuntu Server, Google Cloud Console, Google APIs, Grafana Monitoring, Swagger API, Postman API." },
    { title: "Desain & Perkakas", items: "Figma (UI/UX), Adobe Premiere (Technical Documentation Video), Adobe Illustrator, Adobe XD, Canva." },
  ],

  experience: [
    {
      company: "PT Bina Citra Teknologi",
      role: "Software Engineer",
      period: "Mei 2024 - Sekarang",
      description: "Mengembangkan dan memelihara aplikasi tingkat enterprise, mengoptimalkan performa database, serta mengimplementasikan framework frontend modern untuk meningkatkan pengalaman pengguna.",
    },
    {
      company: "PT Jenaka Rumah Kreatif",
      role: "Programmer",
      period: "Jun 2023 - Jul 2025",
      description: "Berhasil memimpin pengembangan berbagai proyek web, berfokus pada arsitektur yang skalabel dan integrasi pihak ketiga yang mulus.",
    },
    {
      company: "PT Inara Solusi Unggul",
      role: "Staff IT",
      period: "Jun 2022 - Mei 2023",
      description: "Mengelola infrastruktur IT internal, mengembangkan alat internal untuk mengotomatisasi tugas berulang, dan memberikan dukungan teknis untuk stabilitas sistem.",
    },
    {
      company: "PT Melisa Yousuf Media",
      role: "Web Developer (Magang)",
      period: "Mar - Nov 2021",
      description: "Membantu dalam pembuatan aplikasi web dan mempelajari dasar-dasar siklus pengembangan perangkat lunak profesional.",
    },
  ],

  education: [
    { school: "UNIVERSITAS PAMULANG", degree: "Sarjana Komputer (S.Kom)", period: "2018 - 2023" },
    { school: "SMA N 2 KOTA SOLOK", degree: "Jurusan IPA", period: "2015 - 2018" },
  ],

  services: [
    {
      title: "Pengembangan SaaS Kustom",
      description: "Membangun solusi perangkat lunak yang disesuaikan menggunakan Next.js dan Laravel untuk otomatisasi bisnis.",
    },
    {
      title: "Modernisasi Sistem Lama",
      description: "Migrasi sistem CodeIgniter/PHP lama ke stack modern seperti Next.js dan TypeScript.",
    },
    {
      title: "Aplikasi Desktop Lintas Platform",
      description: "Membuat aplikasi desktop yang powerful menggunakan Flutter untuk alat enterprise internal.",
    },
  ],
};
