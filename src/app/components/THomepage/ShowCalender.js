import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import './Calendar.css';
import { getMonth } from '../util';
import CalenderHeader from '../Calender/CalenderHeader';
import Month from '../Calender/Month';
import Sidebar from '../Calender/Sidebar';
import GlobalContext from '../Calender/GlobalContext';

const useStyles= (theme) => ({
    calenderRoot: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '0%',
    }
})


export default function ShowCalender(props) {
  const theme = useTheme();
  const styles = useStyles(theme);

  const [currentMonth, setCurrentMonth] = useState(getMonth())

  const {monthIndex} = useContext(GlobalContext)
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  },[monthIndex])

  return (
    <>
        <Box sx={styles.calenderRoot}>
            <CalenderHeader username={props.username}/>
            <Box sx={{ display:'flex', flex: 1}}>
              <Sidebar/>
              <Month month={currentMonth} username={props.username}/>
            </Box>
        </Box>
    </>
  )
}
