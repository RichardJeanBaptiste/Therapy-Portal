"use client"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect, useState } from 'react';


export default function Homepage({ params }) {

    
    const [ currentSelectedDate, SetCurrentSelectedDate] = useState("");
    const [ excludeDates, SetExcludeDates ] = useState([]);

    useEffect(() => {
        
    },[]);

    const handleCurrentDate = (value) => {
        // let temp = [value.$M, value.$D, value.$y]
        // console.log(value.$d.toString());
        SetCurrentSelectedDate(value.$d.toString()); 
    }

    const handleDateDisable = (value) => {
        
        // const excludeDates = [
        //     new Date("Thu Sep 21 2023").toString(),
        //     new Date("Tue Sep 19 2023").toString(),
        //     "Sun Sep 10 2023 00:00:00 GMT-0400 (Eastern Daylight Time)",
        // ]

        return excludeDates.includes(value.$d.toString());
    }

    return (
        <div>
            <h3>User: {params.id}</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar 
                    onChange={handleCurrentDate} // value.$D
                    shouldDisableDate={handleDateDisable}
                />
            </LocalizationProvider>
        </div>
    )
}