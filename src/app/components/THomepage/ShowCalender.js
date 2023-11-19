import React, { useState, useEffect, useContext } from 'react';
import { Typography, Box, Button, IconButton, Tooltip, Modal, TextField } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTheme }  from '@mui/material/styles';
import axios from 'axios';
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
      marginLeft: '2%',
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
            <CalenderHeader/>
            <Box sx={{ display:'flex', flex: 1}}>
              <Sidebar/>
              <Month month={currentMonth} username={props.username}/>
            </Box>
        </Box>
    </>
  )
}
