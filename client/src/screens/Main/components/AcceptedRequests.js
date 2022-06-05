import React, { useEffect, useState } from 'react'
import useStyles from "../styles";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import { getRequests, accepteRequest, refuseRequest } from "../../../actions/requests"
import { Typography, Tab, Tabs, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, IconButton, Button } from '@mui/material';
import { GoVerified } from "react-icons/go";
import { Tooltip } from '@material-ui/core';
import { AiFillCloseCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion"


function found(requests){
    let f=false
    requests.forEach(request => {
        if(request.status==="accepted")
            f=true
    });
    return f
}

const AcceptedRequests = () => {
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState(null)
    const [currenRequest, setCurrenRequest] = useState(null)
    const [demandeType, setDemandeType] = React.useState('Client');
    const handleChange = (event, newDemandeType) => {
        setDemandeType(newDemandeType);
    };
    useEffect(() => {
        dispatch(getRequests());
    }, [])
    const { requests, isLoading } = useSelector((state) => state.requests);
    console.log(selectedId)
    return (<>
        <Box height={360}>
            <CssBaseline />
            <List
                sx={{
                    width: '100%',
                    maxWidth: 1000,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: !selectedId?300:100,
                    display: { selectedId: "none"},
                    '& ul': { padding: 0 },
                }}>
                
                {found(requests) ? requests.map((request) => (
                    request.status==="accepted" &&
                    <motion.div layoutId={request._id } onClick={() => {setSelectedId(request._id);setCurrenRequest(request)}}>
                        <ListItem button >
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture" />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography noWrap>{request.firstName} {request.lastName}</Typography>} secondary={<Typography variant='subtitle2' noWrap>From {request.adress}, wants {request.name}</Typography>} />
                        </ListItem>
                    </motion.div>
                    )):<Typography>No Client Requests Accepted!</Typography>}
            </List>
            <AnimatePresence>
            {selectedId && (
                    <motion.div layoutId={selectedId}>
                        <motion.h5>{currenRequest.firstName} {currenRequest.lastName}</motion.h5>
                        <motion.h5>wants {currenRequest.name}</motion.h5>
                        <motion.h5>Description: {currenRequest.description}</motion.h5>
                        <motion.h5>Adress: {currenRequest.adress}</motion.h5>
                        <motion.h5>Price: {currenRequest.price}dt</motion.h5>
                        <motion.h5>Quantity: {currenRequest.quantity}</motion.h5>

                        <motion.h2></motion.h2>
                        <motion.button onClick={() => {setSelectedId(null);setCurrenRequest(null)}} >close</motion.button>
                    </motion.div>
  )}
</AnimatePresence>
        </Box>
    </>
    )
}

export default AcceptedRequests

/*
import React, { useEffect, useState } from 'react'
import useStyles from "../styles";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import { getRequests, accepteRequest, refuseRequest } from "../../../actions/requests"
import { Typography, Tab, Tabs, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, IconButton, Button } from '@mui/material';
import { GoVerified } from "react-icons/go";
import { Tooltip } from '@material-ui/core';
import { AiFillCloseCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion"


function found(requests){
    let f=false
    requests.forEach(request => {
        if(request.status==="accepted")
            f=true
    });
    return f
}

const AcceptedRequests = () => {
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState(null)
    const [currenRequest, setCurrenRequest] = useState(null)
    const [demandeType, setDemandeType] = React.useState('Client');
    const handleChange = (event, newDemandeType) => {
        setDemandeType(newDemandeType);
    };
    useEffect(() => {
        dispatch(getRequests());
    }, [])
    const { requests, isLoading } = useSelector((state) => state.requests);
    console.log(selectedId)
    return (<>
        <Box height={360}>
            <CssBaseline />
            <List
                sx={{
                    width: '100%',
                    maxWidth: 1000,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: !selectedId?300:100,
                    display: { selectedId: "none"},
                    '& ul': { padding: 0 },
                }}>
                
                {found(requests) ? requests.map((request) => (
                    request.status==="accepted" &&
                    <motion.div layoutId={request._id } onClick={() => {setSelectedId(request._id);setCurrenRequest(request)}}>
                        <ListItem button >
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture" />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography noWrap>{request.firstName} {request.lastName}</Typography>} secondary={<Typography variant='subtitle2' noWrap>From {request.adress}, wants {request.name}</Typography>} />
                        </ListItem>
                    </motion.div>
                    )):<Typography>No Client Requests Accepted!</Typography>}
            </List>
            <AnimatePresence>
            {selectedId && (
                    <motion.div layoutId={selectedId}>
                        <motion.h5>{currenRequest.firstName} {currenRequest.lastName}</motion.h5>
                        <motion.h5>wants {currenRequest.name}</motion.h5>
                        <motion.h5>Description: {currenRequest.description}</motion.h5>
                        <motion.h5>Adress: {currenRequest.adress}</motion.h5>
                        <motion.h5>Price: {currenRequest.price}dt</motion.h5>
                        <motion.h5>Quantity: {currenRequest.quantity}</motion.h5>

                        <motion.h2></motion.h2>
                        <motion.button onClick={() => {setSelectedId(null);setCurrenRequest(null)}} >close</motion.button>
                    </motion.div>
  )}
</AnimatePresence>
        </Box>
    </>
    )
}

export default AcceptedRequests
*/

/*
import React, { useEffect, useState } from 'react'
import useStyles from "../styles";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import { getRequests, accepteRequest, refuseRequest } from "../../../actions/requests"
import { Typography, Tab, Tabs, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, IconButton, Button } from '@mui/material';
import { GoVerified } from "react-icons/go";
import { Tooltip } from '@material-ui/core';
import { AiFillCloseCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion"


function found(requests) {
    let f = false
    requests.forEach(request => {
        if (request.status === "accepted")
            f = true
    });
    return f
}

function Content({currenRequest}) {
    console.log(currenRequest)
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.h5>{currenRequest.firstName} {currenRequest.lastName}</motion.h5>
            <motion.h5>wants {currenRequest.name}</motion.h5>
            <motion.h5>Description: {currenRequest.description}</motion.h5>
            <motion.h5>Adress: {currenRequest.adress}</motion.h5>
            <motion.h5>Price: {currenRequest.price}dt</motion.h5>
            <motion.h5>Quantity: {currenRequest.quantity}</motion.h5>

            <motion.h2></motion.h2>
        </motion.div>
    );
}


const AcceptedRequests = () => {
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState(null)
    const [currenRequest, setCurrenRequest] = useState(null)
    const [demandeType, setDemandeType] = React.useState('Client');
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {setIsOpen(!isOpen)
                               if(isOpen===false) setCurrenRequest(null)};
    const handleChange = (event, newDemandeType) => {
        setDemandeType(newDemandeType);
    };
    useEffect(() => {
        dispatch(getRequests());
    }, [])
    const { requests, isLoading } = useSelector((state) => state.requests);
    console.log(selectedId)
    return (<>
        <Box height={360}>
            <CssBaseline />
            <List
                sx={{
                    width: '100%',
                    maxWidth: 1000,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: !selectedId ? 300 : 100,
                    display: { selectedId: "none" },
                    '& ul': { padding: 0 },
                }}>

                {found(requests) ? requests.map((request) => (
                    request.status === "accepted" &&
                    <motion.li layout onClick={()=>{toggleOpen(); setCurrenRequest(request)}} initial={{ borderRadius: 10 }}>
                        <ListItem button >
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture" />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography noWrap>{request.firstName} {request.lastName}</Typography>} secondary={<Typography variant='subtitle2' noWrap>From {request.adress}, wants {request.name}</Typography>} />
                        </ListItem>
                        <AnimatePresence>{isOpen && currenRequest._id===request._id && <Content currenRequest={currenRequest} />}</AnimatePresence>
                    </motion.li>
                )) : <Typography>No Client Requests Accepted!</Typography>}
            </List>
        </Box>
    </>
    )
}

export default AcceptedRequests
*/