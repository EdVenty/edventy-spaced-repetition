import React from 'react';

import './scrollview.css';
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';


export interface ScrollviewProps {
    /** Flow direction. */
    direction?: 'vertical' | 'horizontal',
    /** Scroll step. */
    step?: number;
    /** Buttons position. If absolute then buttons will be displayed over the content, otherwise, will be placed on sides of this one.*/
    controlsPosition?: 'absolute' | 'relative';
    /** Should buttons be hidden. */
    hideButtons?: boolean;
    /** Scroll behavior */
    behavior?: ScrollBehavior;
    /** Disabe hiding controls when the scroll is on the creasing edge. */
    disableAutoHide?: boolean;
    /** Content to display. */
    children?: React.ReactNode;
}


/** An element to display overflown content and control components. */
export const Scrollview = ({
    direction = 'vertical',
    step = 50,
    controlsPosition = 'absolute',
    hideButtons = false,
    behavior = 'smooth',
    disableAutoHide = false,
    children,
    ...props
}: ScrollviewProps & React.HTMLProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
    const contentRef = React.useRef<HTMLDivElement>(null);
    // const [ ticking, setTicking ] = React.useState(false);
    const [ isStarted, setIsStarted ] = React.useState(false);
    const [ isFinished, setIsFinished ] = React.useState(false);

    React.useEffect(() => {
        if(disableAutoHide) return;
        if(contentRef.current === null) return;

        const scrollCB = () => {
            if(contentRef.current === null) return;

            const scrollShift = isHorizontal ? contentRef.current.scrollLeft : contentRef.current.scrollTop;
            const scrollDim = isHorizontal ? contentRef.current.scrollWidth : contentRef.current.scrollHeight;
            const offsetDim = isHorizontal ? contentRef.current.offsetWidth : contentRef.current.offsetHeight;
            
            setIsStarted(scrollShift > 0);
            setIsFinished(scrollShift + offsetDim >= scrollDim);

            // if (!ticking) {
            //     window.requestAnimationFrame(() => {
                  
            //         setTicking(false);
            //     });
            
            //     setTicking(true);
            //   }
        }

        const removeCB = () => contentRef.current?.removeEventListener('scroll', scrollCB);

        contentRef.current.addEventListener('scroll', scrollCB);
        scrollCB();

        return removeCB;
    }, [contentRef.current]);

    const isHorizontal = direction == 'horizontal';
    
    const scrollPrev = () => {
        if(contentRef.current === null) return;
        if(isHorizontal) {
            contentRef.current.scroll({
                left: contentRef.current.scrollLeft - step, 
                top: contentRef.current.scrollTop,
                behavior
            });
        }
        else {
            contentRef.current.scroll({
                left: contentRef.current.scrollLeft, 
                top: contentRef.current.scrollTop - step,
                behavior
            });
        }
    }

    const scrollNext = () => {
        if(contentRef.current === null) return;
        if(isHorizontal) {
            contentRef.current.scroll({
                left: contentRef.current.scrollLeft + step, 
                top: contentRef.current.scrollTop,
                behavior
            });
        }
        else {
            contentRef.current.scroll({
                left: contentRef.current.scrollLeft, 
                top: contentRef.current.scrollTop + step,
                behavior
            });
        }
    }
 
    const content = <div className='scrollview-content' ref={contentRef}>
        {children}
    </div>;
    
    return <div 
        {...props} 
        className={['scrollview', `scrollview--${direction}`, props.className].join(' ')}
    >
        {hideButtons ? content : <>
            <div className={`scrollview-control scrollview-control-${direction} scrollview-${isHorizontal ? 'left' : 'up'}--${controlsPosition} scrollview-control--${isStarted ? 'visible' : 'hidden'}`}>
                <Button icon={<FontAwesomeIcon icon={isHorizontal ? faAngleLeft : faAngleUp} />} onClick={scrollPrev} disabled={!isStarted}/>
            </div>
            {content}
            <div className={`scrollview-control scrollview-control-${direction} scrollview-${isHorizontal ? 'right' : 'down'}--${controlsPosition} scrollview-control--${isFinished ? 'hidden' : 'visible'}`}>
                <Button icon={<FontAwesomeIcon icon={isHorizontal ? faAngleRight : faAngleDown} />} onClick={scrollNext} disabled={isFinished}/>
            </div>
        </>}
    </div>
}
