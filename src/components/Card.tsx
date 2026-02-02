import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export default function Card({ children, className }: CardProps) {
  let image: React.ReactNode = null;
  let title: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === "img") {
        image = child;
      } else if (child.type === "h1") {
        title = child;
      }
    }
  });

  const classes = `flex bg-black w-fit border-2 border-primary-violet rounded-2xl p-6 backdrop-blur-3xl  items-center justify-center gap-3 ${className}`;
  return (
    <div className={classes}>
      <div className="flex size-10 items-center justify-center gap-3">
        {image}
      </div>
      <div className="flex items-center justify-center font-bold text-xl gap-3">
        {title}
      </div>
    </div>
  );
}
