import {React, useContext} from 'react'
import { useStateValue } from './DateProvider';

export default function Month() {

    const { state, setState, currentDate } = useStateValue();

    const handleClick = () => {
        setState("check child click")
    }

    return (
        <>
            <div>{currentDate}</div>
            <div onClick={handleClick}>{state}</div>
        </>
        
    )
}
