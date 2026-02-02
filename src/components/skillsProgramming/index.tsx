import Card from "@/components/Card";
import { skillProgramming } from "@/lib/listSkills";

export default function SkillsPrograming() {
  return (
    <div>
      <h1 className="text-4xl font-bold italic text-center pb-20 text-white">
        Skills Programming
      </h1>
      <div className="flex flex-wrap justify-center gap-3">
        {skillProgramming.map((skill, index) => {
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
