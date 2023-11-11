"use client"

import {React, useState, useEffect } from 'react';
import { TextField, Typography, Box, Button, Divider, Modal, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio  } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import { useRouter } from 'next/navigation'
import img1 from "../../public/a1.jpg";
import img2 from "../../public/a2.jpg";
import img3 from "../../public/a3.jpg";
import img4 from "../../public/a4.jpg";
import img5 from "../../public/a5.jpg";
import img6 from "../../public/a6.jpg";
import img7 from "../../public/a7.jpg";
import img8 from "../../public/a8.jpg";
import Image from 'next/image';
import axios from 'axios';

const useStyles= (theme) => ({
    root: {
      width: '98vw',
      height: '98vh'
    },
    root2: {
      display: 'flex',
      flexDirection: 'row'
    },
    login: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    login2: {
      display: 'flex',
      flexDirection: 'column',
      width: '65%',
      height: '60%',
      position: 'relative',
      top: '19%',
      left: '21%'
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

  const [imgNum, SetImgNum] = useState(img1);
  const [open, setOpen] = useState(false);
  const [showFields, SetShowFields] = useState("none");

  /****************************** Register States ****************************/
  const [regRole, SetRegRole] = useState(null);
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


  useEffect(() => {
    rand_img();
  },[]);

  

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

    let data;

    if(regRole === "Therapist"){
      data = {
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
    } else {
      data = {
        username: regUsername,
        password: regPassword,
        role: regRole,
        name: regName,
        age: regAge,
        bio: regBio
      }
    }

    axios.post('/api/register', data)
    .then(function (response) {

      console.log(response.data.msg);

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

    console.log(" login ");
    axios.post('/api/login', {
      username: loginUsername,
      password: loginPassword
    })
    .then(function (response) {

      if(response.status === 200){
        console.log(response.data.msg);
        router.push(`/home/${response.data.msg[1]}`);
      } 
    })
    .catch(function (error) {
      console.log(error);
      alert("Something Went Wrong");
    });

  }

  const rand_img = () => {
    let randomInt = Math.floor(Math.random() * (8 - 1 + 1)) + 1;

    switch(randomInt){
      case 1:
        SetImgNum(img1);
        break;
      case 2:
        SetImgNum(img2);
        break;
      case 3:
        SetImgNum(img3);
        break;
      case 4: 
        SetImgNum(img4);
        break;
      case 5:
        SetImgNum(img5);
        break;
      case 6:
        SetImgNum(img6);
        break;
      case 7:
        SetImgNum(img7);
        break;
      case 8:
        SetImgNum(img8);
        break;
      default:
        SetImgNum(img8);
        break;
    }
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
              <form style={{ height: '35em', overflowY: 'scroll' }}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="Client"
                      >
                        <FormControlLabel value="Therapist" control={<Radio value="Therapist" onChange={handleRegRole}/>} label="Therapist"/>
                        <FormControlLabel value="Client" control={<Radio value="Client" onChange={handleRegRole}/>} label="Client" />
                      </RadioGroup>
                  </FormControl>
                  <TextField id="reg_username"  label="Username" variant="outlined"  fullWidth required sx={{ paddingBottom: '2.5%'}} onChange={handleRegUsername}/>
                  <TextField id="reg_password"  type="password" label="Password" variant="outlined"  fullWidth required sx={{ paddingBottom: '2.5%'}} onChange={handleRegPassword}/>
                  <TextField id="reg_password2" type="password" label="Re-enter" variant="outlined" fullWidth color={passMatch} required sx={{ paddingBottom: '2.5%'}} onChange={handlePasswordCheck}/>
                  <TextField id="name"  label="Name" variant="outlined"   fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleRegName}/>
                  <TextField id="age" label="Age" variant="outlined" fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleRegAge}/>
                  <TextField id="bio"  label="Bio" variant="outlined"  multiline maxRows={4} fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleRegBio}/>
                  <Box sx={{ display: showFields}}>
                      <TextField id="specialty"  label="Specialty" variant="outlined"   fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleSpecialty}/>
                      <TextField id="education"  label="Education" variant="outlined"   fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleRegEducation}/>
                      <TextField id="years_working"  label="Years Working" variant="outlined"   fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleYearsWorking}/>
                  </Box>
                  <Button type="submit" variant="outlined" onClick={handleRegister}>Register</Button>
              </form>
          </Typography>
        </Box>
      </Modal>

    {/********************************************************************* MAIN ************************************************************************/}

      <Box sx={styles.root2}>
          <Image
            src={imgNum}
            width={850}
            height={870}
            alt="Stock Therapy Photo"
          />


        <Box sx={styles.login}>
          
          <Typography variant='body1' component="p" sx={{ paddingBottom: '2.5%', fontWeight: 'Bold', fontSize: '1.75rem', marginLeft: '22%', marginTop: '10%'}}>Login to Therapy Portal</Typography>

          <Box sx={styles.login2}>

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
