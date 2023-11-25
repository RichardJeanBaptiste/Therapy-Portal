import React, { useContext, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import QueueIcon from '@mui/icons-material/Queue';
import { Typography, Button, Modal, Box, Divider } from '@mui/material';
import GlobalContext from './GlobalContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import { useTheme }  from '@mui/material/styles';

const useStyles= (theme) => ({
    modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 530,
        height: '40%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
})

export default function CalenderHeader(props) {

    const theme = useTheme();
    const styles = useStyles(theme);
    const {monthIndex, setMonthIndex} = useContext(GlobalContext);
    const [ chevLeftColor, SetChevLeftColor] = useState(false);
    const [ chevRightColor, SetChevRightColor] = useState(false);
    const [ beginDate, SetBeginDate ] = useState(dayjs());
    const [ endDate, SetEndDate ] = useState(dayjs().add(1, 'month'));
    const [open, setOpen] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePrevMonth = () => {
        setMonthIndex(monthIndex - 1);
    }

    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1);
    }

    const handleReset = () => {
        setMonthIndex(dayjs().month())
    }

    const iconLeftStyles = {
        color: chevLeftColor ? 'blue' : "#4a5568",
    };

    const iconRightStyles = {
        color: chevRightColor ? 'blue' : "#4a5568",
    };

    const Add_Multiple_Dates = () => {

        axios.post('/api/therapist/add_multiple_dates', {
            Username: props.username,
            beginDate: beginDate,
            endDate: endDate
        })
        .then(function (response) {
            alert(response.data.msg);
        })
        .catch(function (error) {
            console.log(error);
            alert("Something Went Wrong");
        });
    }

    return (
        <header sx={{ paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom:'0.5rem', display: 'flex', alignItems: 'center'}}>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modalStyle}>
                    <Typography component='h3' variant='h3' sx={{ fontSize: '1.75rem'}}>Availability</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop:'7%'}}>
                                <DatePicker
                                    label="Begin Date"
                                    value={beginDate}
                                    onChange={(newValue) => SetBeginDate(newValue)}
                                />

                                <Divider orientation="vertical" flexItem />

                                <DatePicker
                                    label="End Date"
                                    value={endDate}
                                    onChange={(newValue) => SetEndDate(newValue)}
                                />
                            </Box>    
                        </LocalizationProvider>

                        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '8%'}}>
                            <Button variant='outlined' color='error' onClick={handleClose} sx={{ width: '6em', height: '3em'}}>Cancel</Button>
                            <Button 
                                variant='outlined' 
                                color='primary' 
                                sx={{ position: 'absolute', right: '34px', width:'9em', height: '3em'}} 
                                onClick={Add_Multiple_Dates}
                            >
                                Add Dates
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>


            <Typography component='h2' sx={{ marginLeft: '1rem', fontSize:'1.25rem', color: '#718096', fontWeight: 'bold'}}>
                {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </Typography>
            <Button sx={{ color: '#4a5568'}} onClick={handleReset}>Today</Button>
            <Button onClick={handlePrevMonth}>
                <span 
                    sx={{cursor: 'pointer', marginLeft: '0.5rem', marginRight: '0.5rem'}} 
                    onMouseEnter={() => SetChevLeftColor(true)}
                    onMouseLeave={() => SetChevLeftColor(false)} 
                >
                    <ChevronLeftIcon sx={iconLeftStyles}/>
                </span>
            </Button>
            <Button onClick={handleNextMonth}>
                <span 
                    sx={{cursor: 'pointer', marginLeft: '0.5rem', marginRight: '0.5rem'}}
                    onMouseEnter={() => SetChevRightColor(true)}
                    onMouseLeave={() => SetChevRightColor(false)} 
                >
                    <ChevronRightIcon sx={iconRightStyles}/>
                </span>
            </Button>
            <Button onClick={handleOpen}>
                <span>
                    <QueueIcon sx={{ color: '#4a5568'}}/>
                </span>
            </Button>
           
        </header>
    )
}

