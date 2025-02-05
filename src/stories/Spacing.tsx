import React from 'react';

import './spacing.css';

export interface SpacingProps {
  /** Flow direction. */
  direction?: 'horizontal' | 'vertical';
  /** Items alignment. */
  align?: string;
  /** Gap between elements. */
  spacing?: number;
  /** Divider element. */
  divider?: React.ReactNode;
  /** Justify content */
  justify?: 'space-between' | 'center';
  // /** Sets the overflow to scroll. */
  // scrollable?: boolean;
  /** Items to be rendered. */
  children?: React.ReactNode;
}

/** A component for an arrangement of view elements array.  */
export const Spacing = ({
  direction = 'horizontal',
  align = 'inherit',
  spacing,
  divider,
  justify,
  // scrollable = false,
  children,
  ...props
}: SpacingProps & React.HTMLProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={['spacing', props.className].join(' ')} //scrollable ? 'spacing--scrollable' : undefined
    style={{
      gap: spacing, 
      flexDirection: direction == 'horizontal' ? 'row' : 'column', 
      alignItems: align, 
      justifyContent: justify,
      // overflowX: scrollable && direction == 'horizontal' ? 'scroll' : 'inherit', 
      // overflowY: scrollable && direction == 'vertical' ? 'scroll' : 'inherit', 
      ...props.style
    }}>
        {children instanceof Array ? children.map((e, index, arr) => <>
            <div className='spacing-element'>
              {e}
            </div>
            {divider != undefined && index < arr.length - 1 ? divider : null}
        </>) : children}
    </div>
  );
};
