function AboutMe() {
  return (
    <div className="flex flex-col items-center" id="aboutMe">
      <h2 className="~text-3xl/5xl font-bold italic text-center md:pb-20 pb-7 text-white">
        {"<About Me />"}
      </h2>
      <div className="flex md:flex-row-reverse flex-col lg:gap-10 gap-0 items-center">
        <div className="w-full md:w-[50vw] justify-center md:justify-start rounded-2xl overflow-hidden">
          <p className="text-white ~text-lg/2xl font-light max-w-3xl text-center md:text-left leading-relaxed pb-10 px-0 md:px-4">
            Im a passionate Web Developer dedicated to crafting immersive and
            responsive digital experiences. With a strong command of React and
            TypeScript, I build scalable and maintainable applications. My
            expertise includes styling with Tailwind CSS for modern aesthetics
            and leveraging React Three Fiber to integrate engaging 3D elements.
            I thrive on solving complex problems and am committed to continuous
            learning in the ever-evolving landscape of web development.
          </p>
        </div>
        <div className="flex w-full md:w-[40vw] justify-center md:justify-end ">
          <div className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-primary-violet/20">
            <img
              src="/photo.jpg"
              alt="Photo"
              className="w-70 h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
