import React, {useContext, useState} from 'react';
import { Box, Button, Modal, Typography, TextField, Divider, List, ListItem} from '@mui/material';
import Day from './Day';
import dayjs from 'dayjs';
import axios from 'axios';
import { useTheme }  from '@mui/material/styles';

const useStyles= (theme) => ({
    monthRoot: {
        display: 'flex',
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
    },
    modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: '28%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    innerModal:{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    modalButtons: {
        display: 'flex',
        flexDirection: 'column'
    }
})


export default function Month({month,username}) {

    const theme = useTheme();
    const styles = useStyles(theme);
    const [ activeDate, SetActiveDate ] = useState("");
    const [ showClientField, SetShowClient] = useState("none");
    const [ currentClient, SetClient ] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = (day) => {
        SetActiveDate(day.format('ddd, DD MMM YYYY'))
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

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

    const makeDateAvailable = () => {
        axios.post('/api/therapist/add_available_date', {
            Username: username,
            newDate: activeDate,
        })
        .then(function (response) {
            alert(response.data.msg);
        })
        .catch(function (error) {
            console.log(error);
            alert("Something Went Wrong");
        });
    }

    const showClient = () => {
        SetShowClient("block");
    }
    
    const handleClientField = (e) => {
        SetClient(e.target.value);
    }

    const AddClient = () => {
        axios.post('/api/therapist/add_client', {
            therapist: username,
            newDate: activeDate,
            client: currentClient
        })
        .then(function (response) {
            alert(response.data.msg);
            SetShowClient("none");
            SetClient("");
        })
        .catch(function (error) {
            console.log(error);
            alert("Something Went Wrong");
        });
    }

    
    
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Current-Selected-Date"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modalStyle}>
                    <Typography id="selected-date" variant="p" component="h5" align='center'>{activeDate}</Typography>

                    <Box sx={styles.innerModal}>
                            <Box sx={styles.modalButtons}>
                                <Button onClick={makeDateAvailable}>Add Availability</Button>
                                <Button onClick={showClient}>Add Client</Button>
                                <TextField id="outlined-basic" label="client name" variant="outlined" sx={{display: showClientField}} onChange={handleClientField}/>
                                <Button onClick={AddClient} sx={{ display: showClientField}}>Confirm</Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </Box>

                            <Divider orientation="vertical" flexItem />

                            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '9%'}}>
                                <Typography>Scheduled</Typography>
                                <ul>
                                    <li>Coffee</li>
                                    <li>Tea</li>
                                    <li>Milk</li>
                                </ul>
                            </Box>
                    </Box>
                      
                </Box>
            </Modal>

            <Box sx={styles.monthRoot}>
                {month.map((row, i) => (
                        <React.Fragment key={i}>
                            {row.map((day, idx) => (
                                <Box key={idx} sx={handlePastDates(day)} onClick={() => handleOpen(day)}>
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
