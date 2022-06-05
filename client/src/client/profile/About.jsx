import React, { useState, useEffect } from "react";
import { Stack, Container, Typography, Button, TextField, Divider } from '@mui/material'
import { BiEditAlt } from "react-icons/bi";

const About = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [editState, setEditState] = useState(false)
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [userData, setUserData] = useState(
    {
      firstName: user.result.firstName,
      lastName: user.result.lastName,
      phoneNumber: user.result.phoneNumber,
      adress: user.result.adress,
      email: user.result.email,
    }
  );

  return (
    <>
      <div style={{ height: 200 }} /><Typography variant='h4'>About</Typography>
      {
        editState ?
          <Typography>

          </Typography> :
          <Stack spacing={2} style={{ paddingLeft: 10, width: 250 }}>
            <div style={{ height: 5 }} />
            <TextField
              name="firstName"
              label="First Name"
              color="secondary"
              value={userData.firstName}
              onChange={handleChange}
            />
            <TextField
              name="lastName"
              label="Last Name"
              color="secondary"
              value={userData.lastName}
              onChange={handleChange}
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              color="secondary"
              value={userData.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              name="adress"
              label="Adress"
              color="secondary"
              value={userData.adress}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              value={userData.email}
              color="secondary"
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="secondary"
              startIcon={<BiEditAlt/>}
            >
              Edit
            </Button>
          </Stack>
      }
      <br />
      <Divider rotation='vertical' flexItem />
    </>
  )
}

export default About