import React from 'react';

import './typography.css';

export interface TypographyProps {
  /** Text variant */
  variant?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Font size */
  font?: number | string;
  /** Is strong */
  strong?: boolean;
  /** Items to be rendered. */
  children?: React.ReactNode;
}

/** A base typography UI element.  */
export const Typography = ({
  variant = 'p',
  font,
  strong = false,
  children,
  ...props
}: TypographyProps & React.HTMLProps<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement>) => {
  const inner = strong ? <strong>{children}</strong> : children;
  switch(variant){
    case 'h1':
      return <h1 {...props} className={['text-h1', props.className].join(' ')} style={{fontSize: font, ...props.style}}>{inner}</h1>;
    case 'h2':
      return <h2 {...props} className={['text-h2', props.className].join(' ')} style={{fontSize: font, ...props.style}}>{inner}</h2>;
    case 'h3':
      return <h3 {...props} className={['text-h3', props.className].join(' ')} style={{fontSize: font, ...props.style}}>{inner}</h3>;
    case 'h4':
      return <h4 {...props} className={['text-h4', props.className].join(' ')} style={{fontSize: font, ...props.style}}>{inner}</h4>;
    case 'h5':
      return <h5 {...props} className={['text-h5', props.className].join(' ')} style={{fontSize: font, ...props.style}}>{inner}</h5>;
    case 'h6':
      return <h6 {...props} className={['text-h6', props.className].join(' ')} style={{fontSize: font, ...props.style}}>{inner}</h6>;
    default:
      return <p {...props} className={['text-p', props.className].join(' ')} style={{fontSize: font, ...props.style}}>{inner}</p>;
  };
};

Typography.Paragraph = ({children, ...props}: TypographyProps & React.HTMLProps<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement>) => <Typography {...props} variant='p'>{children}</Typography>;
Typography.Heading1 = ({children, ...props}: TypographyProps & React.HTMLProps<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement>) => <Typography {...props} variant='h1'>{children}</Typography>;
Typography.Heading2 = ({children, ...props}: TypographyProps & React.HTMLProps<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement>) => <Typography {...props} variant='h2'>{children}</Typography>;
Typography.Heading3 = ({children, ...props}: TypographyProps & React.HTMLProps<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement>) => <Typography {...props} variant='h3'>{children}</Typography>;
Typography.Heading4 = ({children, ...props}: TypographyProps & React.HTMLProps<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement>) => <Typography {...props} variant='h4'>{children}</Typography>;
Typography.Heading5 = ({children, ...props}: TypographyProps & React.HTMLProps<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement>) => <Typography {...props} variant='h5'>{children}</Typography>;
Typography.Heading6 = ({children, ...props}: TypographyProps & React.HTMLProps<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement>) => <Typography {...props} variant='h6'>{children}</Typography>;