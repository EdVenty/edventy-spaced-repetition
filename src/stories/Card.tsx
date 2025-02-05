import React, { ReactNode } from 'react';

import './card.css';

export interface CardProps {
  /** Render variant */
  variant?: 'outlined' | 'primary' | 'secondary' | 'red' | 'green';
  /** Is element can be clicked. */
  clickable?: boolean;
  /** Card layout */
  children?: React.ReactNode;
}

export interface CardContentProps {
  /** Card content */
  children?: React.ReactNode;
}

export interface CardSidebarProps {
  /** Where to stick the sidebar */
  float?: 'left' | 'right';
  /** Sidebar content */
  children?: React.ReactNode;
}

export interface CardTopbarProps {
  /** Where to stick the topbar */
  float?: 'top' | 'bottom';
  /** Sidebar content */
  children?: React.ReactNode;
}

export const CardContent = ({
  children,
  ...props
}: CardContentProps & React.HTMLProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={['card-content', props.className].join(' ')}>
    {children}
  </div>
}

export const CardSidebar = ({
  float = 'left',
  children,
  ...props
}: CardSidebarProps & React.HTMLProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={[`card-sidebar card-sidebar--${float}`, props.className].join(' ')}>
    <div className='card-sidebar-content'>
      {children}
    </div>
  </div>
}

export const CardTopbar = ({
  float = 'bottom',
  children,
  ...props
}: CardTopbarProps & React.HTMLProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={[`card-topbar card-topbar--${float}`, props.className].join(' ')}>
    <div className='card-topbar-content'>
      {children}
    </div>
  </div>
}



/** Primary UI component for user interaction */
export const Card = ({
  children,
  variant = 'outlined',
  clickable = false,
  ...props
}: CardProps & React.HTMLProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={[`card`, `card--${variant}`, props.className].join(' ')} style={{
      cursor: clickable ? 'pointer' : 'inherit',
      ...props.style
    }}>
      {children}
    </div>
  );
};

Card.Content = CardContent;
Card.Sidebar = CardSidebar;
