import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers } from "../../actions/users";
import { Card, CircularProgress, Container, Paper } from "@mui/material";
import ManagerGrid from "./ManagerGrid";

const ManagerPanel = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
    
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  let { users, isLoading } = useSelector(
    (state) => state.users
  );

  let indexedUsers=[]

  let id=1
  users.forEach((user)=>{
      id++
      indexedUsers.push({_id:user._id,firstName:user.firstName,lastName:user.lastName,email:user.email,adress:user.adress||"unknown",phoneNumber:user.phoneNumber||"12345678",credit:user.credit||0,role:user.role||"client",id})
  })

  if (!users) return null;

  if (isLoading) {
    return (
      <Container maxwidth="lg">
        <br></br>
        <CircularProgress />
      </Container>
    );
  }

  return (
    //tableau affiche le stock

    <Container maxwidth="lg">
      <Card>
        <ManagerGrid users={indexedUsers}/>
      </Card>
    </Container>
  );
};

export default ManagerPanel;