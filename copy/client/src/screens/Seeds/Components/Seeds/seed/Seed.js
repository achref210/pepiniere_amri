import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";

import { deleteSeed } from "../../../../../actions/seeds";
//import SeedDetails from "../../../SeedDetails/SeedDetails";

const Seed = ({ seed, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Seed img"
        height="140"
        image={seed.selectedFile}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {seed.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Description :{seed.description}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Type :{seed.type}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => setCurrentId(seed._id)}>
          Edit
        </Button>
        <Button
          color="secondary"
          size="small"
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              dispatch(deleteSeed(seed._id));
              setDeleted(true);
            }
          }}
        >
          Delete
        </Button>
        {deleted && (
          <Snackbar
            open={deleted}
            autoHideDuration={5000}
            onClose={() => setDeleted(false)}
          >
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Your seed was deleted — <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        )}
      </CardActions>
    </Card>
  );
};

export default Seed;

/*<Button
          key={SaplingDetails}
          to={`/Products/${sapling._id}`}
          component={Link}
        >
          stock
        </Button> */
