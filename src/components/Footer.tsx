import ResetButton from "./ResetButton.tsx";
import Moves from "./Moves.tsx";
import {CSSProperties} from "react";

export default function Footer() {


    const style: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between'
    }

    return (<div style={style}>
        <ResetButton/>
        <Moves/>
    </div>);
}