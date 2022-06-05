import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Backdrop,
  Snackbar,
  Alert,
  AlertTitle,
  Divider,
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
        alt="Sapling img"
        height="140"
        image={sapling.selectedFile}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {sapling.name}
        </Typography>
        <Divider variant="middle"/>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Category:{sapling.category}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Description :{sapling.description}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Price :{sapling.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => setCurrentId(sapling._id)}>
          Edit
        </Button>
        <Button
          key={SaplingDetails}
          to={`/Saplings/${sapling._id}`}
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
      </CardActions>
    </Card>

    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
    >
      
    </Backdrop>

    <Snackbar
      open={open}
    >
            <Alert action={<>
            <Button size="small" onClick={()=>{dispatch(deleteSapling(sapling._id));setDeleted(true);handleClose()}}>
             YES
            </Button>
            <Button size="small" onClick={handleClose}>
              NO
            </Button></>} severity="warning">
              <AlertTitle>Sur, you want to remove it ?</AlertTitle>
             
            </Alert>
    </Snackbar>

    {deleted && (
          <Snackbar
            open={deleted}
            autoHideDuration={5000}
            onClose={() => setDeleted(false)}
          >
            <Alert severity="success">
              <AlertTitle></AlertTitle>
              Your sapling was deleted — <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        )}
</div>
  );
};

export default Sapling;
