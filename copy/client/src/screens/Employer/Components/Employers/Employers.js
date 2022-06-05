import React from "react";
import { useSelector } from "react-redux";
import Employer from "./Employer/Employer";
import { Grid, CircularProgress } from "@mui/material";
import useStyles from "./styles";
import { Divider } from "@material-ui/core";

const Employers = ({ setCurrentId }) => {
  const employers = useSelector((state) => state.employers);
  const classes = useStyles();

  return !employers.length ? (
    <CircularProgress />
  ) : (
    <Grid
      container
      className={classes.mainContainer}
      alignItems="stretch"
      spacing={3}
    >
      {employers.map((employer) => (
        <Grid item key={employer.id + " "} xs={11} sm={11}>
          <Employer employer={employer} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Employers;
