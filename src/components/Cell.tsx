import {BaseSyntheticEvent, CSSProperties, MouseEventHandler} from "react";


interface Props {
    value: number,
    index: number,
    isFilled: boolean
    handleClick: MouseEventHandler
}

export default function Cell({value, index, isFilled, handleClick}: Props) {
    const style: CSSProperties = {
        userSelect: 'none',
        width: '6vw',
        height: '6vw',
        textAlign: 'center',
        lineHeight: '6vw',
        fontSize: '3vw',
        background: value - 1 == index && value != 16 ? 'green' : (isFilled ? '#234567' : 'white')
    }

    function handleOver(e: BaseSyntheticEvent) {
        e.target.style.cursor = 'pointer';
    }

    function handleLeave(e: BaseSyntheticEvent) {
        e.target.style.cursor = 'default';
    }

    return <div onMouseOver={handleOver} onMouseLeave={handleLeave} onMouseDown={handleClick}
                style={style}>{value !== 16 ? value : ""}</div>
}