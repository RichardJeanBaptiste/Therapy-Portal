import React, {useState} from 'react';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

export default function Day({day, rowIdx}) {


    const getCurrentDay = () => {


        if(day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")){
            return {fontSize: '0.875rem', padding: '0.25rem',  
                    marginTop: '0.25rem', marginBottom: '0.25rem', 
                    backgroundColor: '#3b82f6', color: '#ffffff',  borderRadius: '9999px',  width: '1.75rem', height: '1.75rem'}
        } else {
            return {fontSize: '0.875rem', padding: '0.25rem',  marginTop: '0.25rem', marginBottom: '0.25rem'}
        }

    }

    return (
        <Box sx={{
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <header sx={{ display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                {rowIdx === 0 && (
                    <Typography component='p' sx={{fontSize: '0.875rem' , padding: '0.25rem', marginTop: '0.25rem'}} align='center'>{day.format('ddd').toUpperCase()}</Typography>
                )}
                
                <Typography component='p' sx={getCurrentDay} align='center'>
                    {day.format('DD')}
                </Typography>
            </header>
            
        </Box>
    )
}

