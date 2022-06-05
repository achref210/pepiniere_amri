import React, { useRef } from "react";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import Paie from "./PaySlip/Paie";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Backdrop,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import moment from "moment";

import {
  deleteEmployer,
  absence,
  reinitialiser,
} from "../../../../../actions/employers";

const Employer = ({ employer, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const childRef = useRef();

  const [print, setPrint] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <br />
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={employer.selectedFile}
          alt="Employer Photo"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {employer.firstName} {employer.lastName}
            </Typography>
            {employer.job && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                job: {employer.job}
              </Typography>
            )}
            {employer.phoneNumber && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                phone number: {employer.phoneNumber}
              </Typography>
            )}
            {employer.adresse && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                adresse: {employer.adresse}
              </Typography>
            )}
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Button>Infos</Button>
            <Button onClick={handleToggle}>PaySlip</Button>
            <Button
              className={classes.add}
              onClick={() => dispatch(absence(employer._id))}
            >
              <Typography variant="subtitle1" color="secondary" component="div">
                Mark Absence {employer.absenceCount}
              </Typography>
            </Button>

            <Button
              className={classes.add}
              onClick={() => dispatch(reinitialiser(employer._id))}
            >
              <Typography variant="subtitle1" color="secondary" component="div">
                reinitialiser
              </Typography>
            </Button>
          </Box>
        </Box>
      </Card>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Card sx={{ maxHeight: 600 }}>
          <CardActions>
            <Button size="small" onClick={() => setCurrentId(employer._id)}>
              Edit
            </Button>
            <Button size="small" onClick={() => childRef.current.getAlert()}>
              Print
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                if (window.confirm("Are you sure?")) {
                  dispatch(deleteEmployer(employer._id));
                }
              }}
            >
              Delete
            </Button>
          </CardActions>
          <CardContent>
            <Paie ref={childRef} employer={employer} />
          </CardContent>
        </Card>
      </Backdrop>
    </div>
  );
};

export default Employer;
