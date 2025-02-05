import React, { HTMLAttributes } from 'react';

import './divider.css';

export interface DividerProps {
  /** Line direction */
  direction?: 'horizontal' | 'vertical';
  /** Styling */
  style?: React.CSSProperties
}

/** A component for an arrangement of view elements array.  */
export const Divider = ({
  direction = 'horizontal',
  style,
  ...props
}: DividerProps) => {
  return (
    <div {...props} className={`divider divider--${direction}`} style={style}></div>
  );
};
