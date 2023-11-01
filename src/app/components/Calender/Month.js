import {React, useContext} from 'react'
import { useStateValue } from './DateProvider';

export default function Month() {

    const { state, setState, pfunction } = useStateValue();

    const handleClick = () => {
        setState("check child click")
    }

    return (
        <>
            <div onClick={handleClick}>{state}</div>
            <button onClick={pfunction}>test</button>
        </>
        
    )
}
