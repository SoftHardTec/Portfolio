interface IconStructure {
  name: string;
  icon: string;
  link: string;
}

export default function Footer() {
  const iconsSocials: IconStructure[] = [
    {
      name: "GitHub",
      icon: "/GitHub.svg",
      link: "https://github.com/SoftHardTec",
    },
    {
      name: "Linkedin",
      icon: "/linkedin.png",
      link: "https://www.linkedin.com/in/yonalfred-guzman",
    },
    {
      name: "Whatsapp",
      icon: "/whatsapp.png",
      link: "https://wa.me/584144901864",
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

  const iconStructure = (listIcons: IconStructure[]) => {
    return listIcons.map((icon) => (
      <div key={icon.name}>
        <a href={icon.link} target="_blank" rel="noopener noreferrer">
          <img
            src={icon.icon}
            alt={icon.name}
            className="~size-14/16 rounded-full p-2 drop-shadow-[0_0_10px_rgba(178,29,219,0.5)] hover:scale-110 active:scale-90 transition-all duration-400"
          />
          <h5 className="text-white ~text-xs/sm text-center font-semibold">
            {icon.name}
          </h5>
        </a>
      </div>
    ));
  };

  return (
    <div className="flex w-full flex-col gap-10 justify-center items-center backdrop-blur-2xl border-t border-card-border pt-10 pb-6">
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
