import React from "react";

import './clickable.css';

export interface ClickableProps {
    /** Is clickable view disabled. */
    disabled?: boolean;
    /** OnClick handler. */
    onClick?: () => any;
};

export const Clickable = ({
    disabled = false,
    onClick,
    ...props
}: ClickableProps & React.HTMLProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
    const clickableRef = React.useRef<HTMLDivElement>(null);
    
      const _onClick = () => {
        if(disabled) return;
        onClick?.();
    
        if(!clickableRef.current) return;
    
        const classActive = `clickable--active`;
        if(clickableRef.current.className.indexOf(classActive) >= 0) return;
    
        const prevClassNames = clickableRef.current.className;
    
        clickableRef.current.className += ` ${classActive}`;
        
        clickableRef.current.onanimationend = () => {
          if(!clickableRef.current) return;
          clickableRef.current.className = prevClassNames;
        }
      }
      
      return <div ref={clickableRef} {...props} className={["clickable", , props.className].join(' ')} onClick={_onClick}/>;
}