import { House, User, Folder, Mail } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const liStyle =
    "flex gap-3 items-center font-bold hover:text-primary-violet hover:scale-110 hover:underline hover:underline-offset-10 transition-colors duration-300 ";

  return (
    <>
      <div className="fixed bg-bg top-0 z-50 h-29 w-screen flex sm:px-10 items-center ">
        <div className="flex justify-start absolute left-0 ml-6 p-4">
          <img
            src="/src/assets/YonalfredDev.png"
            alt="logo"
            className="hover:scale-110 duration-300 transition-all size-40 md:size-60 "
          />
        </div>
        <nav className="hidden lg:flex md:justify-end w-full mr-10">
          <ul className="flex justify-center gap-10 md:gap-15  xl:gap-25">
            <li className={liStyle}>
              <House size={20} />
              Home
            </li>
            <li className={liStyle}>
              <User size={20} />
              About
            </li>
            <li className={liStyle}>
              <Folder size={20} />
              Projects
            </li>
            <li className={liStyle}>
              <Mail size={20} />
              Contact
            </li>
          </ul>
        </nav>
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="lg:hidden z-100 flex justify-end absolute flex-col gap-2 right-0 mr-6 p-4 outline-none"
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
        className={`fixed inset-y-0 right-0 w-[28vh] lg:hidden h-full rounded-b-xl max-w-xs bg-bg pt-30 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-in-out z-40 ${openMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        <nav className="flex flex-col items-center justify-start  h-full">
          <ul className="flex flex-col gap-10 text-xl font-bold text-white">
            <li className={`${liStyle}`} onClick={() => setOpenMenu(false)}>
              <House size={20} />
              Home
            </li>
            <li className={`${liStyle}`} onClick={() => setOpenMenu(false)}>
              <User size={20} />
              About me
            </li>
            <li className={`${liStyle}`} onClick={() => setOpenMenu(false)}>
              <User size={20} />
              Skills
            </li>
            <li className={`${liStyle}`} onClick={() => setOpenMenu(false)}>
              <Folder size={20} />
              Projects
            </li>
            <li className={`${liStyle}`} onClick={() => setOpenMenu(false)}>
              <Mail size={20} />
              Contact
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
