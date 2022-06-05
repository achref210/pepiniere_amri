import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@mui/material";
import { Grid, CircularProgress, Container } from "@mui/material";
import useStyles from "./styles";
import { FaVoteYea } from "react-icons/fa";
import { MdRestartAlt, MdDeleteSweep } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { useDispatch } from "react-redux";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Backdrop,
  Box,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Accordion,
  Stack,
  Badge,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";

import {
  deletePlan,
  votePlan,
  disactivatePlan,
  activatePlan,
} from "../../../actions/plans";
import { create } from "@mui/material/styles/createTransitions";

const Plans = ({ setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { plans, isLoading } = useSelector((state) => state.plans);
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

  const [disabled, setDisabled] = useState(false);
  if (!plans.length && !isLoading) return "No Plans!";
  return (
    <Container>
      <br></br>
      <Card>
        <br></br>
        <Box paddingLeft={5}>
          <Typography
            gutterBottom
            classeName={classes.MuiTypography_alignLeft}
            component="div"
            variant="h4"
            color="primary"
          >
            Plans:
          </Typography>
        </Box>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {plans.map((plan) => (
            <>
              {
                plan.disabled === true ? (
                  <>
                    {(user?.result?.googleId === plan?.creator ||
                      user?.result?._id === plan?.creatorId) && (
                        <Box sx={{ width: "75%" }}>
                          <Accordion disabled>
                            <AccordionActions>
                              <Typography component="div" variant="h5">
                                {plan.productToPlant} - {plan.type}
                              </Typography>
                              <Button
                                onClick={() => {
                                  dispatch(activatePlan(plan._id));
                                }}
                              >
                                <Badge color="secondary">
                                  <MdRestartAlt /> Activate
                                </Badge>
                              </Button>
                              <Button
                                color="third"
                                onClick={handleToggle
                                }
                              >
                                <Badge>
                                  <MdDeleteSweep color="third" /> Delete!
                                </Badge>
                              </Button>
                            </AccordionActions>
                          </Accordion>
                        </Box>
                      )}
                  </>
                ) : (
                  //Accordion
                  <Box sx={{ width: "75%" }}>
                    <Accordion>
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography component="div" variant="h5">
                          {plan.productToPlant} {plan.type && <> - {plan.type}</>}
                          <br />
                        </Typography>

                        <Typography
                          variant="subtitle1 small"
                          color="text.secondary"
                          component="div"
                        >
                          {plan.creator && <>created by {plan.creator}</>}
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails>

                        <Typography noWrap>
                          quantity : {plan.quantity}
                          <br></br>
                          weight : {plan.weight}
                          <br></br>
                          {plan.employersNumber && <><br></br>Employers Number :{plan.employersNumber}<br></br></>}
                          {plan.description && <>Description : <box>{plan.description}</box><br></br></>}
                          {plan.requirements != '' && <>Requirements : {plan.requirements}<br></br></>}
                          
                          {plan.details != '' && <>Details : {plan.details}<br></br></>}
                        </Typography>
                      </AccordionDetails>
                      <AccordionActions>
                        {(user?.result?._id === plan?.creatorId) && (
                          <Button
                            color="secondary"
                            onClick={() => {
                              console.log("ok")
                              dispatch(disactivatePlan(plan._id));
                            }}
                          >
                            <Badge color="secondary">Desactivate</Badge>
                          </Button>
                        )}
                        <Button>
                          <Badge color="primary" variant="dot">
                            <CgDetailsMore /> Plan
                          </Badge>
                        </Button>
                        <Button
                          onClick={() => {
                            dispatch(votePlan(plan._id));
                          }}
                        >
                          <Badge
                            badgeContent={plan.votes?.length}
                            color="primary"
                          >
                            <FaVoteYea /> Vote!
                          </Badge>
                        </Button>
                      </AccordionActions>
                    </Accordion>
                  </Box>
                ) //Accordion
              }

              <Backdrop
                open={open}
                onClick={handleClose}

              >

              </Backdrop>

              <Snackbar
                open={open}
              >
                <Alert action={<>
                  <Button size="small" onClick={() => { dispatch(deletePlan(plan._id)); setDeleted(true); handleClose() }}>
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
            </>

          ))}
        </Stack>
      </Card>
    </Container>

  );
};

export default Plans; 
