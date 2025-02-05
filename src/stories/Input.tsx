import React from 'react';
import { Input as BaseInput } from '@base-ui-components/react/input';

import './input.css';



export interface InputProps {
    /** Current value. */
    value?: string;
    /** Displayed value. */
    displayValue?: string;
    /** Text that should be shown without input text. */
    placeholder?: string;
    /** Is true, then input width is 100% */
    fill?: boolean;
    /** Should the content be selected when this element become focused. */
    autoSelect?: boolean;
    /** Disables the element. */
    disabled?: boolean;

    /** Change handler. */
    onChange?: (value: string | null) => any;
    /** Apply (enter/ok) handler. */
    onApply?: (value: string | null) => any;
};

export const Input = ({
    value,
    displayValue,
    placeholder,
    fill = false,
    autoSelect = true,
    disabled = false,
    onChange,
    onApply,
    ...props
}: InputProps & React.ComponentProps<typeof BaseInput>) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const spanRef = React.useRef<HTMLSpanElement>(null);

    const [_current, _setCurrent] = React.useState('');
    const [ _input, setInput ] = React.useState<string>('');
    const [ width, setWidth ] = React.useState(0);
    const [ focused, setFocused ] = React.useState(false);

    

    const _onInput = () => {
        if(inputRef.current == null) return;
        const inputHTML = inputRef.current as HTMLInputElement;

        if(value === undefined){
            _setCurrent(inputHTML.value);
        }
        onChange?.(inputHTML.value);

        if(focused){
            setInput(inputHTML.value);
        }
    }

    const renderValue = displayValue ?? (focused ? _input : undefined) ?? value ?? _current;

    React.useEffect(() => {
        if(spanRef.current === null) return;

        setWidth(spanRef.current.offsetWidth + 35);
    }, [inputRef.current, renderValue]);

    const onFocus = () => {
        if(!focused && autoSelect){
            setInput(value ?? _current);
            setFocused(true);

            if(inputRef.current === null) return;
            inputRef.current.select();
        }
    };

    const onBlur = () => {
        setFocused(false);
        onApply?.(_input);
    };

    const onClick = () => {
        onFocus();
    }

    // const charWidth = (renderValue.length == 0 ? (placeholder?.length ?? 0) : renderValue.length) + 4;

    return <div>
        <span ref={spanRef} className='input-span'>{renderValue.length > 0 ? renderValue : placeholder}</span>
        <BaseInput 
            {...props} 
            ref={inputRef} 
            placeholder={placeholder} 
            value={renderValue} 
            onInput={_onInput} 
            className={[fill ? 'input-fill' : 'input-fit', disabled ? 'input--disabled' : null, props.className].join(' ')} 
            style={{width: fill ? '100%' : width}} //`${charWidth}ch`, ...props.style 
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={onClick}
            data-testid='input'
            disabled={disabled}
        />
    </div>
}