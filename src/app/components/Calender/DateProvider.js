import {React, createContext, useContext, useState } from 'react'

const DateContext = createContext();

export function DateProvider({ children }){

    const [state, setState ] = useState("test provider");

    const pfunction = () => {
        alert(state);
    }

    return (
        <DateContext.Provider value={{ state, setState, pfunction }}>
            {children}
        </DateContext.Provider>
    )
}

export function useStateValue(){
    return useContext(DateContext);
}
