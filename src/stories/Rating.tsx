import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutlined } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import './rating.css';


export interface RatingProps {
    /** Rating from 0 to 5. Makes appliable value unchangeable but keeps display properties.. */
    value?: number;
    /** Default rating from 0 to 5. */
    defaultValue?: number;
    /** Is rating disabled */
    disabled?: boolean;
    /** Doesn't round values to a full star. */
    sharpened?: boolean;

    /** On rating applied handler */
    onApply?: (v: number) => any;
    /** On change handler */
    onChange?: (v: number) => any;
};

export const Rating = ({
    value,
    defaultValue = 0,
    disabled,
    sharpened = false,
    onApply,
    onChange,
    ...props
}: RatingProps & React.HTMLProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
    const [_value, setValue] = React.useState(value);
    const [oldValue, setOldValue] = React.useState(value ?? defaultValue ?? 0);
    const ratingRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const mouseCB = (e: MouseEvent) => {
            if(disabled || ratingRef.current === null) return;

            const rect = ratingRef.current.getBoundingClientRect();
            // const offsetX = ratingRef.current.scrollLeft;
            // const offsetY = ratingRef.current.scrollTop;

            if(e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom){
                let newValue = (e.pageX - rect.left + 2) / (rect.width - 2) * 5;
                if(!sharpened) newValue = Math.ceil(newValue);
                
                onChange?.(newValue ?? oldValue);
                setValue(newValue); 
            }
            else{
                setValue(undefined);
            }
        }

        document.addEventListener('mousemove', mouseCB);

        return () => document.removeEventListener('mousemove', mouseCB);
    }, []);

    const mouseClickCB = () => {
        if(disabled) return;
        if(_value != undefined && value == undefined){
            setOldValue(_value);
        }
        onApply?.(_value ?? oldValue);
    }

    const v = _value ?? value ?? oldValue;

    return <div ref={ratingRef} {...props} onClick={mouseClickCB} className={['rating', props.className].join(' ')}>
        <RatingStar value={v}/>
        <RatingStar value={v - 1}/>
        <RatingStar value={v - 2}/>
        <RatingStar value={v - 3}/>
        <RatingStar value={v - 4}/>
    </div>
}

export interface RatingStarProps {
    value?: number
};

export const RatingStar = ({
    value = 0
}: RatingStarProps) => {
    var icon = faStarOutlined;

    if(value > 0 && value < 1){
        icon = faStarHalfAlt;
    }
    else if(value >= 1){
        icon = faStar;
    }

    return <FontAwesomeIcon icon={icon} />;
}