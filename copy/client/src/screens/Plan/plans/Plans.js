import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@mui/material";
import { Grid, CircularProgress, Container } from "@mui/material";
import useStyles from "./styles";
import { Divider } from "@material-ui/core";
import Plan from "./plan/Plan.js";
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
  const plans = useSelector((state) => state.plans);
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(plans);

  const [disabled, setDisabled] = useState(false);
  return !plans.length ? (
    <CircularProgress />
  ) : (
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
                      user?.result?._id === plan?.creator) && (
                      <Box sx={{ width: "75%" }}>
                        <Accordion disabled>
                          <AccordionActions>
                            <Typography component="div" variant="h5">
                              {plan.planTitle} - {plan.type}
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
                              onClick={() => {
                                if (window.confirm("Are you sure?")) {
                                  dispatch(deletePlan(plan._id));
                                }
                              }}
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
                          {plan.planTitle} - {plan.type}
                          <br />
                        </Typography>

                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          created by {plan.name}
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Typography noWrap>
                          Employers Number :{plan.employersNumber}
                          <br></br>
                          Description : <box>{plan.description}</box>
                          <br></br>
                          Requirements : {plan.requirements}
                          <br></br>
                          Details : {plan.details}
                          <br></br>
                        </Typography>
                      </AccordionDetails>
                      <AccordionActions>
                        {(user?.result?.googleId === plan?.creator ||
                          user?.result?._id === plan?.creator) && (
                          <Button
                            color="secondary"
                            onClick={() => {
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
                            badgeContent={plan.votes.length}
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
            </>
          ))}
        </Stack>
      </Card>
    </Container>
  );
};

export default Plans;
