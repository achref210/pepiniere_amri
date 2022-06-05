import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { BiMailSend } from "react-icons/bi";
import { MdOutlinePriceChange } from "react-icons/md";
import { Stack, ToggleButtonGroup, ToggleButton, Divider, Container, Button, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BarChart from './components/BarChart';
import Purchases from './components/Purchases';
import Requests from './components/Requests';
import AcceptedRequests from './components/AcceptedRequests';
import { SaplingData } from './Data/SaplingData';
import { Card, Typography, Drawer } from '@mui/material';
import useStyles from "./styles";
import DoughnutChart from './components/DoughnutChart';
import { Box } from '@material-ui/core';
import MyMap from './components/Map';

const drawerWidth = 240;

/*data= [{labels: saplingData.map((sapling)=>sapling.status)}] */

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const SubItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const Main = () => {
    const classes = useStyles();
    const [demandeType, setDemandeType] = React.useState('saplings');
    const handleChange = (event, newDemandeType) => {
        setDemandeType(newDemandeType);
    };

    const [saplingData, setSaplingData] = useState({
        labels: SaplingData?.map((sapling) => sapling.status),
        datasets: [{
            label: "Status",
            data: SaplingData?.map((sapling) => sapling.quantity),
            backgroundColor: ['#63cdda', "#3dc1d3", "#f8a5c2"]
        }]
    })

    const [stockData, setStockData] = useState({
        labels: SaplingData?.map((sapling) => sapling.status),
        datasets: [{
            //label: "Status",
            data: SaplingData?.map((sapling) => sapling.quantity),
            backgroundColor: ['#63cdda', "#3dc1d3", "#f8a5c2"]
        }]
    })
    //backgroundColor:'#8f9a27', "#b28900"
    return (
        <Container maxwidth="xl">
            <Box>
                <CssBaseline />
                <Drawer
                variant="permanent"
                anchor="bottom"
                elevation={22}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    display: { xs: "none", lg: "flex" },
                    [`& .MuiDrawer-paper`]: { backgroundColor:'#218c74',color:"white",height:535, width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem onMouseOver={()=>window.scrollTo(0,400)} key={"requests"} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <BiMailSend color='white' size={50}/>
                                </ListItemIcon>
                                <ListItemText primary={"Requests"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={"sales_history"} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MdOutlinePriceChange color='white' size={50}/>
                                </ListItemIcon>
                                <ListItemText primary={"Sales History"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer></Box>
            <Grid container spacing={2}>
                <Grid item xs={1} lg={1} sx={{display: { sm: "none", lg: "flex" }}}/>
                <Grid item xs={12} lg={4}>
                    <Paper >
                        <Item>Accepted Requests</Item>
                        <Item><AcceptedRequests/></Item>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={7}>
                    <Paper>
                        <Item>Requests</Item>
                        <Item><Requests /></Item>
                    </Paper>
                </Grid>
                <Grid item xs={1} lg={1} sx={{display: { sm: "none", lg: "flex" }}}/>
                <Grid item xs={12} lg={4}>
                    <Paper >
                        <Item>Stock Status</Item>
                        <Item><BarChart chartData={saplingData} /></Item>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={7}>
                    <Paper>
                        <Item>Purchases</Item>
                        <Item><Purchases/></Item>
                    </Paper>
                </Grid>
                <Grid item lg={1} sx={{display: { sm: "none", lg: "flex" }}}/>
                <Grid item lg={4}>
                    <Item>Informations</Item>
                </Grid>
                <Grid item xs={12} lg={7} >
                    <Item><Typography>Location</Typography></Item>
                    <Paper>
                        <MyMap/>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={4} id="status">
                    <Item>Saplings Status</Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>Seeling History</Item>
                </Grid>
            </Grid></Container>
    )
}

export default Main