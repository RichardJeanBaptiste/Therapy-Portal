"use client"

import {React, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl  from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem  from '@mui/material/MenuItem';
import { useTheme }  from '@mui/material/styles';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const useStyles= (theme) => ({
    root: {
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)',
      },
      cardStyle: {
        border: '1px solid #BDBDBD',
        borderRadius: '24px',
        height: '45em',
        width: '30em',
        overflowY: 'scroll',
      },
      formStyle: {
        display: 'flex',
        flexDirection: 'column',
      },
      textFieldStyle:{
        paddingBottom: '2em',
      }
})


export default function Registration() {

    const theme = useTheme();
    const styles = useStyles(theme);
    const router = useRouter();

    const [ name, SetName ] = useState("");
    
    const [ username, SetUsername] = useState("");
    const [ password, SetPassword] = useState("");
    const [ role, setRole] = useState("");

    const handleName = (e) => {
      SetName(e.target.value);
    }
  
    const handleUsername = (e) => {
      SetUsername(e.target.value);
    }
  
    const handlePassword = (e) => {
      SetPassword(e.target.value);
    }

    const handleRoleChange = (e) => {
      setRole(e.target.value);
    }
   

    const ExtraInfo = () => {

      const [ age, SetAge ] = useState("");
      const [ specialty, SetSpecialty] = useState("");
      const [ bio, SetBio] = useState("");
      const [ education, SetEducation ] = useState("");
      const [ yearsWorked, SetYearsWorked ] = useState("");


        const handleAgeChange = (e) => {
          SetAge(e.target.value);
      }

      const handleSpecialtyChange = (e) => {
          SetSpecialty(e.target.value);
      } 

      const handleBioChange = (e) => {
          SetBio(e.target.value);
      }

      const handleEducationChange = (e) => {
          SetEducation(e.target.value);
      }

      const handleYearsWorkedChange = (e) => {
          SetYearsWorked(e.target.value);
      }


      const handleRegister  = (e) => {

        e.preventDefault();

        let data;

        if(role === "Therapist"){
          data = {
            name: name,
            username: username,
            password: password,
            age: age,
            specialty: specialty,
            bio: bio,
            education: education,
            yearsWorked: yearsWorked,
            role: role
          }
        } else {
          data = {
            name: name,
            username: username,
            password: password,
            age: age,
            bio: bio,
          }
        }

        axios.post('/api/register', data)
          .then(function (response) {
            if (response.status === 200){
                alert("Account Created");
                SetUsername("");
                SetPassword("");
                router.push('/login', { scroll: false })
            } else {
                alert("Something went wrong");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

      if(role === "Therapist"){
        return (
          <Box>
              <TextField  sx={styles.textFieldStyle} id="outlined-basic" placeholder='Age' variant="outlined" onChange={handleAgeChange} value={age}/>
              <TextField  sx={styles.textFieldStyle} id="outlined-basic" placeholder='Specialty' variant="outlined" onChange={handleSpecialtyChange} value={specialty}/>
              <TextField  sx={styles.textFieldStyle} id="outlined-basic" placeholder='Education' variant="outlined" onChange={handleEducationChange} value={education}/>
              <TextField  sx={styles.textFieldStyle} id="outlined-basic" placeholder='Years Working' variant="outlined" onChange={handleYearsWorkedChange} value={yearsWorked}/>
              <TextField  sx={styles.textFieldStyle} id="outlined-basic" placeholder='Bio' variant="outlined" onChange={handleBioChange} value={bio}/>

              <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    <Link href="/">Cancel</Link>
                    <Button variant="outlined" onClick={handleRegister} type="submit">Register</Button>
              </Box>
          </Box>
        )
      } else if( role === "Client") {
        return (
          <Box>
              <TextField  sx={styles.textFieldStyle} id="outlined-basic" placeholder='Age' variant="outlined" onChange={handleAgeChange} value={age}/>
              <TextField  sx={styles.textFieldStyle} id="outlined-basic" placeholder='Bio' variant="outlined" onChange={handleBioChange} value={bio}/>

              <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    <Link href="/">Cancel</Link>
                    <Button variant="outlined" onClick={handleRegister} type="submit">Register</Button>
              </Box>
          </Box>
        )
      } else {
        return (
          <Box>

          </Box>
        )
      }    
    }
  
    return (
        <Box sx={styles.root}>
            <Button onClick={()=> {
              router.push('/login', { scroll: false })
            }}>Head To Login</Button>
            <Card sx={styles.cardStyle}>
              <CardContent>
                <form style={styles.formStyle}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="Role"
                      id="Role"
                      value={role}
                      label="Role"
                      required
                      onChange={handleRoleChange}
                    >
                      <MenuItem value="Therapist">Therapist</MenuItem>
                      <MenuItem value="Client">Client</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField  sx={styles.textFieldStyle} id="outlined-basic" placeholder='Name' variant="outlined" onChange={handleName} value={name} required/>
                  <TextField  sx={styles.textFieldStyle} id="outlined-basic" placeholder='Username' variant="outlined" onChange={handleUsername} value={username} required/>
                  <TextField  sx={styles.textFieldStyle} className='TextBox' id="outlined-basic" placeholder='Password' type='password' variant="outlined" onChange={handlePassword} value={password} required/>
                  
                  <ExtraInfo/>
                  
                </form>
              </CardContent>
            </Card>
        </Box>
    )
}