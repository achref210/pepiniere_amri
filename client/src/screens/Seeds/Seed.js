import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Button,
  Grid,
  TextField,
} from "@mui/material";
// import a hook
import { useDispatch } from "react-redux";
import { getSeeds, getSeedsBySearch } from "../../actions/seeds";
import Form from "./Components/Form/Form";
import Seeds from "./Components/Seeds/Seeds";
import useStyles from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Seed = (props) => {
  const [currentId, setCurrentId] = useState(null);
  const search=props.search;
  const query = useQuery(); //query is where will be getting page in front
  const dispatch = useDispatch();
  //const page = query.get("page") || 1;
  //const searchQuery = query.get("searchQuery");
  const navigate = useNavigate();
  //const [tags, setTags] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (search.trim()) {
      dispatch(
        getSeedsBySearch({
          search,
          //details: details.join(',')}));
        })
      );
      navigate(`/Seeds/search?searchQuery=${search || "none"}`);
    } else {
      navigate("/Seeds");
    dispatch(getSeeds());}
  }, [dispatch, search, currentId]);

  return (
    <Grow in>
      <Container maxwidth="xl">
        <Grid container justify="space-between" alignItems="stretch">
          <Grid item xs={12} sm={8}>
            <Seeds setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Seed;
