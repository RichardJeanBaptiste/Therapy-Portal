import React, {useContext} from 'react';

import { Box } from '@mui/material';
import Day from './Day';
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
    
    return (
        <>
            <Box sx={styles.monthRoot}>
                {month.map((row, i) => (
                        <React.Fragment key={i}>
                            {row.map((day, idx) => (
                                <Day day={day} key={idx} rowIdx={i}/>
                            ))}
                        </React.Fragment>
                    )
                )}
            </Box>
        </>
        
    )
}
