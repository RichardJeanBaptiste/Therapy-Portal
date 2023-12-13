"use client"

import {React, useState, useEffect } from 'react';
import { TextField, Typography, Box, Button, Divider, Modal, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio  } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import back_img from '../../public/stock_notes.jpg';
import Image from 'next/image';
import axios from 'axios';

//#eaf7ff

const useStyles= (theme) => ({
    root: {
      width: '98vw',
      height: '98vh'
    },
    root2: {
      display: 'flex',
      flexDirection: 'row'
    },
    img: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100vh',
      width: '850'
    },
    login: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    login2: {
      display: 'flex',
      flexDirection: 'column',
      width: '35%',
      height: '60%',
      position: 'absolute',
      top: '10%',
      left: '58%'
    },
    navicon: {
      position: 'absolute',
      top: '30px',
      right: '35px',
    },
    title1: {
      position: 'absolute',
      top: '44%',
      left: '34%',
      transform: "translate('-50%', '-50%')",
    },
    modalStyle: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      height: '75%',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    },
})


export default function Home() {

  const theme = useTheme();
  const styles = useStyles(theme);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [showFields, SetShowFields] = useState("block");

  /****************************** Register States ****************************/
  const [regRole, SetRegRole] = useState("Therapist");
  const [regUsername, SetRegUsername] = useState("");
  const [regPassword, SetRegPassword] = useState("");
  const [passMatch, SetPassMatch] = useState("primary");
  const [regName, SetRegName] = useState("");
  const [regAge, SetRegAge] = useState("");
  const [regBio, SetRegBio] = useState("");
  const [regSpecialty, SetRegSpecialty] = useState("");
  const [regEducation, SetRegEducation] = useState("");
  const [regYearsWorking, SetRegYearsWorking] = useState("");




  /******************************* Login States ******************************/
  const [loginUsername, SetLoginUsername] = useState("");
  const [loginPassword, SetLoginPassword] = useState("");


  const handleOpen = () => {
    SetShowFields("none");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  

  /*********************************** Register *************************************************/
  const handleRegUsername = (e) => {
    SetRegUsername(e.target.value);
  }

  const handleRegPassword = (e) => {
    SetRegPassword(e.target.value);
  }

  const handlePasswordCheck = (e) => {
    if(e.target.value === regPassword){
      SetPassMatch("success");
    } else {
      SetPassMatch("error");
    }
  }

  const handleRegRole = (e) => {
    SetRegRole(e.target.value);

    if(showFields === "none"){
      SetShowFields("block");
    } else if(showFields === "block"){
      SetShowFields("none");
    }

  }

  const handleRegName = (e) => {
    SetRegName(e.target.value); 
  }

  const handleRegAge = (e) => {
    SetRegAge(e.target.value);
  }

  const handleRegBio = (e) => {
    SetRegBio(e.target.value);
  }

  const handleSpecialty = (e) => {
    SetRegSpecialty(e.target.value);
  }

  const handleRegEducation = (e) => {
    SetRegEducation(e.target.value);
  }

  const handleYearsWorking = (e) => {
    SetRegYearsWorking(e.target.value);
  }

  

  const handleRegister = (e) => {
    e.preventDefault();

    // if(regRole === "Therapist"){
    //   data = {
    //     username: regUsername,
    //     password: regPassword,
    //     role: regRole,
    //     name: regName,
    //     age: regAge,
    //     bio: regBio,
    //     specialty: regSpecialty,
    //     education: regEducation,
    //     yearsWorking: regYearsWorking
    //   }
    // } else {
    //   data = {
    //     username: regUsername,
    //     password: regPassword,
    //     role: regRole,
    //     name: regName,
    //     age: regAge,
    //     bio: regBio
    //   }
    // }

    let data = {
      username: regUsername,
      password: regPassword,
      role: regRole,
      name: regName,
      age: regAge,
      bio: regBio,
      specialty: regSpecialty,
      education: regEducation,
      yearsWorking: regYearsWorking
    }

    axios.post('/api/register', data)
    .then(function (response) {

      if(response.data.msg === "Account Created"){
        alert("Account Created");
        handleClose();
      } else if(response.data.msg === "Account Already Exists"){
        alert("Username exists");
        handleClose();
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Something Went Wrong");
    });
  }

  /****************************************************** LOGIN ******************************************************/

  const handleLoginUsername = (e) => {
      SetLoginUsername(e.target.value);
  }

  const handleLoginPassword = (e) => {
      SetLoginPassword(e.target.value);
  }


  const handleLogin = () => {

    axios.post('/api/login', {
      username: loginUsername,
      password: loginPassword
    })
    .then(function (response) {

      if(response.status === 200){
        
        let id = response.data.msg[0];
        let user = response.data.msg[1];
        let name = response.data.msg[2];

        localStorage.setItem('jwtToken', response.data.msg[3]);

        let route = `${id}-${user}-${name}`;
        
        router.push(`/home/${route}`, { scroll: false })
      } 
    })
    .catch(function (error) {

      if(error.response.status === 404){
        alert("Username or Password not found");
      } else {
        console.log(error);
        alert("Something Went Wrong");
      }
      
    });

  }


  return (
    <Box style={styles.root}>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Registration Form"
        aria-describedby="Register account with Therapy Portal"
      >
        <Box sx={styles.modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">Register</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form style={{ height: '35em', overflowY: 'scroll' }} onSubmit={handleRegister}>
                  <TextField id="reg_username"  label="Username" variant="outlined"  fullWidth required={true} sx={{ paddingBottom: '2.5%'}} onChange={handleRegUsername}/>
                  <TextField id="reg_password"  type="password" label="Password" variant="outlined"  fullWidth required sx={{ paddingBottom: '2.5%'}} onChange={handleRegPassword}/>
                  <TextField id="reg_password2" type="password" label="Re-enter" variant="outlined" fullWidth color={passMatch} required sx={{ paddingBottom: '2.5%'}} onChange={handlePasswordCheck}/>
                  <TextField id="name"  label="Name" variant="outlined"   fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleRegName}/>
                  <TextField id="age" label="Age" variant="outlined" fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleRegAge}/>
                  <TextField id="bio"  label="Bio" variant="outlined"  multiline maxRows={4} fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleRegBio}/>
                  <Box sx={{ display: "block"}}>
                      <TextField id="specialty"  label="Specialty" variant="outlined"   fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleSpecialty}/>
                      <TextField id="education"  label="Education" variant="outlined"   fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleRegEducation}/>
                      <TextField id="years_working"  label="Years Working" variant="outlined"   fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleYearsWorking}/>
                  </Box>
                  <Button type="submit" variant="outlined">Register</Button>
              </form>
          </Typography>
        </Box>
      </Modal>

    {/********************************************************************* MAIN ************************************************************************/}

      <Box sx={styles.root2}>
          <Image
            src={back_img}
            width={850}
            height={'100vh'}
            alt="Stock Therapy Photo"
            priority={true}
            style={styles.img}
          />


        <Box sx={styles.login}>

          <Box sx={styles.login2}>

              <p variant='body1' component="p" style={{ paddingBottom: '25%', fontWeight: 'Bold', fontSize: '1.75rem', marginLeft: '22%', marginTop: '10%'}}>
                  Login to Therapy Portal
              </p>

              <FormControl>

                <TextField id="username-field"  label="Username" variant="outlined"  sx={{ paddingBottom: '5%'}} onChange={handleLoginUsername}/>

                <TextField id="outlined-basic" label="Password" variant="outlined" type='password' sx={{ paddingBottom: '9%'}} onChange={handleLoginPassword}/>

                <Box sx={{ paddingBottom: '4%'}}>
                  <Button variant="contained" sx={{width:'100%', height: '3em'}} onClick={handleLogin}>Log In</Button>
                </Box>
                
                <Divider> <Typography variant='body1' component="p">Or</Typography></Divider>

                <Box sx={{ paddingTop: '4%'}}>
                  <Button variant="contained" sx={{ width:'100%', height: '3em'}} onClick={handleOpen}>Register</Button>
                </Box>

              </FormControl>
  
          </Box>
        </Box>
      </Box>
    </Box>
  )
  
}
