import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  isLoading,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles =
    'w-fit rounded-full px-7 py-3 font-bold transition duration-200 ease-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-sm lg:text-base';

  const variants = {
    primary:
      'bg-foreground text-background hover:bg-transparent hover:text-foreground border border-transparent hover:border-white/20',

    outline:
      'border border-white/20 text-foreground hover:bg-foreground hover:text-background',
    ghost: 'text-foreground hover:bg-white/10',
  };

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
