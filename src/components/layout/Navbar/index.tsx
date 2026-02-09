import { House, User, Folder, Mail, CodeXml } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const liStyle =
    "flex gap-3 items-center font-bold hover:text-primary-violet hover:scale-110 hover:underline hover:underline-offset-10 transition-colors duration-300 ";
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setOpenMenu(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      const headerOffset = 112; // Altura aproximada del navbar (h-28)
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

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
      <div className="fixed top-0 left-0 bg-bg z-50 h-[5.5rem] w-full flex md:px-8 px-5 items-center ">
        <div className="flex justify-start absolute p-4">
          <img
            src="src/assets/YonalfredDev.png"
            alt="logo"
            className="hover:scale-110 duration-300 transition-all size-44 md:size-60 "
          />
        </div>
        <nav className="hidden lg:flex md:justify-end w-full mr-10">
          <ul className="flex justify-center gap-10 md:gap-15  xl:gap-25">
            <li>
              <a
                href="#home"
                className={liStyle}
                onClick={(e) => handleScroll(e, "#home")}
              >
                <House size={20} />
                Home
              </a>
            </li>
            <li>
              <a
                href="#aboutMe"
                className={liStyle}
                onClick={(e) => handleScroll(e, "#aboutMe")}
              >
                <User size={20} />
                About me
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={liStyle}
                onClick={(e) => handleScroll(e, "#skills")}
              >
                <CodeXml size={20} />
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={liStyle}
                onClick={(e) => handleScroll(e, "#projects")}
              >
                <Folder size={20} />
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={liStyle}
                onClick={(e) => handleScroll(e, "#contact")}
              >
                <Mail size={20} />
                Contact
              </a>
            </li>
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
            <li>
              <a
                href="#home"
                className={`${liStyle}`}
                onClick={(e) => handleScroll(e, "#home")}
              >
                <House size={20} />
                Home
              </a>
            </li>
            <li>
              <a
                href="#aboutMe"
                className={`${liStyle}`}
                onClick={(e) => handleScroll(e, "#aboutMe")}
              >
                <User size={20} />
                About me
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={`${liStyle}`}
                onClick={(e) => handleScroll(e, "#skills")}
              >
                <CodeXml size={20} />
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={`${liStyle}`}
                onClick={(e) => handleScroll(e, "#projects")}
              >
                <Folder size={20} />
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`${liStyle}`}
                onClick={(e) => handleScroll(e, "#contact")}
              >
                <Mail size={20} />
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
