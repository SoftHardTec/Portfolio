import Card from "@/components/Card";
import { skillProgramming, skillsTools } from "@/lib/listSkills";

export default function SkillsPrograming() {
  return (
    <div>
      <h1 className="md:text-4xl text-3xl font-bold italic text-center pb-20 text-white">
        {"<Skills Programming />"}
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-5 justify-center md:gap-10 gap-5 md:pb-15 pb-7">
        {skillProgramming.map((skill, index) => {
          return (
            <Card key={index}>
              <h1>{skill.name}</h1>
              <img src={skill.image} alt={skill.name} />
            </Card>
          );
        })}
      </div>
      <h1 className="md:text-4xl text-3xl font-bold italic text-center md:pb-15 pb-7 text-white">
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
