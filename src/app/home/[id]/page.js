"use client"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Homepage({ params }) {

    
    const [ currentSelectedDate, SetCurrentSelectedDate] = useState("");
    const [ excludeDates, SetExcludeDates ] = useState([]);

    useEffect(() => {
        axios.get('/api/getAllDate').then(function(response){
            let temp = [];
            
            response.data[0].dates.map((x) => {
                temp.push(new Date(x).toString());
            })

            SetExcludeDates(temp);
        })
    },[]);

    const handleCurrentDate = (value) => {
        SetCurrentSelectedDate(value.$d.toString()); 
    }

   
    const handleDateDisable = (value) => {

         /**
         * Maps Over all Calender dates with shouldDisableDateProp.
         * Excludes dates in given array
         */
        
        return excludeDates.includes(value.$d.toString());
    }

    const handleReserveDate = () => {
        
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

            <Button onClick={handleReserveDate}>Reserve</Button>
        </div>
    )
}