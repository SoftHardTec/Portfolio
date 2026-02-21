import Button from "@/components/Button";
import BlurText from "@/components/ui/animatedText";

export default function Hero() {
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-10">
      {/* Sección de Texto */}
      <div className="flex flex-col items-center md:items-start justify-center gap-6 w-full text-center md:text-left ">
        <BlurText
          delay={200}
          animateBy="words"
          className="text-center md:text-left"
        >
          <div className="flex flex-col items-center italic md:items-start justify-center gap-2">
            <h1 className="~text-3xl/5xl font-bold text-primary-violet">
              Hi, I'm{" "}
            </h1>
            <h1 className="~text-4xl/6xl font-bold">
              {"<Yonalfred Guzmán />"}
            </h1>
            <h1 className="~text-4xl/6xl font-bold text-gray-300">
              Web Developer
            </h1>
          </div>
        </BlurText>

        <p className="~text-lg/xl font-light italic text-gray-100 max-w-lg">
          "Intelligence doesn't come from knowing a lot, but from understanding
          that you will learn something new every day."
        </p>

        <div className="flex gap-6 mt-4">
          <Button size="lg" variant="primary">
            Contact Me
          </Button>
          <Button size="md" variant="inline">
            My CV
          </Button>
        </div>
      </div>

      {/* Sección de Imagen */}
      <div className="justify-center items-center w-full h-full hidden md:flex">
        <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-primary-violet/20 border-2 border-white/5">
          <img
            src="/hero.jpg"
            alt="Hero"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}
