import React, { useEffect, useState } from 'react'
import { Card, Container, Grid, LinearProgress, Stack, CardMedia, Typography, Avatar, Divider } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion"
import Nav from './Nav/Nav'
import { getFruits } from '../../actions/products';
import { initialiseProducts } from '../../actions/cart';
import AnimatedText from 'react-animated-text-content';
import received from '../../assets/received.png'
import fruits from '../../assets/nav/fruits.png'
import fleur from '../../assets/nav/fleur.png'
import legume from '../../assets/nav/legume.png'
import olivier from '../../assets/nav/olivier.png'
import Menu from './Menu';

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";

import Product from "./Product/Product";

import useStyles from "./Product/styles"
import { Tooltip } from '@material-ui/core';

const Products = ({ cart, products, isLoading }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    //const products=cart.products
    //zddzd

    const [selectedId, setSelectedId] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)

    return isLoading ? (
        <Container maxWidth="lg">
            <AnimatedText
                type="words" // animate words or chars
                animation={{
                    x: '200px',
                    y: '-20px',
                    scale: 1.1,
                    ease: 'ease-in-out',
                }}
                animationType="float"
                interval={0.06}
                duration={2}
                tag="p"
                className="animated-paragraph"
                includeWhiteSpaces
                threshold={0.1}
                rootMargin="20%"
            >
                Loading
            </AnimatedText>
            <LinearProgress color='secondary' />
            <div className={classes.end} />
        </Container>) : (
            (!products.length && !isLoading) ?
            <><div className={classes.spacing} />No Products!</>
            :
        <main className={classes.content}>
            <Container maxWidth={1600}>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product product={product} setSelectedId={setSelectedId} setSelectedProduct={setSelectedProduct} />
                        </Grid>
                    ))}
            </Grid>
            </Container>
            </main>
        )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        products: state.products.products,
        isLoading: state.products.isLoading
    }
}

export default connect(mapStateToProps)(Products);