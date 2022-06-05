import React, { useEffect, useState } from 'react';
import { TextField, Button, Slider, Tooltip, Badge, Grid, Card, Stack, Divider, CardMedia, CardContent, CardActions, Typography, IconButton, Link, Checkbox, FormGroup, FormControlLabel, Backdrop } from '@mui/material';
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { shadows, positions, fontSize, handleBreakpoints } from '@mui/system';
import { addCartItem } from '../../../actions/cart';
import Comments from './Comments/Comments';
import OpenComments from "./Comments/OpenComments"

import { BsInfoSquare } from "react-icons/bs";
import logo from "../../../assets/req.png";
import { motion, AnimatePresence } from "framer-motion"
import useStyles from "./styles"
import { styled } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';

export const calculateQuantity = (list) => {
    let quantity = 0
    list.forEach((product) => {
            if (product.quantity) {
                quantity+=product.quantity
            }
        })
    return (quantity)
}

export const findMin = (list) => {
    let minAge = 100000
    let minPrice = 100000
    list.forEach((product) => {
        if (product.age < minAge)
            if (product.price) {
                minAge = product.age
                minPrice = product.price
            }
    })
    return ([minAge, minPrice])
}

export const nearby = (list, number) => {
    let nearAge = list[0].age
    let nearPrice = list[0].price
    let nearQuantity = list[0].quantity
    let diff = Math.abs(list[0].age - number)
    list.forEach((item) => {
        if (Math.abs(item.age - number) < diff && item.price && item.quantity) {
            nearAge = item.age
            nearPrice = item.price
            nearQuantity = item.quantity
            diff = Math.abs(item.age - number)
        }
    })
    return [nearAge, nearPrice, nearQuantity]
}

export const findMax = (list) => {
    let maxAge = 0
    let maxPrice = 0
    list.forEach((product) => {
        if (product.age > maxAge)
            if (product.price) {
                maxAge = product.age
                maxPrice = product.price
            }
    })
    return ([maxAge, maxPrice])
}

const PrettoSlider = styled(Slider)({
    color: '#00BFFF',
    height: 200,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 12,
        width: 12,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 20,
        height: 20,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#00BFFF',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});

const Product = ({ product, setSelectedId, setSelectedProduct }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedItems, setSelectedItems] = useState([,,])
    const [selectedQuantity, setSelectedQuantity] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)

    const [intervalle, setIntervalle] = useState(20)

    const navigate = useNavigate();
    const [added, setAdded] = useState(false);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (product?.stock && product?.type==="tree")
            setSelectedItems(nearby(product.stock, intervalle))
        else
            setTotalQuantity(calculateQuantity(product.stock))
        console.log(selectedItems)
    }, [intervalle])

    /*useEffect(() => {
        selectedItems[0]?.age && dispatch(adjustAge(product._id, product.type, selectedItems[0].length, selectedItems[0].price))
      }, [selectedItems])*/

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const handleSubmit = () => {
        console.log(product)
        if (product.type === "sapling")
            dispatch(addCartItem(product._id, "sapling"))
        if (product.type === "tree")
            handleToggle()
        //dispatch(addCartproduct(product._id, "tree"))
    }

    return (
        <Card className={classes.root}>
            <Link onClick={() => { handleToggle(); navigate(`${product.category}/${product._id}`) }} className={classes.info}>
                <CardMedia className={classes.media} image={product.selectedFile} title={product.name} />
            </Link>
            <CardContent>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                >
                    <Typography variant="h5" gutterBottom>
                        {product.name}<br />                </Typography>
                    <Typography variant="h7">{product?.price ? <>{product?.price} dt</> : <>{findMin(product?.stock)[1]} dt - {findMax(product?.stock)[1]} dt<br /> {findMin(product?.stock)[0]} jours - {findMax(product?.stock)[0]} jours</>}</Typography>
                    <div disableSpacing className={classes.cardActions}>
                        <Badge color="primary" variant="dot" invisible={!added}>
                            <Tooltip title="Add To Cart"><IconButton aria-label="Add to Card" onClick={() => { handleSubmit(); setAdded(true) }}>
                                <MdAddShoppingCart size="15px" />
                            </IconButton></Tooltip>
                        </Badge>
                    </div>
                </Stack>
            </CardContent>
            <Comments product={product} />

            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}

            >
                <Card sx={{ height: 700, width: window.innerWidth - 200 }}>
                    {product.type === "tree" ? <Grid container spacing={2}>
                        <Grid product xs={1}>
                            <div className={classes.selectSize} style={{ marginLeft: 60, marginTop: 50 }}>
                                {selectedItems ? <>age:<br /> {selectedItems[0]} days</> : <>select length {intervalle[0]}</>}
                                <PrettoSlider
                                    style={{ marginTop: 20, marginLeft: 20 }}
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    orientation="vertical"
                                    defaultValue={20}
                                    min={20}
                                    max={200}
                                    value={intervalle}
                                    onChange={(e) => setIntervalle(e.target.value)}
                                />
                            </div>
                        </Grid>
                        <Grid product xs={4}>
                            <CardMedia className={classes.media} style={{ marginLeft: 30, marginTop: 50 }} image={product.selectedFile} title={product.name} />
                        </Grid>
                        <Grid product xs={7}>
                            <Typography style={{ marginLeft: 60, marginTop: 50 }} variant="h4">{product.name}</Typography>
                            <Typography style={{ marginLeft: 70 }} variant="h5">{product.description}</Typography>
                            <Typography style={{ marginLeft: 80 }} variant="h6">{selectedItems[2]} {product.type} available for {selectedItems[0]} days age<br /></Typography>
                            <Typography style={{ marginLeft: 80 }} variant="h6">price per unit {selectedItems[1]} dt</Typography>
                            <Divider style={{ marginLeft: 80 }} />
                            <Typography style={{ marginLeft: 187 ,marginTop: 40  }} variant="h6">select quantity:</Typography>
                            <Stack direction="row" style={{marginLeft: 190}}>
                                <Button style={{height:39}}  className={classes.red_button} type="button" size="small" onClick={() => {if(!selectedQuantity<=0) setSelectedQuantity(selectedQuantity-1)}}>-</Button>
                                <TextField style={{width:56,height:39}} className={classes.gris_textfield} color='secondary' size="small" name="quantity" value={selectedQuantity} onChange={(e) => {if(e.target.value<selectedItems[2]) setSelectedQuantity(parseInt(e.target.value)); else if(e.target.value>selectedItems[2]) setSelectedQuantity(selectedItems[2])}}/>
                                <Button style={{height:39}}  className={classes.blue_button} type="button" size="small" onClick={() => {if(selectedQuantity<selectedItems[2]) setSelectedQuantity(selectedQuantity+1)}}>+</Button>
                            </Stack>
                            <Button style={{marginLeft: 270, height:39, marginTop: 15}} variant="contained"  className={classes. blue_submit_button} type="button" size="small" onClick={() => {dispatch(addCartItem({_id:product._id,age:selectedItems[0],price:selectedItems[1],quantity:selectedItems[2],selectedQuantity:selectedQuantity}))}}>Add To Cart</Button>
                            <OpenComments product={product}/>
                        </Grid>
                    </Grid>:<Grid container spacing={2}>
                        <Grid product xs={1}/>
                        <Grid product xs={4}>
                            <CardMedia className={classes.media} style={{ marginLeft: 30, marginTop: 50 }} image={product.selectedFile} title={product.name} />
                        </Grid>
                        <Grid product xs={7}>
                            <Typography style={{ marginLeft: 60, marginTop: 50 }} variant="h4">{product.name}</Typography>
                            <Typography style={{ marginLeft: 70 }} variant="h5">{product.description}</Typography>
                            <Typography style={{ marginLeft: 80 }} variant="h6">{totalQuantity} {product.type} available<br /></Typography>
                            <Typography style={{ marginLeft: 80 }} variant="h6">price per unit {product.price} dt</Typography>
                            <Divider style={{ marginLeft: 80 }} />
                            <Typography style={{ marginLeft: 187 ,marginTop: 40  }} variant="h6">select quantity:</Typography>
                            <Stack direction="row" style={{marginLeft: 190}}>
                                <Button style={{height:39}}  className={classes.red_button} type="button" size="small" onClick={() => {if(!selectedQuantity<=totalQuantity) setSelectedQuantity(selectedQuantity-1)}}>-</Button>
                                <TextField style={{width:56,height:39}} className={classes.gris_textfield} color='secondary' size="small" name="quantity" value={selectedQuantity} onChange={(e) => {if(e.target.value<totalQuantity) setSelectedQuantity(parseInt(e.target.value)); else if(e.target.value>totalQuantity) setSelectedQuantity(totalQuantity)}}/>
                                <Button style={{height:39}}  className={classes.blue_button} type="button" size="small" onClick={() => {if(selectedQuantity<totalQuantity) setSelectedQuantity(selectedQuantity+1)}}>+</Button>
                            </Stack>
                            <Button style={{marginLeft: 270, height:39, marginTop: 15}} variant="contained"  className={classes. blue_submit_button} type="button" size="small" onClick={() => {dispatch(addCartItem({_id:product._id,price:product.price,quantity:totalQuantity,selectedQuantity:selectedQuantity}))}}>Add To Cart</Button>
                            <OpenComments product={product}/>
                        </Grid>
                    </Grid>}
                </Card>
            </Backdrop >

        </Card >
    )
}

export default Product