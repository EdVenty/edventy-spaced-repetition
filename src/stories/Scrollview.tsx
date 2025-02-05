import React from 'react';

import './scrollview.css';
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';


export interface ScrollviewProps {
    /** Flow direction. */
    direction?: 'vertical' | 'horizontal',
    /** Should buttons be hidden. */
    hideButtons?: boolean;
    /** Content to display. */
    children?: React.ReactNode;
}


/** An element to display overflown content and control components. */
export const Scrollview = ({
    direction = 'vertical',
    hideButtons = false,
    children,
    ...props
}: ScrollviewProps & React.HTMLProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
    const scrollLeft = () => {
        
    }

    const scrollRight = () => {

    }

    const scrollUp = () => {

    }

    const scrollDown = () => {

    }
    
    return <div 
        {...props} 
        className={['scrollview', `scrollview--${direction}`, props.className].join(' ')}
    >
        {children}
        {!hideButtons ? (direction == 'horizontal' ? <>
            <div className='scrollview-control-horizontal scrollview-left'>
                <Button icon={<FontAwesomeIcon icon={faAngleLeft} />} onClick={scrollLeft} />
            </div>
            <div className='scrollview-control-horizontal scrollview-right'>
                <Button icon={<FontAwesomeIcon icon={faAngleRight} />} onClick={scrollRight} />
            </div>
        </> : <>
            <div className='scrollview-control-vertical scrollview-up'>
                <Button icon={<FontAwesomeIcon icon={faAngleUp} />} className='scrollview-up' onClick={scrollUp} />
            </div>
            <div className='scrollview-control-vertical scrollview-down'>
                <Button icon={<FontAwesomeIcon icon={faAngleDown} />} className='scrollview-down' onClick={scrollDown} />
            </div>
        </>) : null}
    </div>
}
