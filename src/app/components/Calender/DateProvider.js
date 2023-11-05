import {React, createContext, useContext, useState, useEffect } from 'react'

const DateContext = createContext();

export function DateProvider({ children }){

    const [ state, setState ] = useState("test provider");
    const [ currentDate, setCurrentDate ] = useState("");
    const [ dates, setDates ] = useState([]);

    const getDatesInRange = (startDate, endDate) => {

    }

    useEffect(() => {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        console.log(firstDay)
        setCurrentDate(new Date().toDateString());
    },[])


    return (
        <DateContext.Provider value={{ state, setState, currentDate }}>
            {children}
        </DateContext.Provider>
    )
}

export function useStateValue(){
    return useContext(DateContext);
}
