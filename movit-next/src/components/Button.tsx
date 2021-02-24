import { useState } from 'react';
interface buttonProps {
    color: string;
    children: string;
}

export function Button(props: buttonProps) {
    const [counter, setCounter] = useState(1);

    function increment(){
        setCounter(counter + 1);
    }

    return (
        <button 
        type="button"
        style={{ backgroundColor: props.color}}
        onClick={increment}
        >
            {props.children} <strong> {counter} </strong>
        </button>
    );
}