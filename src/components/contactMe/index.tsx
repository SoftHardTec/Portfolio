import Button from "../Button";
import { useState } from "react";

function ContactMe() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const sendWhatsapp = () => {
    const encodedText = `Hola, Yonalfred saludos. Soy ${name} y quiero contactarte para un proyecto: ${message}`;

    window.open(`https://wa.me/584144901864?text=${encodedText}`, "_blank");
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(`Solicitud de Contacto - ${name}`);
    const body = encodeURIComponent(
      `Hola Yonalfred,\n\nSoy ${name}.\n\n${message}`,
    );
    window.location.href = `mailto:tecnologysofthard@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-col justify-center items-center gap-16 relative w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-violet/20 blur-[120px] rounded-full -z-10 animate-pulse" />

      <h2 className="~text-3xl/5xl font-bold italic text-center text-white drop-shadow-[0_0_15px_rgba(178,29,219,0.5)]">
        {"<ContactMe />"}
      </h2>
      <form className="flex flex-col bg-card-bg items-center backdrop-blur-xl border border-card-border rounded-[2rem] p-12 w-[90vw] md:w-[650px] shadow-[0_0_60px_-15px_rgba(178,29,219,0.25)] ring-1 ring-white/5">
        <h4 className="text-3xl font-bold text-white pb-10 tracking-tight">
          Send a Message
        </h4>
        <div className="flex flex-col gap-3 w-full group">
          <label className="text-violet-200/80 font-medium text-start w-full transition-colors group-focus-within:text-primary-violet">
            Name or Business
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Your name..."
            className="w-full border backdrop-blur-2xl bg-white/5 text-white border-card-border focus:border-primary-violet/50 focus:ring-4 focus:ring-primary-violet/10 outline-none rounded-2xl p-4 mb-8 transition-all duration-300 placeholder:text-white/20"
          />
        </div>
        <div className="flex flex-col gap-3 w-full mb-12 group">
          <label className="text-violet-200/80 font-medium text-start w-full transition-colors group-focus-within:text-primary-violet">
            Message
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Tell me about your project..."
            className="h-48 border backdrop-blur-2xl bg-white/5 text-white border-card-border focus:border-primary-violet/50 focus:ring-4 focus:ring-primary-violet/10 outline-none rounded-2xl p-4 transition-all duration-300 placeholder:text-white/20"
          ></textarea>
        </div>
        <div className="flex flex-wrap justify-center w-full gap-8">
          <Button
            onClick={() => sendWhatsapp()}
            className="transform hover:scale-105 transition-transform active:scale-95"
          >
            Whatsapp
          </Button>
          <Button
            onClick={() => sendEmail()}
            className="transform hover:scale-105 transition-transform active:scale-95"
          >
            Email
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ContactMe;
