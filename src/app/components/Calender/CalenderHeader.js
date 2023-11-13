import React, { useContext } from 'react';
import TodayIcon from '@mui/icons-material/Today';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Typography, Button } from '@mui/material';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';

export default function CalenderHeader() {

    const {monthIndex, setMonthIndex} = useContext(GlobalContext);

    const handlePrevMonth = () => {
        setMonthIndex(monthIndex - 1);
    }

    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1);
    }

    const handleReset = () => {
        setMonthIndex(dayjs().month())
    }

    return (
        <header sx={{ paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom:'0.5rem', display: 'flex', alignItems: 'center'}}>
            <TodayIcon/>
            <Typography variant="h1" component="h1" sx={{ marginRight: '2.5rem', fontSize: '1.25rem', color: '#718096', fontWeight: 'bold'}}>
                Calendar
            </Typography>
            <Button sx={{ color: '#4a5568'}} onClick={handleReset}>Today</Button>
            <Button onClick={handlePrevMonth}>
                <span sx={{cursor: 'pointer', marginLeft: '0.5rem', marginRight: '0.5rem'}}>
                    <ChevronLeftIcon sx={{ color: '#4a5568'}}/>
                </span>
            </Button>
            <Button onClick={handleNextMonth}>
                <span sx={{cursor: 'pointer', marginLeft: '0.5rem', marginRight: '0.5rem'}}>
                    <ChevronRightIcon sx={{ color: '#4a5568'}}/>
                </span>
            </Button>
            <Typography component='h2' sx={{ marginLeft: '1rem', fontSize:'1.25rem', color: '#718096', fontWeight: 'bold'}}>
                {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </Typography>
        </header>
    )
}

