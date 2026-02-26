import "./global.css";
import Navbar from "./components/layout/Navbar/index.tsx";
import GlowCursor from "./components/ui/cursorAnimate/index.tsx";
import Hero from "./components/hero/index.tsx";
import Antigravity from "./components/ui/Antigravity";
import SkillsPrograming from "./components/skills/index.tsx";
import Footer from "./components/layout/Footer";
import AboutMe from "./components/aboutMe/index.tsx";
import Projects from "./components/projects/index.tsx";
import ContactMe from "./components/contactMe/index.tsx";
import ScrollAnimation from "./components/ui/scrollAnimation/index.tsx";

const AntigravityAll = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Antigravity
        count={150}
        ringRadius={2}
        particleSize={0.4}
        lerpSpeed={0.1}
        color="#b21ddb"
        particleVariance={0.1}
        rotationSpeed={0.1}
        depthFactor={0.3}
        pulseSpeed={5}
        particleShape="capsule"
        blur={15}
      />
    </div>
  );
};
function App() {
  return (
    <div className="flex relative h-full w-full flex-col bg-bg overflow-x-hidden">
      <GlowCursor />
      <AntigravityAll />
      <header className="z-50 ">
        <Navbar />
      </header>
      <main className="grow relative flex flex-col gap-24 md:gap-32 min-h-[calc(100vh-7rem)] px-6 md:px-12 lg:px-24">
        <section
          id="home"
          className="relative h-screen w-full flex justify-center items-center"
        >
          <div className="relative z-10 w-full ">
            <Hero />
          </div>
        </section>
        <section
          id="aboutMe"
          className="relative w-full flex justify-center items-center scroll-mt-32"
        >
          <ScrollAnimation>
            <AboutMe />
          </ScrollAnimation>
        </section>
        <section
          id="skills"
          className="relative w-full flex justify-center items-center scroll-mt-32"
        >
          <ScrollAnimation from="left">
            <SkillsPrograming />
          </ScrollAnimation>
        </section>
        <section
          id="projects"
          className="relative w-full flex justify-center items-center scroll-mt-32"
        >
          <ScrollAnimation from="right">
            <Projects />
          </ScrollAnimation>
        </section>
        <section
          id="contactMe"
          className="relative w-full flex justify-center items-center scroll-mt-32"
        >
          <ScrollAnimation from="bottom">
            <ContactMe />
          </ScrollAnimation>
        </section>
      </main>
      <footer className="relative w-full pt-16">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
