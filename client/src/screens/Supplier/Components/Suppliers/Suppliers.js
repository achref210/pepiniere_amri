import React from "react";
import { useSelector } from "react-redux";
import Supplier from "./Supplier/Supplier";
import { Grid, CircularProgress, Container } from "@mui/material";
import useStyles from "./styles";
import { Divider } from "@material-ui/core";

const Suppliers = ({currentId, setCurrentId }) => {
  const { suppliers, isLoading } = useSelector((state) => state.suppliers);
  const classes = useStyles();
  console.log("ok", suppliers)

  if (!suppliers.length && !isLoading) return "No Suppliers!";
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
        {suppliers.map((supplier) => (
          <Grid item key={supplier.id + ""} xs={11} sm={11}>
            <Supplier supplier={supplier} currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
  );
};

export default Suppliers;