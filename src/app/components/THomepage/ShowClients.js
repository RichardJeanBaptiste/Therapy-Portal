import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import { useTheme }  from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

const useStyles= (theme) => ({
    card_container: {
        width: '90em',
        height: '45em',
    },
    card_container2:{
        position:'relative',
        top: '13%',
        left: '18%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 250px)',
        gridGap: '20px',
        width: '66%',
    },
    right_nav: {
        position: 'absolute',
        top: '-9%',
        right: '0%',
        width: '20em',
        height: '54em',
        borderLeftStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'lightgrey',
    },
    cardStyle: {
        width: '13em',
        height: '18em',
        borderRadius: '5%',
        border: '1px solid #BDBDBD',
        '&:hover': {
            borderColor: 'blue'
        },
    }
})

export default function ShowClients(props) {

    const theme = useTheme();
    const styles = useStyles(theme);

    const [ clients, SetClients ] = useState([]);
    const [ scheduled, SetScheduled ] = useState([]);

    useEffect(() => {

        axios.post('/api/therapist/dashboard', {
            username: props.username
        }).then((response) => {
            SetClients(response.data.clients);
            SetScheduled(response.data.scheduled);

        }).catch((error) => {
            console.log(error);
        })
    },[props.username]);

    const ClientCard = (props) => {
        return (
            <Card variant='outlined' sx={styles.cardStyle}>
                <Typography variant='p' component='p' align='center'>{props.name}</Typography>
            </Card>
        )
    }



    return (
        <>
            <Box>

                <Typography variant='body1' component="p">Clients</Typography>
                <Box sx={styles.card_container}>
                    <Box sx={styles.card_container2}>
                        {clients.map((x, index) => {
                            return (
                                <ClientCard key={index} name={x}/>
                            )
                        })}
                    </Box>
                </Box>

                <Box sx={styles.right_nav}>
                    <Typography variant='body1'> Upcoming Appointments</Typography>
                    {scheduled.map((x, index) => {

                        let date = new Date(x);

                        let reviseddate = date.toUTCString();

                        return (
                            <p key={index}>{reviseddate}</p>
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}
