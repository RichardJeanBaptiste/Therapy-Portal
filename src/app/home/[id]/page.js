"use client"

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
import { React , useEffect, useState } from 'react';
// import axios from 'axios';
//import Calender from '@/app/components/Calender/Calender';
import Thomepage from '@/app/components/THomepage/Thomepage';



export default function Homepage({ params }){

    const info = params.id.split("-");

    return (
        <>  
            <Thomepage info={info}/>
        </>
    )
}

