import React from 'react'
import { Modal, Box, Typography, Button } from '@mui/material';
import { useTheme }  from '@mui/material/styles';

const useStyles = (theme) => ({

    modalStyle: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 450,
      height: '27em',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    },
    list: {
      height: '17em',
      width: '13em',
      overflowY: 'scroll',
      marginLeft: '7%'
    },
    list2: {
      display: 'flex',
      flexDirection: 'row',
      width: '15em',
      justifyContent: 'center',
      alignItems: 'center'
    },
    listitem: {
      fontSize: '1rem',
      paddingBottom: '5%',
    },
})

export default function ShowClientDates(props) {

    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby={props.clientName}
                aria-describedby={`Appointments Scheduled for ${props.clientName}`}
            >
            <Box sx={styles.modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                {`${props.clientName}'s Upcoming Appointments`}
                <ul>
                    <Box sx={styles.list}>
                    {Array.isArray(props.dates) ? (
                        props.dates.map((x, i) => (
                        <Box key={i} sx={styles.list2}>
                            <li key={i}>
                            <Typography variant="p" component="p" sx={styles.listitem}>{x}</Typography>
                            </li>
                        </Box>
                        ))
                    ) : (
                        <></>
                    )}
                    </Box>
                </ul>
                </Typography>
                <Button variant='outlined' color='error' onClick={props.handleClose}>Close</Button>
            </Box>
            </Modal>
        </>
    )
}

