import type { Project } from "@/lib/listProjects";
import { useEffect } from "react";
import Button from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  data: Project;
}

export default function Modal({ open, onClose, data }: ModalProps) {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative mx-4 bg-gray-900 border border-gray-700/50 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto overflow-x-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col md:flex-row h-full">
          {/* Project Image */}
          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img
              src={data.img}
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Info */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between bg-gray-900">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-white leading-tight">
                  {data.name}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
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

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {data.description}
              </p>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Tecnologías
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-violet/10 border border-primary-violet/20 text-primary-violet rounded-full text-xs font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              {data.link && (
                <a href={data.link} target="_blank" rel="noopener noreferrer">
                  <Button>Ver Proyecto</Button>
                </a>
              )}
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex px-4 py-2 gap-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold transition-all border border-gray-700"
                >
                  <img src="/GitHub.svg" alt="GitHub" className="size-6" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
