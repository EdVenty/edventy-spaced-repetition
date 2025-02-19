import React from 'react';
import { Spacing } from './Spacing';

import './pagination.css';
import { Typography } from './Typography';
import { Button } from './Button';
import { Input } from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';



export interface PaginationProps {
    /** Amount of pages. */
    size: number;
    /** Overrides the current page number */
    value?: number;
    /** Let the user input page number */
    input?: boolean;
    /** Previous button inner component */
    prev?: React.ReactNode;
    /** Next button inner component */
    next?: React.ReactNode;
    /** Behavior of page change action. If greedy, then onChange event will be invoked only if the page number was changed. Otherwise, it will be called every control button click. */
    update?: 'greedy' | 'always'

    onChange?: (page: number) => any;
};

export const Pagination = ({
    size,
    value,
    input,
    prev,
    next,
    update = 'greedy',
    onChange,
    ...props
}: PaginationProps & React.HTMLProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
    const [_current, _setCurrent] = React.useState(1);

    const _value = value ?? _current;
    const page = input 
        ? <Input placeholder='1' className='pagination-current' value={_value.toString()} onApply={(v) => {
            if(typeof(v) === 'string'){
                let num = Number.parseInt(v);
                if(Number.isNaN(num)){
                    num = 1;
                }
                if(num > 0 && num <= size){
                    _onChange(num);
                }
            }
        }}/> 
        : <Typography className='pagination-current'>{value}</Typography>;

    const _onChange = (page: number) => {
        if(value === undefined){
            _setCurrent(page);
        }
        onChange?.(page);
    }

    const onPrevClick = () => {
        if(_value > 1){
            _onChange(_value - 1);
        }
        else if(update === 'always'){
            _onChange(_value);
        }
    }

    const onNextClick = () => {
        if(_value < size){
            _onChange(_value + 1);
        }
        else if(update === 'always'){
            _onChange(_value);
        }
    }
    
    return <Spacing {...props} className='pagination'>
        <div className='pagination-prev'>
            <Button icon={<FontAwesomeIcon icon={faAngleLeft} />} simple variant='outlined' onClick={onPrevClick}/>
        </div>
        <div className='pagination-center'>
            <Spacing align='center'>
                {page}
                <Typography>/</Typography>
                <Typography>{size}</Typography>
            </Spacing>
        </div>
        <div className='pagination-next'>
            <Button icon={<FontAwesomeIcon icon={faAngleRight} />} simple variant='outlined' onClick={onNextClick}/>
        </div>
    </Spacing>
}