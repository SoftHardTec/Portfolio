import "./global.css";
import Navbar from "./components/layout/Navbar/index.tsx";
import GlowCursor from "./components/ui/cursorAnimate/index.tsx";
import Hero from "./components/hero/index.tsx";
import Antigravity from "./components/ui/Antigravity";
import SkillsPrograming from "./components/skills/index.tsx";
import Footer from "./components/layout/Footer";

const AntigravityAll = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Antigravity
        count={150}
        magnetRadius={10}
        ringRadius={5}
        waveSpeed={0.4}
        waveAmplitude={0.9}
        particleSize={0.5}
        lerpSpeed={0.1}
        color="#b21ddb"
        autoAnimate={false}
        particleVariance={0.1}
        rotationSpeed={0.1}
        depthFactor={0.3}
        pulseSpeed={5}
        particleShape="capsule"
        fieldStrength={7}
      />
    </div>
  );
};
function App() {
  return (
    <div className="flex relative h-screen w-full flex-col overflow-y-auto snap-y snap-mandatory ">
      <GlowCursor />
      <header className="z-50">
        <Navbar />
      </header>
      <main className="grow relative">
        <section className="sticky top-0 z-10 h-screen w-full bg-bg flex justify-center items-center overflow-hidden snap-start">
          <AntigravityAll />
          <div className="relative z-10 w-full px-15 sm:px-30">
            <Hero />
          </div>
        </section>
        <section className="sticky top-0 z-20 h-screen w-full bg-bg flex justify-center items-center overflow-hidden snap-start">
          <AntigravityAll />
          <div className="relative z-10 w-full px-15 sm:px-30">
            <SkillsPrograming />
          </div>
        </section>
      </main>
      <footer className="relative z-30 w-full bg-bg snap-start">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
