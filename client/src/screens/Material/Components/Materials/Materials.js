import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Container } from "@mui/material";
import useStyles from "./styles";
import Material from "./material/Material";
const Materials = ({ setCurrentId }) => {
  const { materials, isLoading } = useSelector((state) => state.materials);
  const classes = useStyles();

  if (!materials.length && !isLoading) return "No Materials!";
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
      {materials.map((material) => (
        <Grid key={material._id} item xs={12} sm={6}>
          <Material material={material} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
    </Container>
  );
};

export default Materials;
