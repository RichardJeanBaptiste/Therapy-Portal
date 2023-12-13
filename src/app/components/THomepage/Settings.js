import React,{useState, useEffect} from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function Settings(props){

  const [age, SetAge] = useState(props.profInfo[0]["Age"]);
  const [bio, SetBio] = useState(props.profInfo[0]["Bio"]);
  const [edu, SetEdu] = useState(props.profInfo[0]["Education"]);
  const [name, SetName] = useState(props.profInfo[0]["Name"]);
  const [spc, SetSpc] = useState(props.profInfo[0]["Speciality"]);
  const [yearsWorking, SetYearsWorking] = useState(props.profInfo[0]["YearsWorking"]);

  useEffect(() => {
    //console.log(props.profInfo);
  },[props.profInfo]);

  const handleName = (e) => {
    SetName(e.target.value);
  }

  const handleAge = (e) => {
    SetAge(e.target.value);
  }

  const handleBio = (e) => {
    SetBio(e.target.value);
  }

  const handleEdu = (e) => {
    SetEdu(e.target.value);
  }

  const handleSpc = (e) => {
    SetSpc(e.target.value);
  }

  const handleYears = (e) => {
    SetYearsWorking(e.target.value);
  }

  const SaveEdits = () => {
    axios.post('/api/therapist/edit_info', {
      username: props.username,
      newInfo: {
        Name: name,
        Age: age,
        Speciality: spc,
        Education: edu,       
        Bio: bio,
        YearsWorking: yearsWorking
      }
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  const Reset = () => {
    SetName(props.profInfo[0]["Name"]);
    SetAge(props.profInfo[0]["Age"]);
    SetBio(props.profInfo[0]["Bio"]);
    SetEdu(props.profInfo[0]["Education"]);
    SetSpc(props.profInfo[0]["Speciality"]);
    SetYearsWorking(props.profInfo[0]["YearsWorking"]);
  }

  return (
    <Box>
        <h2>Settings</h2>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '3%'}}>
          <TextField sx={{ width: '24em'}} id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleName}/>
          <TextField sx={{marginTop: '2%', width: '24em'}} id="outlined-basic" label="Age" variant="outlined" value={age} onChange={handleAge}/>
          <TextField sx={{marginTop: '2%', width: '24em'}} id="outlined-basic" label="Bio" variant="outlined" value={bio} onChange={handleBio}/>
          <TextField sx={{marginTop: '2%', width: '24em'}} id="outlined-basic" label="Education" variant="outlined" value={edu} onChange={handleEdu}/>
          <TextField sx={{marginTop: '2%', width: '24em'}} id="outlined-basic" label="Speciality" variant="outlined" value={spc} onChange={handleSpc}/>
          <TextField sx={{marginTop: '2%', width: '24em'}} id="outlined-basic" label="Years Working" variant="outlined" value={yearsWorking} onChange={handleYears}/>
          <Box sx={{ display: 'flex', flexDirection: 'row'}}>
            <Button variant='text' sx={{width: '12em'}} onClick={Reset}>Reset</Button>
            <Button variant='text' sx={{width: '12em'}} onClick={SaveEdits}>Save</Button>
          </Box>
        </Box> 
    </Box>
  )
}

