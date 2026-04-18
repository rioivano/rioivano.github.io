export type Lang = "en" | "id";

export type ResumeData = {
  name: string;
  role: string;
  about: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
    whatsapp: string;
    location: string;
  };
  skills: { title: string; items: string }[];
  experience: { company: string; role: string; period: string; description: string }[];
  education: { school: string; degree: string; period: string }[];
  services: { title: string; description: string }[];
};
