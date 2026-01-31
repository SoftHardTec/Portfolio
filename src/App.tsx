import "./global.css";
import Navbar from "./components/ui/Navbar";
import GlowCursor from "./components/cursorAnimate/index.tsx";
import Hero from "./components/hero/index.tsx";
import Antigravity from "@/components/ui/Antigravity";
import { useMediaQuery } from "@/hooks/use-media-query.ts";

function App() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const antigravityProps = {
    count: 170,
    magnetRadius: 5,
    ringRadius: 10,
    waveSpeed: 0.4,
    waveAmplitude: 0.9,
    particleSize: 0.5,
    lerpSpeed: 0.1,
    color: "#b21ddb",
    autoAnimate: false,
    particleVariance: 0.6,
    rotationSpeed: 0.1,
    depthFactor: 0.3,
    pulseSpeed: 1.5,
    particleShape: "capsule" as const,
    fieldStrength: 13,
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="w-screen h-screen fixed flex justify-center items-center z-[-1]">
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
      <main className="grow px-15 sm:30">
        <Hero />
      </main>
      <GlowCursor />
    </div>
  );
}

export default App;
