import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './PixelInput.module.css';

interface PixelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PixelInput = forwardRef<HTMLInputElement, PixelInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div>
        {label && <span className={styles.label}>{label}</span>}
        <div className={styles.wrapper}>
          <span className={styles.prefix}>&gt;</span>
          <input
            ref={ref}
            className={`${styles.input} ${error ? styles.error : ''} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <span style={{ color: 'var(--accent-red)', fontSize: '12px' }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

PixelInput.displayName = 'PixelInput';
