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
import Pagination from "../Pagination";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Sapling = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const query = useQuery(); //query is where will be getting page in front
  const dispatch = useDispatch();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(async () => {
    dispatch(getSaplings());
  }, [dispatch, currentId]);

  const searchSapling = () => {
    //si on a un recherche avec n'importe quelle caractére autre que espace
    if (search.trim()) {
      console.log(search);
      dispatch(
        getSaplingsBySearch({
          search,
          //details: details.join(',')}));
        })
      );
      navigate(`/Products/search?searchQuery=${search || "none"}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchSapling();
    }
  };

  return (
    <Grow in>
      <Container maxwidth="xl">
        <Grid container justify="space-between" alignItems="stretch">
          <Grid item xs={12}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Saplings"
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button
                onClick={searchSapling}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
          </Grid>
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
