import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Container } from "@mui/material";
import useStyles from "./styles";
import Seed from "./seed/Seed";
const Seeds = ({ setCurrentId }) => {
  const { seeds, isLoading } = useSelector((state) => state.seeds);
  const classes = useStyles();

  if (!seeds.length && !isLoading) return "No Seeds!";
  return isLoading ? (
    <Container maxwidth="lg">
      <br></br>
      <CircularProgress />
    </Container>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={1}
    >
      {seeds.map((seed) => (
        <Grid key={seed.id} item xs={12} sm={6}>
          <Seed seed={seed} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Seeds;
