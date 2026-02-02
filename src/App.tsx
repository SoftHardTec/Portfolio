import "./global.css";
import Navbar from "./components/layout/Navbar/index.tsx";
import GlowCursor from "./components/ui/cursorAnimate/index.tsx";
import Hero from "./components/hero/index.tsx";
import Antigravity from "./components/ui/Antigravity";
import { useMediaQuery } from "./hooks/use-media-query.ts";
import SkillsPrograming from "./components/skillsProgramming";
import Footer from "./components/layout/Footer";

function App() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const antigravityProps = {
    count: 200,
    magnetRadius: 10,
    ringRadius: 9,
    waveSpeed: 0.4,
    waveAmplitude: 0.9,
    particleSize: 0.5,
    lerpSpeed: 0.1,
    color: "#b21ddb",
    autoAnimate: false,
    particleVariance: 0.1,
    rotationSpeed: 0.1,
    depthFactor: 0.3,
    pulseSpeed: 5,
    particleShape: "capsule" as const,
    fieldStrength: 7,
  };

  return (
    <div className="flex relative min-h-screen  w-full flex-col">
      <GlowCursor />
      <div className="w-screen h-screen fixed flex justify-center items-center z-1">
        {isDesktop ? (
          <>
            <Antigravity {...antigravityProps} />
            <Antigravity {...antigravityProps} />
          </>
        ) : (
          <Antigravity {...antigravityProps} />
        )}
      </div>
      <header className="z-10 mb-8">
        <Navbar />
      </header>
      <main className="grow relative px-15 sm:px-30">
        <section className="h-screen flex justify-center items-center">
          <Hero />
        </section>
        <section className="h-screen flex justify-center">
          <SkillsPrograming />
        </section>
      </main>
      <footer className="relative w-full">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
