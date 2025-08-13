import styles from './Grid.module.css';

export default function Grid({ 
  children, 
  container = false,
  item = false,
  xs = 12,
  sm,
  md,
  lg,
  xl,
  spacing = 0,
  className = '',
  ...props 
}) {
  const gridClasses = [
    container && styles.container,
    item && styles.item,
    item && styles[`xs${xs}`],
    sm && styles[`sm${sm}`],
    md && styles[`md${md}`],
    lg && styles[`lg${lg}`],
    xl && styles[`xl${xl}`],
    spacing > 0 && styles[`spacing${spacing}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
}

