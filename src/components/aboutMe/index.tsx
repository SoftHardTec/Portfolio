function AboutMe() {
  return (
    <div className="flex flex-col items-center" id="aboutMe">
      <h2 className="~text-3xl/5xl font-bold italic text-center md:pb-20 pb-7 text-white">
        {"<About Me />"}
      </h2>
      <div className="flex md:flex-row-reverse flex-col lg:gap-10 gap-0 items-center">
        <div className="w-full md:w-[50vw] justify-center md:justify-start rounded-2xl overflow-hidden">
          <p className="text-white ~text-lg/2xl font-light max-w-3xl text-center md:text-left leading-relaxed pb-10 px-0 md:px-4">
            I'm a web developer with over two years of programming experience,
            focused on creating immersive, functional, and fully responsive
            digital experiences. My specialty is developing scalable
            applications with React, Next.js, and TypeScript. In design, I focus
            on the modernity and efficiency offered by Tailwind CSS, while on
            the backend, I manage robust architectures with Node.js and Express,
            with extensive experience in PostgreSQL and MySQL. Beyond the code,
            I firmly believe that technology is a tool to simplify people's
            lives, so my focus is always on technical usability. I'm a
            self-taught learner; for me, every new challenge is an opportunity
            to research, adapt new tools, and push my own boundaries.
          </p>
        </div>
        <div className="flex w-full md:w-[40vw] justify-center md:justify-end ">
          <div className="rounded-[2.5rem] overflow-hidden border border-primary-violet/30 shadow-[0_0_50px_-10px_rgba(178,29,219,0.3)] transform -rotate-2 hover:rotate-0 transition-all duration-700 ease-out group">
            <img
              src="/photo.jpg"
              alt="Photo"
              className="w-72 h-96 object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
