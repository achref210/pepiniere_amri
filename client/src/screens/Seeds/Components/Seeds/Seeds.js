import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Container } from "@mui/material";
import useStyles from "./styles";
import Seed from "./seed/Seed";
const Seeds = ({ setCurrentId }) => {
  const { seeds, isLoading } = useSelector((state) => state.seeds);
  const classes = useStyles();

  console.log(seeds)
  if (!seeds.length && !isLoading) return "No Seeds!";
  return isLoading ? (
    <Container maxwidth="lg">
      <br></br>
      <CircularProgress />
    </Container>
  ) : (
    <Container maxwidth="lg">
      <br></br>
    <Grid
      maxwidth="lg"
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {seeds.map((seed) => (
        <Grid key={seed._id} item xs={12} sm={6}>
          <Seed seed={seed} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
    </Container>
  );
};

export default Seeds;
