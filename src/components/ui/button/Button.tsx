import React from 'react';
import './Button.css';

export interface ButtonProps {
  variant?: 'default' | 'ghost' | 'link' | 'outline';
  size?: 'regular' | 'icon';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'regular',
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  icon,
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const disabledClass = disabled ? 'btn--disabled' : '';
  
  const buttonClasses = [
    baseClass,
    variantClass,
    sizeClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {size === 'icon' && (
        <span className="btn__icon">{children}</span>
      )}
      {size === 'regular' && (
        <>
          {icon && <span className="btn__icon btn__icon--left">{icon}</span>}
          <span className="btn__text">{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
