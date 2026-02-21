import { House, User, Folder, Mail, CodeXml } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setOpenMenu(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      const headerOffset = 112;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  const liStyle =
    "flex gap-3 items-center font-bold hover:text-primary-violet hover:scale-110 hover:border-primary-violet active:scale-105 ctive:duration-300 active:text-primary-violet/10 transition-colors duration-300 ";

  const navLinks = [
    { href: "#home", label: "Home", icon: <House size={20} /> },
    { href: "#aboutMe", label: "About me", icon: <User size={20} /> },
    { href: "#skills", label: "Skills", icon: <CodeXml size={20} /> },
    { href: "#projects", label: "Projects", icon: <Folder size={20} /> },
    { href: "#contactMe", label: "Contact me", icon: <Mail size={20} /> },
  ];

  const liElements = navLinks.map((link) => (
    <li key={link.href}>
      <a
        href={link.href}
        className={liStyle}
        onClick={(e) => handleScroll(e, link.href)}
      >
        {link.icon}
        {link.label}
      </a>
    </li>
  ));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setOpenMenu(false);
      }
    };
    const handleClickOutside = (event: TouchEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 bg-bg z-50 h-[5.5rem] lg:h-[6.5rem] w-full flex md:px-8 px-5 items-center ">
        <div className="flex justify-start absolute p-4">
          <img
            src="/YonalfredDev.png"
            alt="logo"
            className="hover:scale-110 duration-300 transition-all size-44 md:size-60 "
          />
        </div>
        <nav className="hidden lg:flex md:justify-end w-full mr-10">
          <ul className="flex justify-center gap-10 md:gap-15  xl:gap-25">
            {liElements}
          </ul>
        </nav>
        <button
          ref={buttonRef}
          onClick={() => setOpenMenu(!openMenu)}
          className="lg:hidden z-[100] flex justify-end absolute flex-col gap-2 right-0 mr-6 p-4 outline-none"
          aria-label="Toggle Menu"
        >
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${openMenu ? "rotate-45 translate-y-2.5" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${openMenu ? "opacity-0" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${openMenu ? "-rotate-45 -translate-y-2.5" : ""}`}
          />
        </button>
      </div>

      <div
        ref={menuRef}
        className={`fixed inset-y-0 right-0 w-[28vh] lg:hidden h-full rounded-b-xl max-w-xs bg-bg pt-24 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-in-out z-40 ${openMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        <nav className="flex flex-col items-center justify-start  h-full">
          <ul className="flex flex-col gap-10 text-xl font-bold text-white">
            {liElements}
          </ul>
        </nav>
      </div>
    </>
  );
}
