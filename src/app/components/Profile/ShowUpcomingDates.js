import React, { useState, useEffect } from 'react';
import { Box, Tooltip, Modal } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import { compareDateKeys } from '../util';
import dayjs from 'dayjs';

const useStyles= (theme) => ({
    modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    },
    root: {
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
    },
    
    heading: {
        textAlign: 'center',
        paddingBottom: '4%'
    },
    date_p: {
        fontSize: '1.6em',
        textAlign: 'center',
        cursor: 'pointer'
    }
})

const ShowUpcomingDates = (props) => {

    const theme = useTheme();
    const styles = useStyles(theme);
    const [upcoming, SetUpcoming] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, SetTitle] = useState("");
    const [clients, SetClients] = useState([]);
    
    useEffect(() => {
        let temp = props.upcomingDates.sort(compareDateKeys);
        let upcomingDates = [];

        temp.map((x) => {

            let parsed = dayjs(Object.keys(x)[0]);

            if(parsed.isAfter(dayjs())){
                upcomingDates.push(x);
            };
        })

        SetUpcoming(upcomingDates);
    },[props.upcomingDates]); 

    const handleOpen = (currentTitle , clients) => {
        SetClients(clients);
        SetTitle(currentTitle);
        setOpen(true);

    };
    
    const handleClose = () => {
        setOpen(false);
    };  
    

    const DisplayItem = (props) => {
        return (
            <>
                <Modal
                    open={props.open}
                    onClose={props.handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={styles.modalStyle}>
                        <h2 id="child-modal-title" style={{ textAlign: 'center'}}>{props.title}</h2>
                        <h3 style={{ textAlign: 'center'}}>Clients</h3>
                        {Array.isArray(props.clients) ? (
                            props.clients.map((x, i) => (
                                <p style={{ textAlign: 'center'}} key={i}>{`${x[0]} --- ${x[1]} --- ${x[2]}`}</p>
                            ))
                            ) : (
                            <></>
                        )}
                    </Box>
                </Modal>
            </>
        )
    }

    return (
        <Box sx={styles.root}>
            <h2 style={styles.heading}>Upcoming Dates</h2>
            <DisplayItem open={open} handleClose={handleClose} title={dayjs(title).format('ddd, DD MMM YYYY')} clients={clients}/>
            {Array.isArray(upcoming) ? (

                upcoming.map((x, i) => (
                    <Box key={i}>
                        <Tooltip title={`Show Clients for: ${Object.keys(x)[0]}`} arrow>
                            <p style={styles.date_p} 
                                onClick={() => handleOpen(Object.keys(x)[0], x[Object.keys(x)[0]])}
                            >
                                <u>{dayjs(Object.keys(x)[0]).format('ddd, DD MMM YYYY')}</u>
                            </p>
                        </Tooltip>  
                    </Box>
              ))
            ) : (
                <></>
            )}
        </Box>
    )
}

export default ShowUpcomingDates;

