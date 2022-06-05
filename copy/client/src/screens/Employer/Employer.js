import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
// import a hook
import { useDispatch } from "react-redux";
import { getEmployers } from "../../actions/employers";
import Form from "./Components/Form/Form";
import Employers from "./Components/Employers/Employers";
import useStyles from "./styles";

const Employer = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployers());
  }, [currentId, dispatch]);

  return (
    <Container maxwidth="lg">
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch">
            <Grid item xs={12} sm={8}>
              <Employers setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default Employer;
