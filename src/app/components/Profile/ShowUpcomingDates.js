import React, { useState, useEffect } from 'react';
import { Box, Tooltip, IconButton, Modal, Button } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
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
})

const ShowUpcomingDates = (props) => {

    const theme = useTheme();
    const styles = useStyles(theme);
    const [upcoming, SetUpcoming] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, SetTitle] = useState("");
    const [clients, SetClients] = useState([]);
    
    useEffect(() => {
        SetUpcoming(props.upcomingDates);
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
        <Box sx={{ width: '100%', height: '100%', overflowY: 'scroll'}}>
            <h2 style={{ textAlign: 'center', paddingBottom: '4%'}}>Upcoming Dates</h2>
            <DisplayItem open={open} handleClose={handleClose} title={title} clients={clients}/>
            {Array.isArray(upcoming) ? (

                upcoming.map((x, i) => (
                    <Box key={i}>
                        <p style={{ fontSize: '1.6em', textAlign: 'center', cursor:'pointer'}} 
                            onClick={() => handleOpen(Object.keys(x)[0], x[Object.keys(x)[0]])}
                        >
                            <u>{dayjs(Object.keys(x)[0]).format('ddd, DD MMM YYYY')}</u>
                        </p>
                    </Box>
              ))
            ) : (
                <></>
            )}
        </Box>
    )
}

export default ShowUpcomingDates;



            // if(Array.isArray(upcoming)){
        //     upcoming.map((x) => {
        //         let key = Object.keys(x)[0]; // title
        //         let clients = x[key]; // clients array
                
        //         console.log(key); 

        //         clients.map((y) => {
        //             let clientname = y[0];
        //             let clienttime = y[1];
        //             let duration = y[2];
                    
        //             console.log(`${clientname} --- ${clienttime} --- ${duration}`);
        //         })

        //         console.log("================================================");
        //     })
        // }