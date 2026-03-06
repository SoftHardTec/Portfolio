import { useState } from "react";
import { Check } from "lucide-react";

interface IconStructure {
  name: string;
  icon: string;
  link?: string;
  copy?: string;
}

const iconsSocials: IconStructure[] = [
  {
    name: "GitHub",
    icon: "/GitHub.svg",
    link: "https://github.com/yonaljgp",
  },
  {
    name: "Linkedin",
    icon: "/linkedin.png",
    link: "https://www.linkedin.com/in/yonalfred-guzman",
  },
  {
    name: "Whatsapp",
    icon: "/whatsapp.png",
    copy: "+584144901864",
  },
  {
    name: "Gmail",
    icon: "/gmail.png",
    copy: "yonalfredjoseguzmanperez@gmail.com",
  },
];

const iconsMade: IconStructure[] = [
  { name: "React", icon: "/React.svg", link: "https://react.dev/" },
  {
    name: "Tailwind",
    icon: "/Tailwind.svg",
    link: "https://tailwindcss.com/",
  },
];

export default function Footer() {
  const [copy, setCopy] = useState<string | null>(null);

  const handlerCopy = async (text: string, name: string) => {
    try {
      if (text.length === 0) return;
      await navigator.clipboard.writeText(text);
      setCopy(name);
      setTimeout(() => setCopy(null), 2000);
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };
  const iconStructure = (listIcons: IconStructure[]) => {
    return listIcons.map((icon) => (
      <div key={icon.name}>
        <a
          href={icon.link}
          onClick={(e) => {
            if (icon.copy) {
              e.preventDefault();
              handlerCopy(icon.copy, icon.name);
            }
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy === icon.name ? (
            <Check className="~size-14/16 rounded-full p-2 text-green-500 drop-shadow-[0_0_10px_rgba(178,29,219,0.5)] transition-all duration-400" />
          ) : (
            <img
              src={icon.icon}
              alt={icon.name}
              className="~size-14/16 rounded-full p-2 drop-shadow-[0_0_10px_rgba(178,29,219,0.5)] hover:scale-110 active:scale-90 transition-all duration-400"
            />
          )}
          <h5 className="text-white ~text-xs/sm text-center font-semibold ">
            {copy === icon.name ? "Copied!" : icon.name}
          </h5>
        </a>
      </div>
    ));
  };

  return (
    <div className="flex w-full flex-col bg-gradient-to-t from-bg via-bg/80 to-transparent gap-10 justify-center items-center backdrop-blur-sm pt-10 pb-6">
      <img
        src="/YonalfredDev.png"
        alt="YonalfredDev"
        className="~w-44/52 ~h-14/20 rounded-full"
      />
      <div className="flex flex-col md:flex-row-reverse justify-around w-full gap-10 md:gap-0">
        <div className="flex flex-col justify-center items-center gap-3">
          <h4 className="text-white ~text-base/xl font-bold">Socials</h4>
          <div className="flex gap-5">{iconStructure(iconsSocials)}</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <h4 className="text-white ~text-base/lg font-bold">Made With</h4>
          <div className="flex gap-4">{iconStructure(iconsMade)}</div>
        </div>
      </div>
      <p className="text-center text-white ~text-xs/sm pt-4">
        copyright &copy; 2026 Yonalfred Guzmán. All rights reserved.
      </p>
    </div>
  );
}
