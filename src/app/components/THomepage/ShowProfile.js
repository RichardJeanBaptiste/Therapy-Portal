/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import Image from 'next/image';
import catImg from  "../../../../public/p1.png";
const useStyles= (theme) => ({
  root: {
    width: '40em',
    height: '20em',
    marginLeft: '4%'
  },
  oBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '4%',
    marginLeft: '5%',
    backgroundColor: 'rgba(104,176,171, 0.1)',
    borderRadius: '2%',
    width: '49em',
    height: '16em',

  },

  oBoxTitle: {
    whiteSpace: 'pre-wrap',
    marginTop: '5%',
    marginLeft: '8%'
  }
})

export default function ShowProfile(props) {

  const theme = useTheme();
  const styles = useStyles(theme);

  const name = props.info[2].replace(new RegExp("%20", 'g'), " ");
  const date = new Date().toDateString();

  return (
    <>
      <Box>
        <Typography variant="h5" component="h5"sx={{ marginLeft: '3%'}}>Overview</Typography>

        <Box sx={styles.oBox}>
          <Image
            src={catImg}
            width={200}
            height={200}
            alt="Stock Therapy Photo"
          />

          <Typography sx={styles.oBoxTitle}>Welcome, {name} 
            {"\n"}Today's Date: {date}
            {"\n"}Upcoming Appointment: 
          </Typography>
          <Box>
            
          </Box>
        </Box>
      </Box>
    </>
  )
}

/**
 * 
 * 
 * 
 * <Box sx={styles.root}>
       
        <Box sx={styles.oBox}>

          <Image
            src={catImg}
            width={200}
            height={200}
            alt="Stock Therapy Photo"
          />

          <Typography sx={styles.oBoxTitle}>Welcome, {name} {"\n"}Today's Date: {date}</Typography>

        </Box>
      </Box>
      
 */