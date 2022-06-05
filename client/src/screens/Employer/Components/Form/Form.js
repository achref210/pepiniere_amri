import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import useStyles from "./styles";
import {
  createEmployer,
  updateEmployer,
} from "../../../../actions/employers.js";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";

import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

//G
const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);

  const [employerData, setEmployerData] = useState({
    firstName: "",
    lastName: "",
    abscence: "",
    advance: "",
    CIN: "",
    salary: "",
    coefficient: "",
    phoneNumber: "",
    adresse: "",
    workStart: "",
    workEnd: "",
    salary: "",
  });

  const employer = useSelector((state) =>
    currentId ? state.employers.employers.find((employer) => employer._id === currentId) : null
  );

  useEffect(() => {
    if (employer) {
      setEmployerData(employer);
    }
  }, [employer]);

  const dispatch = useDispatch();

  const [startValue, setStartValue] = React.useState(new Date());

  const handleStartChange = (newValue) => {
    setStartValue(newValue);
    setEmployerData({ ...employerData, workStart: newValue });
  };

  const [endValue, setEndValue] = React.useState(
    new Date()
  );

  const handleEndChange = async (newValue) => {
    setEndValue(newValue);
    setEmployerData({ ...employerData, workEnd: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updateEmployer(currentId, employerData));
      setUpdate(true);
    } else {
      dispatch(createEmployer(employerData));
      setCreate(true);
    }
    clear();
    setTimeout(function () {
      setCurrentId(null);
    }, 1000);
  };
  const clear = () => {
    setCurrentId(null);
    setEmployerData({
      firstName: "",
      lastName: "",
      abscence: "",
      CIN: "",
      advance: "",
      phoneNumber: "",
      salary: "",
      coefficient: "",
      adresse: "",
      workStart: "",
      workEnd: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "EDIT" : "Add"} Employer
        </Typography>
        <TextField
          name="first name"
          variant="outlined"
          label="first name"
          fullWidth
          value={employerData.firstName}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setEmployerData({ ...employerData, firstName: e.target.value })
          }
        />
        <TextField
          name="last name"
          variant="outlined"
          label="Last Name"
          fullWidth
          value={employerData.lastName}
          onChange={(e) =>
            setEmployerData({ ...employerData, lastName: e.target.value })
          }
        />
        <TextField
          name="job"
          variant="outlined"
          label="job"
          fullWidth
          value={employerData.job}
          onChange={(e) =>
            setEmployerData({ ...employerData, job: e.target.value })
          }
        />
        <TextField
          name="salary"
          variant="outlined"
          label="Salary"
          fullWidth
          value={employerData.salary}
          onChange={(e) =>
            setEmployerData({ ...employerData, salary: e.target.value })
          }
        />
        <TextField
          name="coefficient"
          variant="outlined"
          label="Coefficient"
          fullWidth
          value={employerData.coefficient}
          onChange={(e) =>
            setEmployerData({ ...employerData, coefficient: e.target.value })
          }
        />
        <TextField
          name="advance"
          variant="outlined"
          label="Advance"
          fullWidth
          value={employerData.advance}
          onChange={(e) =>
            setEmployerData({ ...employerData, advance: e.target.value })
          }
        />
        <TextField
          name="CIN"
          variant="outlined"
          label="CIN"
          fullWidth
          value={employerData.CIN}
          onChange={(e) =>
            setEmployerData({ ...employerData, CIN: e.target.value })
          }
        />
        <TextField
          name="phoneNumber"
          variant="outlined"
          label="phoneNumber"
          fullWidth
          value={employerData.phoneNumber}
          onChange={(e) =>
            setEmployerData({ ...employerData, phoneNumber: e.target.value })
          }
        />
        <TextField
          name="adresse"
          variant="outlined"
          label="adresse"
          fullWidth
          value={employerData.adresse}
          onChange={(e) =>
            setEmployerData({ ...employerData, adresse: e.target.value })
          }
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={1} width={320}>
            <DesktopDatePicker

              label="Work Start"
              inputFormat="dd/MM/yyyy"
              value={startValue}
              onChange={handleStartChange}
              // to avoid overriding when we set next data we use ...plantationData
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="Work End"
              inputFormat="dd/MM/yyyy"
              value={endValue}
              onChange={handleEndChange}
              // to avoid overriding when we set next data we use ...plantationData
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setEmployerData({ ...employerData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          variant="contained"
          className={classes.buttonSubmit}
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          submit
        </Button>
        <Divider variant="middle" />
        <Button
          variant="contained"
          className={classes.buttonSubmit}
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          clear
        </Button>
        {create && (
          <Snackbar
            open={create}
            autoHideDuration={2000}
            onClose={() => setCreate(false)}
          >
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              The employer was added — <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        )}
        {update && (
          <Snackbar
            open={update}
            autoHideDuration={5000}
            onClose={() => setUpdate(false)}
          >
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              The employer was updated — <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        )}
      </form>
    </Paper>
  );
};

export default Form;
