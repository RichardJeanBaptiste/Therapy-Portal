import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useTheme }  from '@mui/material/styles';

const useStyles = (theme) => ({

    modalStyle2: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
})

export default function ShowDeleteClient(props) {

    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <Modal
            open={props.open2}
            onClose={props.handleClose2}
            aria-labelledby={props.clientName}
            aria-describedby={`Remove ${props.clientName} from client list`}
            >
            <Box sx={styles.modalStyle2}>
                <Typography component='h3' variant='h3' align='center' sx={{ fontSize: '2rem'}}>{`Remove ${props.clientName} from client list?`}</Typography>
                <Typography component='p' variant='p' align='center' sx={{ marginTop: '2%'}}>This will remove the client and all Scheduled Appointments</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '95%', marginTop: '7%'}}>
                <Button variant='outlined' color='info' onClick={props.handleClose2}>Cancel</Button>
                <Button variant='outlined' color='error' sx={{ position: 'absolute', right: '6%'}} onClick={props.removeClient}>Remove</Button>
                </Box>
            </Box>
        </Modal>
    )
}

