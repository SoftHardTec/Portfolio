import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "flexRow" | "flexCol";
  size?: "sm" | "md" | "lg";
  className?: string;
}
export default function Card({
  children,
  variant = "flexRow",
  size = "md",
  className,
}: CardProps) {
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
  const sizes = {
    sm: "flex items-center justify-center size-8 md:size-10",
    md: "flex items-center justify-center size-10 md:size-12",
    lg: "flex items-center justify-center size-12 md:size-14",
  };

  const variants = {
    flexRow: "flex flex-row ",
    flexCol: "flex flex-col ",
  };

  const classes = `${variants[variant]} bg-black w-fit border-2 border-gray-500 drop-shadow-xl rounded-2xl md:p-6 p-3 backdrop-blur-3xl  items-center justify-center gap-3 ${className}`;
  return (
    <div className={classes}>
      <div className={sizes[size]}>{image}</div>
      <div className="md:flex items-center hidden justify-center font-bold ~text-md/xl text-md gap-3">
        {title}
      </div>
    </div>
  );
}
