import React from "react";
import { useSelector } from "react-redux";
import Employer from "./Employer/Employer";
import { Grid, CircularProgress,Container } from "@mui/material";
import useStyles from "./styles";
import { Divider } from "@material-ui/core";

const Employers = ({ setCurrentId }) => {
  const { employers, isLoading } = useSelector((state) => state.employers);
  const classes = useStyles();

  if (!employers.length && !isLoading) return "No Employers!";
    return isLoading ? (
    <Container maxwidth="lg">
      <br></br>
      <CircularProgress />
    </Container>
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
