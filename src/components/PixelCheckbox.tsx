import { InputHTMLAttributes } from 'react';
import styles from './PixelCheckbox.module.css';

interface PixelCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function PixelCheckbox({ label, checked, className = '', ...props }: PixelCheckboxProps) {
  return (
    <label className={`${styles.checkbox} ${checked ? styles.checked : ''} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        className={styles.input}
        {...props}
      />
      <span className={styles.box}>{checked ? 'X' : ''}</span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
