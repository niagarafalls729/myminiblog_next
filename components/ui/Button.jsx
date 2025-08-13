import styles from './Button.module.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

