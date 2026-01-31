
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'inline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ children, variant = 'primary', size = 'md', className, ...props }: ButtonProps) => {
  const variants = {
    primary: 'bg-primary-violet text-white hover:bg-[#9618B9] hover:scale-105 duration-300 ease-in-out',
    inline: 'bg-transparent font-semibold border-2 border-primary-violet text-primary-violet hover:border-[#9618B9] hover:text-white hover:bg-[#9618B9] hover:scale-105 transition-colors duration-400 ease-in-out',
    danger: 'bg-red-700 text-white hover:bg-red-800 hover:scale-105 duration-300 ase-in-out',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = `rounded-lg font-semibold transition-colors duration-200 cursor-none ${variants[variant]} ${sizes[size]} ${className || ''}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;