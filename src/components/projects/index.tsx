import { projects, type Project } from "@/lib/listProjects.ts";
import { useState } from "react";
import Modal from "@/components/Modal";

function Projects() {
  const [openModal, setOpenModal] = useState<Project | null>(null);

  return (
    <div className="py-10 px-4">
      <h2 className="~text-3xl/5xl font-bold italic text-center md:pb-20 pb-10 text-white">
        {"<Projects />"}
      </h2>
      <div className="flex flex-wrap justify-center gap-3 md:gap-8 max-w-4xl mx-auto">
        {projects.map((project, index) => {
          return (
            <div
              key={index}
              className="group relative flex flex-col w-36 h-52 sm:w-52 sm:h-72 lg:w-64 lg:h-80 bg-card-bg backdrop-blur-xl border border-card-border rounded-[1.5rem] overflow-hidden hover:border-primary-violet/60 transition-all duration-500 shadow-[0_0_30px_-10px_rgba(178,29,219,0.1)] hover:shadow-[0_0_40px_-5px_rgba(178,29,219,0.3)] hover:-translate-y-2"
            >
              <div className="h-[45%] md:h-[55%] w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={project.img}
                  alt={project.name}
                />
              </div>
              <div className="flex flex-col flex-grow p-5 justify-between">
                <div>
                  <h3 className="font-bold ~text-md/xl text-white mb-2 line-clamp-1">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 ~text-xs/md hidden sm:line-clamp-2">
                    {project.description || "Description pending..."}
                  </p>
                </div>
                <button
                  className="text-primary-violet font-semibold ~text-sm/md flex items-center gap-2 group/btn hover:translate-x-1 transition-transform duration-300"
                  onClick={() => setOpenModal(project)}
                >
                  Ver más <span>→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {openModal && (
        <Modal
          open={!!openModal}
          onClose={() => setOpenModal(null)}
          data={openModal}
        />
      )}
    </div>
  );
}

export default Projects;
