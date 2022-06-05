import React, { useEffect, useState } from 'react'
import useStyles from "../styles";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import { getRequests, accepteRequest, refuseRequest } from "../../../actions/requests"
import { CircularProgress, Container, Typography, Tab, Tabs, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, IconButton, Button } from '@mui/material';
import { GoVerified } from "react-icons/go";
import { Tooltip } from '@material-ui/core';
import { AiFillCloseCircle } from "react-icons/ai";
import received from '../../../assets/received.png'
import { motion } from "framer-motion"
import { getIngineerRequests, confirmReceipt } from '../../../actions/ingineerRequest';

function found(requests){
    let f=false
    requests?.forEach(request => {
        if(request.status==undefined)
            f=true
    });
    return f
}

function foundIngReq(requests){
    let f=false
    requests.forEach(request => {
        if(request.receivedAt==undefined)
            f=true
    });
    return f
}

const Requests = () => {
    const dispatch = useDispatch();
    const [demandeType, setDemandeType] = React.useState('Client');
    const handleChange = (event, newDemandeType) => {
        setDemandeType(newDemandeType);
    };
    useEffect(() => {
        dispatch(getIngineerRequests());
        dispatch(getRequests());
    }, [dispatch])
    const { requests, isLoading } = useSelector((state) => state.requests);
    const ingineerRequests = useSelector((state) =>  state.ingineerRequests.ingineerrequests); 
    const isIngineerLoading = useSelector((state) => state.ingineerRequests.isLoading);
    const [selectedId, setSelectedId] = useState(null)
    return (isLoading&&isIngineerLoading) ? (
        <Container maxwidth="lg">
          <br></br>
          <CircularProgress />
          
        </Container>):(
        <Box height={360}>
            <CssBaseline />

            <Tabs TabIndicatorProps={{ style: { background: '#3dc1d3' } }}
                value={demandeType} onChange={handleChange} aria-label="basic tabs example">
                <Tab value={"Client"} label="Client" />
                <Tab value={"Engineer"} label="Engineer" />
            </Tabs>
            <Divider />
            {demandeType==="Client"?
            <List
                sx={{
                    width: '100%',
                    maxWidth: 1000,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 },
                }}>
               {/*on va afficher distinct*/}
                {found(requests) ? requests.map((request) => (
                    !request.status ?
                    <motion.div layoutId={request._id} onClick={() => setSelectedId(request._id)}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture" />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography noWrap>{request.firstName} {request.lastName}</Typography>} secondary={<Typography variant='subtitle2' noWrap>From {request.adress}, wants {request.name}</Typography>} />
                            <Tooltip title="accept"><IconButton onClick={() => dispatch(accepteRequest(request._id))} color="primary"><GoVerified size="20px" fill='#01a3a4' /></IconButton></Tooltip><Tooltip title="refuse"><IconButton onClick={() => dispatch(refuseRequest(request._id))}><AiFillCloseCircle fill="#f8a5c2" size="22px" /></IconButton></Tooltip>
                        </ListItem>
                        </motion.div>
                         :
                        request.status === "refused" && request.updated === true &&
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture" />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography noWrap>{request.firstName} {request.lastName}</Typography>} secondary={<Typography variant='subtitle2' noWrap>From {request.adress}, wants {request.name}</Typography>} />
                            <Tooltip title="accept"><IconButton color="primary"><GoVerified size="20px" fill='#01a3a4' /></IconButton></Tooltip><Tooltip title="refuse"><IconButton><AiFillCloseCircle fill="#f8a5c2" size="22px" /></IconButton></Tooltip>
                        </ListItem>
                        )):<Typography>No Requests!</Typography>}
            </List>:
            <List
            sx={{
                width: '100%',
                maxWidth: 1000,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },
            }}>
           {/*on va afficher distinct*/}
            {foundIngReq(ingineerRequests) ? ingineerRequests.map((request) => (
                    !request.receivedAt &&
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture" />
                        </ListItemAvatar>
                        <ListItemText primary={<Typography noWrap>{request.ingineerName}</Typography>} secondary={<Typography variant='subtitle2' noWrap>wants {request.name} from {request.supplier}</Typography>} />
                        <Tooltip title="Received"><IconButton size='20px' onClick={() => dispatch(confirmReceipt(request._id))} children={<img src={received} alt="logo"/>}/></Tooltip>                    </ListItem>
                    )):<Typography>No Requests!</Typography>}
        </List>}
        </Box>
    )
}

export default Requests