import React from 'react';
import { Typography } from './Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './button.css';

export interface ButtonProps {
  /** Select the render variant */
  variant?: 'primary' | 'outlined' | 'green' | 'red' ;
  /** Has the button a simple style  */
  simple?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** What text color to use */
  color?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Font type */
  font?: React.ComponentProps<typeof Typography>['variant'];
  /** Button contents */
  label?: string;
  /** Button icon contents */
  icon?: React.ReactElement<typeof FontAwesomeIcon>;
  /** Is button disabled. */
  disabled?: boolean;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  size = 'medium',
  simple,
  variant,
  font,
  backgroundColor,
  color,
  onClick,
  label,
  icon,
  disabled = false,
  children,
  ...props
}: ButtonProps & React.HTMLAttributes<HTMLButtonElement>) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const _onClick = () => {
    if(disabled) return;
    onClick?.();

    if(!buttonRef.current) return;

    const classActive = `storybook-button--active`;
    if(buttonRef.current.className.indexOf(classActive) >= 0) return;

    const prevClassNames = buttonRef.current.className;

    buttonRef.current.className += ` ${classActive}`;
    
    buttonRef.current.onanimationend = () => {
      if(!buttonRef.current) return;
      buttonRef.current.className = prevClassNames;
    }
  }
  
  return (
    <button
    {...props}
    ref={buttonRef}
    type="button"
    className={['storybook-button', `storybook-button--${size}`, `storybook-button--${variant ?? "primary"}${simple ? "-simple" : ""} button--${disabled ? 'disabled' : 'active'}`, props.className].join(' ')}
    style={{ backgroundColor, color }}
    onClick={_onClick}
    >
        {children ?? <div className='button-content'>
          {icon}
          {label ? <Typography variant={font}>{label}</Typography> : null}
        </div>}
    </button>
  );
};
