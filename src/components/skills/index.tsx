import { skillProgramming, skillsTools } from "@/lib/listSkills";

export default function SkillsPrograming() {
  const cardStyle =
    "flex bg-card-bg w-fit border border-card-border hover:border-primary-violet/60 hover:bg-primary-violet/10 hover:shadow-[0_0_30px_-5px_rgba(178,29,219,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-xl rounded-2xl md:p-6 p-4 items-center justify-center gap-4 group";
  return (
    <div id="skills">
      <h2 className="~text-3xl/5xl font-bold italic text-center md:pb-20 pb-7 text-white">
        {"<Skills Programming />"}
      </h2>
      <div className="flex flex-wrap justify-center gap-5 md:gap-8 pb-10 md:pb-20  lg:px-32">
        {skillProgramming.map((skill, index) => {
          return (
            <div key={index} className={cardStyle}>
              <img
                src={skill.image}
                alt={skill.name}
                className="flex items-center justify-center size-10 md:size-12"
              />
              <h1 className="md:flex items-center hidden justify-center font-bold ~text-md/xl text-md gap-3">
                {skill.name}
              </h1>
            </div>
          );
        })}
      </div>
      <h1 className="~text-3xl/5xl font-bold italic text-center md:pb-15 pb-10 text-white">
        {"<Skills Tools />"}
      </h1>
      <div className="flex flex-wrap justify-center gap-5 md:gap-10">
        {skillsTools.map((skill, index) => {
          return (
            <div className={cardStyle} key={index}>
              <h1 className="md:flex items-center hidden justify-center font-bold ~text-md/xl text-md gap-3">
                {skill.name}
              </h1>
              <img
                className="flex items-center justify-center size-10 md:size-12"
                src={skill.image}
                alt={skill.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
