import { motion } from "motion/react";

function Loading() {
  return (
    <div className="fixed inset-0 bg-bg z-[5000] flex flex-col items-center justify-center gap-6 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute w-64 h-64 bg-primary-violet/20 rounded-full blur-[100px] animate-pulse"></div>

      <div className="flex items-center justify-center gap-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -12, 0],
              opacity: [1, 0.5, 1],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
            className="w-4 h-4 rounded-full bg-primary-violet shadow-[0_0_20px_rgba(178,29,219,0.6)]"
          />
        ))}
      </div>

      <motion.span
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="text-primary-violet/60 font-medium italic tracking-[0.3em] text-[10px] uppercase mt-4"
      ></motion.span>
    </div>
  );
}

export default Loading;
