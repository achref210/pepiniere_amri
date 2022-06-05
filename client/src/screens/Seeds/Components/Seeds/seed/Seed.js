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
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
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
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Category :{seed.category}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" onClick={() => setCurrentId(seed._id)}>
            Edit
          </Button>
          <Button
          //key={/*SeedDetails*/}
          to={`/Seeds/${seed._id}`}
          component={Link}
        >
          stock
        </Button>
          <Button
            color="secondary"
            size="small"
            onClick={handleToggle}
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

      <Snackbar
        open={open}
      >
        <Alert action={<>
          <Button size="small" onClick={() => {
            dispatch(deleteSeed(seed._id));
            setDeleted(true); handleClose()
          }}>
            YES
          </Button>
          <Button size="small" onClick={handleClose}>
            NO
          </Button></>} severity="warning">
          <AlertTitle>Sur, you want to remove it ?</AlertTitle>

        </Alert>
      </Snackbar>

    </div>
  );
};

export default Seed;
