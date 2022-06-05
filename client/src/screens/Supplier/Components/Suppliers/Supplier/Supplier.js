import React, { useRef, useState } from "react";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import SaplingsArticle from "./Articles/SaplingsArticle";
//import Paie from "./PaySlip/Paie";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Backdrop,
  Box,
  Snackbar,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  AlertTitle,
  IconButton
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import moment from "moment";

import { deleteSupplier } from "../../../../../actions/suppliers";
import { Container } from "@material-ui/core";

const Supplier = ({ supplier,currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const childRef = useRef();

  const [alignment, setAlignment] = React.useState('saplings');
  const [print, setPrint] = React.useState(false);
  const [deleted, setDeleted] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleToggle2 = () => {
    setOpen2(!open);
  };

  return (
    <div>
      <br />
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={supplier.selectedFile}
          alt="Employer Photo"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {supplier.name}
            </Typography>
            {supplier.adress && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                adress: {supplier.adress}
              </Typography>
            )}
            {supplier.phoneNumber && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                phone number: {supplier.phoneNumber}
              </Typography>
            )}
          </CardContent>

          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Button onClick={handleToggle}>Articles</Button>
            <Button size="small" onClick={() => setCurrentId(supplier._id)}>
              Edit
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={handleToggle2}
            >
              Delete
            </Button>

          </Box>
        </Box>
      </Card>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open2}
        onClick={handleClose2}
      >

      </Backdrop>

      <Snackbar
        open={open2}
      >
        <Alert action={<>
          <Button size="small" onClick={() => { dispatch(deleteSupplier(supplier._id)); setDeleted(true); handleClose2() }}>
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
            The supplier was removed — <strong>check it out!</strong>
          </Alert>
        </Snackbar>
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Card sx={{ maxHeight: 520 }}>
          <CardActions>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="saplings">Saplings</ToggleButton>
              <ToggleButton value="seeds">Seeds</ToggleButton>
              <ToggleButton value="materials">Materials</ToggleButton>
            </ToggleButtonGroup>
            <Box className={classes.closeButton}>
            <IconButton aria-label="close" onClick={handleClose} color="secondary">
              <AiFillCloseCircle />
            </IconButton>
            </Box>
          </CardActions>
          <CardContent>
            <SaplingsArticle supplier={supplier} alignment={alignment}  currentId={currentId} setCurrentId={setCurrentId}/>  </CardContent>
        </Card>
      </Backdrop>
    </div>
  );
};

export default Supplier;