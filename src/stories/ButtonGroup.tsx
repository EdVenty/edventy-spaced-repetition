import React from 'react';
import { Button } from './Button';

import './buttonGroup.css';

export interface IButtonGroupItem {
    text: string;
    value: string;
}

export interface ButtonGroupProps {
  /** Items of button group */
  items?: IButtonGroupItem[];
  /** Buttons variant */
  buttonVariant?: 'primary' | 'outlined' | 'green' | 'red';
  /** Is buttons are simple */
  buttonSimple?: boolean;
  /** Custom buttons color */
  buttonColor?: string;
  /** Custom button background color */
  buttonBackgroundColor?: string;
  /** Gap beetween button in px */
  gap?: string | number;
  /** Optional click handler */
  onClick?: (value: string, index: number, item: IButtonGroupItem) => void;
  /** You can also provide items with `ButtonGroup.Button` */
  children?: React.ReactNode[] | React.ReactNode;
}

/** Group of UI buttons to let the user choose to perform some related actions. */
export const ButtonGroup = ({
  items,
  buttonVariant = 'primary',
  buttonSimple = true,
  buttonColor,
  buttonBackgroundColor,
  gap,
  onClick,
  children,
  ...props
}: ButtonGroupProps) => {
  const renderedItems = items ? items.map((v, i) => <Button 
    label={v.text} 
    font='h3'
    onClick={() => onClick?.(v.value, i, v)} 
    simple={buttonSimple} 
    color={buttonColor} 
    backgroundColor={buttonBackgroundColor} 
    variant={buttonVariant} />) : children;

  return (
    <div {...props} style={{gap}} className='button-group'>
        {renderedItems}
    </div>
  );
};

ButtonGroup.Button = Button;
