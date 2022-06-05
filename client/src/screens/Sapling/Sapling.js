import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Button,
  TextField,
  Paper,
} from "@mui/material";
// import a hook
import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getSaplings, getSaplingsBySearch } from "../../actions/saplings";
import Form from "./Components/Form/Form";
import Saplings from "./Components/Saplings/Saplings";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Sapling = (props) => {
  const search=props.search;
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const query = useQuery(); //query is where will be getting page in front
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(async () => {
    //si on a un recherche avec n'importe quelle caractére autre que espace
    if(search.trim())
    {
      dispatch(
        getSaplingsBySearch({
          search,
        })
      );
      navigate(`/Saplings/search?searchQuery=${search || "none"}`);
      
    } else {
      dispatch(getSaplings());
      navigate("/Saplings");
    }
  }, [dispatch, search, currentId]);

  return (
    
    <Grow in>
      <Container maxwidth="xl">
        
        <Grid container justify="space-between" alignItems="stretch">

          <Grid item xs={12} sm={8}>
            <Saplings setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Sapling;
