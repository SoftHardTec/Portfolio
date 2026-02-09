import Card from "@/components/Card";
import { skillProgramming, skillsTools } from "@/lib/listSkills";

export default function SkillsPrograming() {
  return (
    <div id="skills">
      <h1 className="~text-3xl/5xl font-bold italic text-center md:pb-20 pb-7 text-white">
        {"<Skills Programming />"}
      </h1>
      <div className="flex flex-wrap justify-center gap-5 md:gap-8 pb-10 md:pb-20  lg:px-32">
        {skillProgramming.map((skill, index) => {
          return (
            <Card key={index}>
              <h1>{skill.name}</h1>
              <img src={skill.image} alt={skill.name} />
            </Card>
          );
        })}
      </div>
      <h1 className="~text-3xl/5xl font-bold italic text-center md:pb-15 pb-10 text-white">
        {"<Skills Tools />"}
      </h1>
      <div className="flex flex-wrap justify-center gap-5 md:gap-10">
        {skillsTools.map((skill, index) => {
          return (
            <Card key={index}>
              <h1>{skill.name}</h1>
              <img src={skill.image} alt={skill.name} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
