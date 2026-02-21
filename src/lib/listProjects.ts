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
      "Web application for managing and selling raffle tickets, providing a fluid and clear user interface, adaptable to any device.",
    technologies: ["NextJs", "Supabase", "Tailwind CSS", "Mantine"],
    link: "https://www.juegacnnosotros.com/",
    github: "https://github.com/SoftHardTec/rifas.git",
  },
  {
    name: "Dashboard Raffle",
    img: "/dashboard-raffle.png",
    description:
      "Administration panel with graphs and payment verification, guaranteeing control and management of the raffle application",
    technologies: ["NextJs", "Supabase", "Tailwind CSS", "Mantine"],
    link: "https://dashboard-raffle.vercel.app/",
    github: "https://github.com/SoftHardTec/dashboard-raffle.git",
  },
  {
    name: "Earrings Payments",
    img: "/earrings-payments.png",
    description:
      "system for handling outstanding payments with total per currency",
    technologies: ["NextJs", "Shadcn UI", "Tailwind CSS"],
    link: "https://app-payments-earrings.vercel.app",
    github: "https://github.com/SoftHardTec/app-payments-earrings.git",
  },
  {
    name: "Electronica Jimenez",
    img: "/electronica-jimenez.png",
    description:
      "Advertising website for an electronics company, with a separate page for each specialty.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://electronicajimenez.com",
  },
  {
    name: "Excel Table Converter",
    img: "/excel-table-converter.png",
    description:
      "Web application to convert Excel tables from one format to another provided",
    technologies: ["NodeJs", "ExcelJS", "Tailwind CSS"],
    link: "https://excel-table-converter.vercel.app/",
    github: "https://github.com/SoftHardTec/excel-table-converter.git",
  },
];
