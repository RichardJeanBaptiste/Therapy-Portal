import React, {useContext} from 'react';

import { Box, Button } from '@mui/material';
import Day from './Day';
import dayjs from 'dayjs';
import { useTheme }  from '@mui/material/styles';

const useStyles= (theme) => ({
    monthRoot: {
        display: 'flex',
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
    }
})


export default function Month({month}) {

    const theme = useTheme();
    const styles = useStyles(theme);

    const handlePastDates = (thisDay) => {
        let currentDate = dayjs().subtract(1, 'day');

        if(thisDay < currentDate){
            return {
                opacity: '0.5',
                pointerEvents: 'none',
            }
        } else {
            return {}
        }
    }
    
    return (
        <>
            <Box sx={styles.monthRoot}>
                {month.map((row, i) => (
                        <React.Fragment key={i}>
                            {row.map((day, idx) => (
                                <Box key={idx} sx={handlePastDates(day)}>
                                    <Day day={day} key={idx} rowIdx={i}/>
                                </Box>
                            ))}
                        </React.Fragment>
                    )
                )}
            </Box>
        </>
        
    )
}
