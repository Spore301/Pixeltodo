import { ButtonHTMLAttributes } from 'react';
import styles from './PixelButton.module.css';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function PixelButton({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}: PixelButtonProps) {
  const classes = [
    styles.button,
    variant !== 'default' && styles[variant],
    size !== 'md' && styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
