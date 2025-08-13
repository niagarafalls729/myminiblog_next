import { useState } from 'react';
import styles from './Input.module.css';

export default function Input({ 
  label,
  type = 'text',
  error,
  helperText,
  fullWidth = false,
  required = false,
  disabled = false,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  className = '',
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false);

  const inputClasses = [
    styles.input,
    fullWidth && styles.fullWidth,
    error && styles.error,
    disabled && styles.disabled,
    isFocused && styles.focused,
    className
  ].filter(Boolean).join(' ');

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={styles.inputGroup}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input 
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        {...props}
      />
      {(error || helperText) && (
        <div className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
}

