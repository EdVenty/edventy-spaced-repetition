import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutlined } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


export interface RatingProps {
    /** Rating from 0 to 5 */
    value?: number;
    /** Is rating disabled */
    disabled?: boolean;

    /** On rating applied handler */
    onApply?: (v: number) => any;
    /** On change handler */
    onChange?: (v: number) => any;
};

export const Rating = ({
    value,
    disabled,
    onApply,
    onChange,
    ...props
}: RatingProps & React.HTMLProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
    const [_value, setValue] = React.useState(value ?? 0);
    const [oldValue, setOldValue] = React.useState(0);
    const ratingRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const mouseCB = (e: MouseEvent) => {
            if(ratingRef.current === null) return;

            const rect = ratingRef.current.getBoundingClientRect();
            if(e.pageX >= rect.left && e.pageX <= rect.right && e.pageY >= rect.top && e.pageY <= rect.bottom){
                const newValue = (e.pageX - rect.left + 2) / (rect.width - 2) * 5;
                
                onChange?.(newValue);
                setValue(newValue); 
            }
            else{
                setValue(oldValue);
            }
        }

        document.addEventListener('mousemove', mouseCB);

        return () => document.removeEventListener('mousemove', mouseCB);
    }, []);

    const v = value ?? _value;

    return <div ref={ratingRef}>
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