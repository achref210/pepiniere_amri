import React, { useEffect, useState } from 'react'
import { Card, Container, Grid, LinearProgress, Stack, CardMedia, Typography, Avatar, Divider } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion"
import Nav from './Nav/Nav'
import { getFruits, getCategory } from '../../actions/products';
import olivier from '../../assets/nav/olivier.png'
import ProductDetails from './ProductDetails/ProductDetails';
import Prod from './Prod';
import Menu from './Menu';

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";

import Product from "./Product/Product";

import useStyles from "./styles"
import { Tooltip } from '@material-ui/core';

const Products = ({ cart, products, isLoading }) => {
    const classes = useStyles();
    const [selected, setSelected] = useState("no");
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { id } = useParams();
    const imageHasLoaded = true;

    useEffect(async() => {
        document.title="Pepiniere Amri"
        if(selected==="no")
              {
                dispatch(getFruits())
                navigate('/')
              } else {
                dispatch(getCategory(selected))
                navigate(`/${selected || "none"}`)
              }
    }, [selected])

    //const products=cart.products
    //
    return (<>
        <div className={classes.toolbar} />
        <Container maxWidth={1600}>
            <Card style={{height:500,width:"100%",position:"center",backgroundColor:"#D9E5E5"}}>
                <div className={classes.toolbar} />
                <motion.h2 initial={{x:650,y:-100,fontSize:40, color:"GrayText"}}>Pépinière Amri</motion.h2>
                <motion.h2 initial={{x:650,y:-100,fontSize:20, color:"GrayText"}}>chers clients je suis au comble de ma joie de vous accueillir dans mon site.<br/>
                                                                                    je vous souhaite les bienvenus et j'espére que nos produits agricoles soient à la hauteur de vos attentes.</motion.h2>
                                                                                    <Menu/>
                                                                                    </Card>
            
        </Container>
        <div style={{height:15}}/>
        <Divider/>
        <div style={{height:30}}/>
        <Nav selected={selected} setSelected={setSelected}/>
        
        <Prod selectedId={id} open={open} setOpen={setOpen}/>
        <ProductDetails id={id} key="product" open={open} setOpen={setOpen}/>
        </>)
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        products: state.products.products,
        isLoading: state.products.isLoading
    }
}

export default connect(mapStateToProps)(Products);