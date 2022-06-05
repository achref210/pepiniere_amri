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
import { createPlan, updatePlan } from "../../../../actions/plans.js";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";

const Form = ({ currentId, setCurrentId }) => {
  //get user signed in
  const user = JSON.parse(localStorage.getItem("profile"));

  const classes = useStyles();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);

  const [planData, setPlanData] = useState({
    planTitle: "",
    type: "",
    employersNumber: "",
    description: "",
    requirements: "",
    details: "",
    disabled: "false",
  });

  const plan = useSelector((state) =>
    currentId ? state.plan.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (plan) {
      setPlanData(plan);
    }
  }, [plan]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePlan(currentId, {
          ...planData,
          name: `${user?.result?.firstName} ${user?.result?.lastName}`,
        })
      );
      setUpdate(true);
    } else {
      dispatch(
        createPlan({
          ...planData,
          name: `${user?.result?.firstName} ${user?.result?.lastName}`,
        })
      );
      setCreate(true);
    }
    clear();
    setTimeout(function () {
      setCurrentId(null);
    }, 1000);
  };

  if (!user?.result?.firstName) {
    return <div></div>;
  }

  const clear = () => {
    setCurrentId(null);
    setPlanData({
      planTitle: "",
      type: "",
      employersNumber: "",
      description: "",
      requirements: "",
      details: "",
      disabled: "false",
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
        <Typography variant="h6">{currentId ? "EDIT" : "Add"} plan</Typography>
        <TextField
          name="planTitle"
          variant="outlined"
          label="Plan Title"
          fullWidth
          value={planData.planTitle}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setPlanData({ ...planData, planTitle: e.target.value })
          }
        />
        <TextField
          name="type"
          variant="outlined"
          label="Type"
          fullWidth
          value={planData.type}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setPlanData({ ...planData, type: e.target.value })
          }
        />

        <TextField
          name="employersNumber"
          variant="outlined"
          label="Employers Number"
          fullWidth
          value={planData.employersNumber}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setPlanData({ ...planData, employersNumber: e.target.value })
          }
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={planData.description}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setPlanData({ ...planData, description: e.target.value })
          }
        />
        <TextField
          name="requirements"
          variant="outlined"
          label="Requirements"
          fullWidth
          value={planData.requirements}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setPlanData({
              ...planData,
              requirements: e.target.value.split(","),
            })
          }
        />
        <TextField
          name="details"
          variant="outlined"
          label="Details"
          fullWidth
          value={planData.details}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setPlanData({
              ...planData,
              details: e.target.value.split(","),
            })
          }
        />
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
              The plan was added — <strong>check it out!</strong>
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
              The plan was updated — <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        )}
      </form>
    </Paper>
  );
};

export default Form;
