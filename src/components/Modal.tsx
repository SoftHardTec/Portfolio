import type { Project } from "@/lib/listProjects";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { motion, AnimatePresence } from "motion/react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  data: Project;
}

export default function Modal({ open, onClose, data }: ModalProps) {
  const [lastData, setLastData] = useState<Project>(data);

  if (open && data !== lastData) {
    setLastData(data);
  }

  const displayData = open ? data : lastData;

  // Prevent scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return createPortal(
    <AnimatePresence mode="wait">
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 md:p-6 lg:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              duration: 0.4,
            }}
            className="relative bg-gray-900 border border-gray-700/50 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] max-w-7xl w-[95vw] md:w-[90vw] max-h-[95vh] overflow-y-auto no-scrollbar"
          >
            <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[600px]">
              {/* Project Image */}
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img
                  src={displayData.img}
                  alt={displayData.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Info */}
              <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between bg-gray-900">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      {displayData.name}
                    </h2>
                    <button
                      onClick={onClose}
                      className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-800/50 rounded-full"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                    {displayData.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      technologies
                    </h4>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {displayData.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-1.5 bg-primary-violet/10 border border-primary-violet/20 text-primary-violet rounded-full text-sm font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-0">
                  {displayData.link && (
                    <a
                      href={displayData.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button className="w-full justify-center py-4 text-lg">
                        Ver Proyecto
                      </Button>
                    </a>
                  )}
                  {displayData.github && (
                    <a
                      href={displayData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex px-8 py-3.5 gap-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold transition-all border border-gray-700 items-center justify-center text-lg shadow-lg hover:shadow-gray-800/20"
                    >
                      <img src="/GitHub.svg" alt="GitHub" className="size-6" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
