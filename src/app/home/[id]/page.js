"use client"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { React , useEffect, useState } from 'react';
import axios from 'axios';
import Calender from '@/app/components/Calender/Calender';



export default function Homepage({ params }){
    return (
        <>
            <Calender/>
        </>
    )
}



// export default function Homepage({ params }) {

    
//     const [ currentSelectedDate, SetCurrentSelectedDate] = useState("");
//     const [ excludeDates, SetExcludeDates ] = useState([]);

//     useEffect(() => {
//         // axios.get('/api/getAllDate').then(function(response){
//         //     let temp = [];
            
//         //     response.data[0].dates.map((x) => {
//         //         temp.push(new Date(x).toString());
//         //     })

//         //     SetExcludeDates(temp);
//         // })
//     },[]);

//     const handleCurrentDate = (value) => {
//         SetCurrentSelectedDate(value.$d.toString()); 
//     }

   
//     const handleDateDisable = (value) => {

//          /**
//          * Maps Over all Calender dates with shouldDisableDateProp.
//          * Excludes dates in given array
//          */
        
//         return excludeDates.includes(value.$d.toString());
//     }

//     const handleReserveDate = () => {
        
//     }

//     return (
//         <div>
//             <h3>User: {params.id}</h3>
//             <Box sx={{ display: 'flex', flexDirection: 'row'}}>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DateCalendar 
//                         onChange={handleCurrentDate} // value.$D
//                         shouldDisableDate={handleDateDisable}
//                         disablePast = {true}
//                     />
//                 </LocalizationProvider>

//                 <Button onClick={handleReserveDate}>Reserve</Button>
//             </Box>
            
//         </div>
//     )
// }