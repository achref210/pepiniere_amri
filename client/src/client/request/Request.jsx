import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import useStyles from "./styles";
import {
  Tab,
  Tabs,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  MenuItem,
  Container
} from "@mui/material";
import { red } from "@mui/material/colors";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createRequest } from "../../actions/requests.js";
import { Divider } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Recaptcha from 'react-recaptcha';

import { GiPlantSeed, GiFruitTree } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa";

import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const steps = ['Select Type', 'Specify Request', 'Verify Request'];

export default function Form() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [verified, setVerified] = useState(false);
  const [skipped, setSkipped] = React.useState(new Set());
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const [create, setCreate] = useState(false);
  const navigate = useNavigate();

  const [submited, setSubmited] = React.useState(false);
  const [submited1, setSubmited1] = React.useState(false);
  const [requestDataValidate, setRequestDataValidate] = useState({
    name: false,
    age: false,
    price: true,
    quantity: false,
    description: true,
    limitDate: false,
  });
  const [requestUserValidate, setRequestUserValidate] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    adress: false,
  });

  useEffect(()=>{
    document.title="Requests"
    if(user)
    {
     if(user.result.firstName) setRequestUserValidate({...requestUserValidate,firstName:true})
     if(user.result.lastName) setRequestUserValidate({...requestUserValidate,lastName:true})
     if(user.result.adress) setRequestUserValidate({...requestUserValidate,adress:true})
     if(user.result.phoneNumber) setRequestUserValidate({...requestUserValidate,phoneNumber:true})
   }
  },[])

  const [requestData, setRequestData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    adress: "",
    type: "",
    name: "",
    age: "",
    price: "",
    quantity: "",
    description: "",
    limitDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verified) {
      handleNext();
      dispatch(createRequest(requestData))
    } else {
      alert("Please Verify That You Are A Human")
    }
  };


  const clear1 = () => {
    setRequestData({
      name: "",
      age: "",
      price: "",
      quantity: "",
      description: "",
      limitDate: "",
    });
  };

  const clear2 = () => {
    setRequestData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      adress: "",
    });
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function recaptchaLoaded() {
    console.log('captcha successfully loaded')
  }
  function verifyCallback(response) {
    if (response) {
      setVerified(true)
    }
  }

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    activeStep == 1 ? setSubmited(true) : setSubmited(false)
    activeStep == 2 ? setSubmited1(true) : setSubmited1(false)
    if ((activeStep == 0) || (activeStep == 2 && requestUserValidate.adress&&requestUserValidate.firstName&&requestUserValidate.lastName&&requestUserValidate.phoneNumber) || (activeStep == 1 && requestDataValidate.name && requestDataValidate.description && requestDataValidate.quantity && requestDataValidate.price && requestDataValidate.limitDate && requestDataValidate.age))
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [limitDate, setLimitDateValue] = React.useState(
    new Date()
  );

  const handleLimitDateChange = async (newValue) => {
    setLimitDateValue(newValue);
    setRequestData({ ...requestData, limitDate: newValue });

    const diffTime = new Date(newValue) - new Date;
    var diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diff - requestData.age > 0)
      setRequestDataValidate({ ...requestDataValidate, limitDate: true })
    else
      setRequestDataValidate({ ...requestDataValidate, limitDate: false })
  };

  return (
    <Box sx={{ width: '100%' }}>
      <div className={classes.title1} />
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Required</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep == 0 && <Container component="main" maxWidth="md">
            <Tabs className={classes.tabs} value={requestData.type} onChange={(e, newValue) => setRequestData({ ...requestData, type: newValue })} aria-label="type selector">
              <Tab value={"saplings"} icon={<FaSeedling size="100px" />} label="SAPLINGS" />
              <Tab value={"trees"} icon={<GiFruitTree size="100px" />} label="TREES" />
            </Tabs>
          </Container>}

          {activeStep == 1 && <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
              <form
                autoComplete="off"
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
              >
                <Typography variant="h6">
                  Request Planting
                </Typography>
                <TextField
                  error={!requestDataValidate.name && submited}
                  helperText={!requestDataValidate.name && submited ? "you must enter a name ( name must contains only charachters and at least 4 charachters)" : ""}
                  name="name"
                  variant="outlined"
                  label="Name"
                  fullWidth
                  value={requestData.name}
                  onChange={(e) => {
                    // to avoid overriding when we set next data we use ...SaplingData
                    setRequestData({ ...requestData, name: e.target.value })
                    if (e.target.value.length >= 4 && /^[a-zA-Z]+$/.test(e.target.value)) setRequestDataValidate({ ...requestDataValidate, [e.target.name]: true })
                    else setRequestDataValidate({ ...requestDataValidate, [e.target.name]: false })
                  }}
                />

                <TextField
                  name="description"
                  variant="outlined"
                  label="Description"
                  error={!requestDataValidate.description && submited}
                  fullWidth
                  value={requestData.description}
                  onChange={(e) =>
                    // to avoid overriding when we set next data we use ...SaplingData
                    setRequestData({ ...requestData, description: e.target.value })
                  }
                />
                <TextField
                  name="quantity"
                  variant="outlined"
                  label="Quantity"
                  error={!requestDataValidate.quantity && submited}
                  helperText={!requestDataValidate.quantity && submited ? "you must enter a quantity" : ""}
                  fullWidth
                  value={requestData.quantity}
                  onChange={(e) => {
                    setRequestData({ ...requestData, quantity: e.target.value })
                    if (e.target.value.length >= 1 && /^\d+$/.test(e.target.value)) setRequestDataValidate({ ...requestDataValidate, [e.target.name]: true })
                    else setRequestDataValidate({ ...requestDataValidate, [e.target.name]: false })
                  }}
                />
                <TextField
                  name="age"
                  variant="outlined"
                  label="Age"
                  helperText={!requestDataValidate.age && submited ? "you must enter an age" : ""}
                  error={!requestDataValidate.age && submited}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Typography color={!requestDataValidate.age && submited ? "red" : "blue"}>jours</Typography>
                      </InputAdornment>
                    ),
                  }}
                  value={requestData.age}
                  onChange={(e) => {
                    setRequestData({ ...requestData, age: e.target.value })
                    if (e.target.value.length >= 1 && /^\d+$/.test(e.target.value)) setRequestDataValidate({ ...requestDataValidate, [e.target.name]: true })
                    else setRequestDataValidate({ ...requestDataValidate, [e.target.name]: false });
                    /*const diffTime = new Date(requestData.limitDate) - new Date;
                    var diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    if (diff - e.target.value > 0)
                      setRequestDataValidate({ ...requestDataValidate, limitDate: true })
                    else
                      setRequestDataValidate({ ...requestDataValidate, limitDate: false })*/
                  }}
                />
                <TextField
                  name="price"
                  variant="outlined"
                  label="Price"
                  helperText={!requestDataValidate.price && submited ? "you must enter a price" : ""}
                  error={!requestDataValidate.price && submited}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Typography color={!requestDataValidate.price && submited ? "red" : "blue"}>dt</Typography>
                      </InputAdornment>
                    ),
                  }}
                  value={requestData.price}
                  onChange={(e) => {
                    setRequestData({ ...requestData, price: e.target.value })
                    if (e.target.value.length >= 1 && /^\d+$/.test(e.target.value)) setRequestDataValidate({ ...requestDataValidate, [e.target.name]: true })
                    else setRequestDataValidate({ ...requestDataValidate, [e.target.name]: false })
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack width={320} className={classes.date}>
                    <DesktopDatePicker
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                          />
                        );
                      }}
                      label="Limit Date"
                      inputFormat="MM/dd/yyyy"
                      value={limitDate}
                      onChange={handleLimitDateChange}
                    // to avoid overriding when we set next data we use ...plantationData
                    />
                    {!requestDataValidate.limitDate && submited && <Typography variant="subtitle2" fontSize={12} color="red">you must enter a limit date ( limit date will include age )</Typography>}
                  </Stack>
                </LocalizationProvider>
                <Button
                  variant="contained"
                  className={classes.buttonSubmit}
                  color="primary"
                  size="large"
                  onClick={handleNext}
                  fullWidth
                >
                  next
                </Button>
                <div className={classes.divider} />
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={clear1}
                  fullWidth
                >
                  clear
                </Button>
              </form>
            </Paper>
          </Container>}

          {activeStep == 2 && <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
              <form
                autoComplete="off"
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
              >
                  {user ? <Typography variant='subtitle2'>Complete The Request</Typography> : <Typography variant='subtitle2'> Give Us Your Informations To Complete The Request </Typography>}&
                <TextField
                  name="firstName"
                  variant="outlined"
                  label="First Name"
                  error={!requestUserValidate.firstName && submited1}
                  helperText={!requestUserValidate.firstName && submited1 ? "you must enter a name ( name must contains only charachters and at least 4 charachters)" : ""}
                  fullWidth
                  value={user ? requestData.firstName : user?.result?.firstName}
                  onChange={(e) => {
                    if(!user.result.firstName){
                    // to avoid overriding when we set next data we use ...SaplingData
                    setRequestData({ ...requestData, firstName: e.target.value })
                    if (e.target.value.length >= 3 && /^[a-zA-Z]+$/.test(e.target.value)) setRequestUserValidate({ ...requestUserValidate, [e.target.name]: true })
                    else setRequestUserValidate({ ...requestUserValidate, [e.target.name]: false })
                  }}
                  }
                />
                <TextField
                  name="lastName"
                  variant="outlined"
                  label="Last Name"
                  error={!requestUserValidate.lastName && submited1}
                  helperText={!requestUserValidate.lastName && submited1 ? "you must enter a name ( name must contains only charachters and at least 4 charachters)" : ""}
                  fullWidth
                  value={requestData.lastName || user?.result?.lastName}
                  onChange={(e) =>{
                    if(!user.result.lastName){
                    setRequestData({ ...requestData, lastName: e.target.value })
                    if (e.target.value.length >= 3 && /^[a-zA-Z]+$/.test(e.target.value)) setRequestUserValidate({ ...requestUserValidate, [e.target.name]: true })
                    else setRequestUserValidate({ ...requestUserValidate, [e.target.name]: false })
                  }}}
                />
                <TextField
                  name="phoneNumber"
                  variant="outlined"
                  label="Phone Number"
                  error={!requestUserValidate.phoneNumber && submited1}
                  helperText={!requestUserValidate.phoneNumber && submited1 ? "you must enter a phone number ( number must contains 8 digits)" : ""}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography color="primary">+216</Typography>
                      </InputAdornment>
                    ),
                  }}
                  value={requestData.phoneNumber || user?.result?.phoneNumber}
                  onChange={(e) =>{
                    if(!user.result.phoneNumber){
                    setRequestData({ ...requestData, phoneNumber: e.target.value })
                    if (e.target.value.length === 8 && /^\d+$/.test(e.target.value)) setRequestUserValidate({ ...requestUserValidate, [e.target.name]: true })
                    else setRequestUserValidate({ ...requestUserValidate, [e.target.name]: false })
                  }}}
                />
                <TextField
                  name="adress"
                  variant="outlined"
                  label="Adress"
                  error={!requestUserValidate.adress && submited1}
                  helperText={!requestUserValidate.adress && submited1 ? "you must enter an adress ( adress must contains at least 3 charachters)" : ""}
                  fullWidth
                  value={requestData.adress || user?.result?.adress}
                  onChange={(e) => {
                    if(!user.result.adress){
                    setRequestData({ ...requestData, adress: e.target.value })
                    if (e.target.value.length >= 3) setRequestUserValidate({ ...requestUserValidate, [e.target.name]: true })
                    else setRequestUserValidate({ ...requestUserValidate, [e.target.name]: false })
                  }}
                  }
                />
                {user ? <Typography data-testId="typography1" variant="subtitle2"> you will find the response in list requests of your account </Typography> : <Typography data-testId="typography2" variant="subtitle2"> connect to follow the workflow for your request  </Typography>}
                <Recaptcha
                  sitekey="6LcJBe0fAAAAAMHO_7clWPEEscGMBxWx50ce07JE"
                  render="explicit"
                  onloadCallback={recaptchaLoaded}
                  verifyCallback={verifyCallback}
                />
                <Button
                  variant="contained"
                  className={classes.buttonSubmit}
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                >
                  Finish
                </Button>
                <div className={classes.divider} />
              </form>
            </Paper>
          </Container>}



          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}
              disabled={requestData.type === ""}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}