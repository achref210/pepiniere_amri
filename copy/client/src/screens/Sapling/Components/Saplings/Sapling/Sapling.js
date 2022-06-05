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

import { deleteSapling } from "../../../../../actions/saplings";
import SaplingDetails from "../../../SaplingDetails/SaplingDetails";

const Sapling = ({ sapling, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Sapling img"
        height="140"
        image={sapling.selectedFile}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {sapling.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Description :{sapling.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => setCurrentId(sapling._id)}>
          Edit
        </Button>
        <Button
          key={SaplingDetails}
          to={`/Products/${sapling._id}`}
          component={Link}
        >
          stock
        </Button>
        <Button
          color="secondary"
          size="small"
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              dispatch(deleteSapling(sapling._id));
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
              Your sapling was deleted — <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        )}
      </CardActions>
    </Card>
  );
};

export default Sapling;
