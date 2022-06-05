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
import { getMaterials, getMaterialsBySearch } from "../../actions/materials";
import Form from "./Components/Form/Form";
import Materials from "./Components/Materials/Materials";
import useStyles from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Material = (props) => {
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
      console.log("yes")
      dispatch(
        getMaterialsBySearch({
          search,
          //details: details.join(',')}));
        })
      );
      navigate(`/Materials/search?searchQuery=${search || "none"}`);
    } else {
      navigate("/Materials");
    dispatch(getMaterials());}
  }, [dispatch, search, currentId]);

  return (
    <Grow in>
      <Container maxwidth="xl">
        <Grid container justify="space-between" alignItems="stretch">
          <Grid item xs={12} sm={8}>
            <Materials setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Material;
