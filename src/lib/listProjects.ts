export interface Project {
  name: string;
  img: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    name: "App Raffle",
    img: "/app-raffle.png",
    description:
      "Web application for managing and selling raffle tickets, focused on user experience (UX/UI) and multi-device responsiveness. It implements a robust transactional communication flow using the Resend API and an optimized dynamic image storage infrastructure powered by Cloudinary.",
    technologies: ["NextJs", "Supabase", "Tailwind CSS", "Mantine"],
    link: "https://raffle-red.vercel.app/",
    github: "https://github.com/yonaljgp/rifas.git",
  },
  {
    name: "Dashboard Raffle",
    img: "/dashboard-raffle.png",
    description:
      "The administration panel features charts and payment verification, and includes a Telegram bot to notify you of each new purchase. Additionally, it uses Cloudinary's dynamic storage to capture payment information, ensuring control and optimizing response time.",
    technologies: ["NextJs", "Supabase", "Tailwind CSS", "Mantine"],
    link: "https://dashboard-raffle.vercel.app/",
    github: "https://github.com/yonaljgp/dashboard-raffle.git",
  },
  {
    name: "Earrings Payments",
    img: "/earrings-payments.png",
    description:
      "System for managing outstanding payments with totals per currency, with a CRUD in localStorage to manage the use of information",
    technologies: ["NextJs", "Shadcn UI", "Tailwind CSS"],
    link: "https://app-payments-earrings.vercel.app",
    github: "https://github.com/yonaljgp/app-payments-earrings.git",
  },
  {
    name: "Electronica Jimenez",
    img: "/electronica-jimenez.png",
    description:
      "Advertising website for an electronics company, with a separate page for each specialty.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/yonaljgp/electronica-jimenez.git",
    link: "https://electronicajimenez.com",
  },
  {
    name: "Excel Table Converter",
    img: "/excel-table-converter.png",
    description:
      "Web application to convert Excel tables from one format to another provided, using ExcelJS for handling Excel files",
    technologies: ["NodeJs", "ExcelJS", "Tailwind CSS"],
    link: "https://excel-table-converter.vercel.app/",
    github: "https://github.com/yonaljgp/excel-table-converter.git",
  },
];
