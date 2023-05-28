import {CSSProperties} from "react";

interface Props {
    count: number;
}
export default function Moves({count}: Props) {

    const style:CSSProperties = {
        paddingTop: '0.1vw',
        paddingRight: '0.4vw',
        fontSize: '1.2vw'
    }

    return <div style={style}>Moves: {count}</div>
}