import { Box, TextField, Tooltip, CircularProgress, Container } from "@mui/material"
import React, { useState, useEffect } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { GoVerified } from "react-icons/go";
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import { IconButton, Card, Button, Typography } from "@material-ui/core";
import { MdEditLocationAlt, MdAddLocationAlt, MdWrongLocation } from "react-icons/md";
import { useDispatch, connect  } from "react-redux";
import { createGeo, deleteGeo, getGeo } from "../../../actions/geo";
import { BiMessageRoundedDots } from "react-icons/bi";
import mapboxgl from "mapbox-gl";

const MyMap = ({geo,isLoading}) => {

    const dispatch = useDispatch();
    const [drag, setDrag] = useState(false)
    const [add, setAdd] = useState(false)
    const [currentId,setCurrentId] = useState(null)
    const [newLocation, setNewLocation] = useState({
        name: "",
        longitude: "",
        latitude: "",
    })
    useEffect(async () => {
        dispatch(getGeo());
    }, []);
    const clear = () => {
        setNewLocation({
            name: "",
            longitude: "",
            latitude: "",
        });
    };
    const [initialViewState, setInitialViewState] = useState({
        longitude: 9.149,
        latitude: 36.097,
        zoom: 8.53
    })
    const [currentViewState, setCurrentViewState] = useState({
        longitude: 9.149,
        latitude: 36.097,
        zoom: 8.53
    })
    console.log(geo)
    return isLoading ? (
        <Container maxwidth="lg">
          <br></br>
          <CircularProgress />
          
        </Container>):(
        <Box sx={{
            height: 350,
            position: 'relative'
        }}>
            <ReactMapGL
                onMoveEnd={(e) => {
                    setCurrentViewState({
                        longitude: e.viewState.longitude,
                        latitude: e.viewState.latitude,
                        zoom: e.viewState.zoom
                    })
                }}
                initialViewState={initialViewState}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            ><>
                    {!drag && !add && <Tooltip onClick={() => setAdd(true)} title="Add Location"><IconButton><MdAddLocationAlt fill='#01a3a4' /></IconButton></Tooltip>}
                    {drag && <Tooltip onClick={() => setDrag(false)} title="Edit Location"><IconButton><MdEditLocationAlt fill='#01a3a4' /></IconButton></Tooltip>}
                    {drag && <TextField size="small" variant="standard" value={newLocation.name} onChange={(e) => { setNewLocation({ ...newLocation, name: e.target.value }); console.log(newLocation) }} color="primary"></TextField>}
                    {drag && <Tooltip onClick={() => {dispatch(deleteGeo(currentId));setDrag(false)}} title="Remove Location"><IconButton><MdWrongLocation fill="#f8a5c2" /></IconButton></Tooltip>}
                    {
                        !drag && add && <><Tooltip onClick={async () => { dispatch(createGeo({ ...newLocation, longitude: currentViewState.longitude, latitude: currentViewState.latitude })); clear(); setAdd(false) }} title="Admit Location"><IconButton><GoVerified size="20px" fill='#01a3a4' /></IconButton></Tooltip><TextField size="small" variant="standard" value={newLocation.name} onChange={(e) => { setNewLocation({ ...newLocation, name: e.target.value })}} color="primary"></TextField></>
                    }
                    {add &&
                        <>
                            <Marker
                                latitude={currentViewState.latitude}
                                longitude={currentViewState.longitude}
                                draggable
                                onDragEnd={(e) => setCurrentViewState({
                                    longitude: e.lngLat.lng,
                                    latitude: e.lngLat.lat,
                                    zoom: currentViewState.zoom
                                })
                                }
                                color="#01a3a4"
                            >
                            </Marker>
                            <Card>
                                <Marker
                                    latitude={currentViewState.latitude - 0.005}
                                    longitude={currentViewState.longitude}
                                    draggable={false}
                                >

                                    <TextField size="small" variant="standard" value={newLocation.name} onChange={(e) => { setNewLocation({ ...newLocation, name: e.target.value }); console.log(newLocation) }} color="primary"></TextField>
                                </Marker>
                            </Card>
                        </>
                    }
                {geo.map((item)=>(<>
                    {item.latitude&&item.longitude&&
                    <>
                    <Marker
                    key={item._id}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        draggable={drag}
                        color="#01a3a4"
                    >
                    </Marker>
                    <Marker
                        onClick={(e) => console.log(e)}
                        latitude={item.latitude-0.02}
                        longitude={item.longitude}
                        draggable={drag}
                    //onDragEnd={(e)=>console.log(e)}
                    >{!drag ? <Button onClick={() => {setCurrentId(item._id);setDrag(true)}} color="primary">{item.name}</Button> : <Typography color="#01a3a4">{item.name}</Typography>}
                    </Marker></>}</>))}
                        
                    <NavigationControl position="bottom-right" />
                    <GeolocateControl
                        onGeolocate={(e) => console.log(e)}
                        position="top-right" />
                </>
            </ReactMapGL>
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        geo: state.geo.geo,
        isLoading: state.geo.isLoading
    }
}

export default connect(mapStateToProps)(MyMap);
//mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}