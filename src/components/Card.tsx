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

  const classes = `flex bg-black w-fit border-2 border-gray-500 drop-shadow-xl rounded-2xl md:p-6 p-3 backdrop-blur-3xl  items-center justify-center gap-3 ${className}`;
  return (
    <div className={classes}>
      <div className="flex md:size-10 size-12 items-center justify-center gap-3">
        {image}
      </div>
      <div className="md:flex items-center hidden justify-center font-bold md:text-xl text-md gap-3">
        {title}
      </div>
    </div>
  );
}
