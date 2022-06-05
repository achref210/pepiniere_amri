import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
// import a hook
import { useDispatch, useSelector } from "react-redux";
import { getPlans } from "../../actions/plans";
import useStyles from "./styles";
import { useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import Plans from "./plans/Plans.js";
import Form from "./plans/form/form";

const Plan = (props) => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPlans());
    navigate("/Plans");
  }, [dispatch, currentId]);

  const user = JSON.parse(localStorage.getItem("profile"));
  //const handleDelete = props.handleDelete;
  if(user)return(
    <div className={classes.Plans_list}>
      <Container>
        <Grid container justify="space-between" alignItems="stretch">
          <Grid item xs={12} sm={7}>
            <Plans setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </div>)
 else return(<div className={classes.Plans_list}>
    <Container>
    <Plans setCurrentId={setCurrentId} />
    </Container></div>)
};

export default Plan;
