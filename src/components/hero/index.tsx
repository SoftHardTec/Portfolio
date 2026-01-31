import Button from "@/components/Button";
import BlurText from "@/components/animatedText";

export default function Hero() {
  return (
    <div className="h-full w-full flex sm:grid sm:grid-cols-2">
      <div className="flex flex-col items-center sm:items-start justify-center gap-3  w-full text-justify sm:text-left">
        <BlurText
          delay={200}
          animateBy="words"
          className="text-center sm:text-left"
        >
          <div className="flex flex-col items-center sm:items-start justify-center gap-3">
            <h1 className="sm:text-5xl text-3xl font-bold text-primary-violet">
              Hi, I'm{" "}
            </h1>
            <h1 className="sm:text-5xl md:text-6xl text-4xl font-bold">
              Yonalfred Guzmán
            </h1>
            <h1 className="sm:text-5xl md:text-6xl text-4xl font-bold">
              Web Developer
            </h1>
          </div>
        </BlurText>
        <p className="sm:text-xl text-lg mt-8">
          I am a web developer with experience in building web applications.
        </p>
        <p className="sm:text-xl text-lg font-light italic">
          "La inteligencia no proviene de saber mucho, sino de entender que cada
          dia aprenderas algo nuevo."
        </p>
        <div className="flex gap-10 mt-10 ">
          <Button size="lg" variant="primary">
            Contact Me
          </Button>
          <Button size="md" variant="inline">
            My CV
          </Button>
        </div>
      </div>

      <div className=" justify-center hidden sm:flex items-center w-full h-auto relative rounded-3xl ">
        <img
          src="./hero.jpg"
          alt="Hero"
          sizes="20px"
          className="w-170 h-120 relative right-0 rounded-4xl  object-covert mask-y-from-70% mask-y-to-90% "
        />
      </div>
    </div>
  );
}
