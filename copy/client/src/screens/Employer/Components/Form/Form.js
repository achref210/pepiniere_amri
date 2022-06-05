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

//G
const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);

  const [employerData, setEmployerData] = useState({
    firstName: "",
    lastName: "",
    workBeginningDate: "",
    abscence: "",
    CIN: "",
    phoneNumber: "",
    adresse: "",
    workStart: "",
    workEnd: "",
    salary: "",
  });

  const employer = useSelector((state) =>
    currentId ? state.employers.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (employer) {
      setEmployerData(employer);
    }
  }, [employer]);

  const dispatch = useDispatch();

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
      workBeginningDate: "",
      abscence: "",
      CIN: "",
      phoneNumber: "",
      adresse: "",
      workStart: "",
      workEnd: "",
      salary: "",
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
          label="last name"
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
          name="hiringDate"
          variant="outlined"
          label="hired at"
          fullWidth
          value={employerData.hiringDate}
          onChange={(e) =>
            setEmployerData({ ...employerData, hiringDate: e.target.value })
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
        <TextField
          name="workStart"
          variant="outlined"
          label="workStart"
          fullWidth
          value={employerData.workStart}
          onChange={(e) =>
            setEmployerData({ ...employerData, workStart: e.target.value })
          }
        />
        <TextField
          name="workEnd"
          variant="outlined"
          label="workEnd"
          fullWidth
          value={employerData.workEnd}
          onChange={(e) =>
            setEmployerData({ ...employerData, workEnd: e.target.value })
          }
        />
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
