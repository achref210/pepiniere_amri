import React from "react";
import { useSelector } from "react-redux";
import Sapling from "./Sapling/Sapling";
import { Grid, CircularProgress, Container } from "@mui/material";
import useStyles from "./styles";
import { Divider } from "@material-ui/core";

const Saplings = ({ setCurrentId }) => {
  const { saplings, isLoading } = useSelector((state) => state.saplings);
  const classes = useStyles();
  console.log("one", saplings);

  if (!saplings.length && !isLoading) return "No Saplings!";
  return isLoading ? (
    <Container maxwidth="lg">
      <br></br>
      <CircularProgress />
    </Container>
  ) : (
    <Container maxwidth="lg">
      <Grid
        maxwidth="xl"
        container
        className={classes.mainContainer}
        alignItems="stretch"
        spacing={1}
      >
        {saplings.map((sapling) => (
          <Grid item key={sapling.id + ""} xs={12} sm={6}>
            <Sapling sapling={sapling} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Saplings;
