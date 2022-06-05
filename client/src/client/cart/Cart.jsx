import React, { useEffect, useState } from 'react'
import { Container, Typography, Button, Grid, Stack, Item } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import CartItem from './CartItem/CartItem';
import { emptyCart} from '../../actions/cart';
import { connect } from 'react-redux'

const Cart = ({cart}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = cart.cart;
    const currentItem = null
    const cartItemsNumber = cart.cart.length
    const [selectedItem,setSelectedItem] = useState({})
    console.log(cart)

    let items = 0;
    let price = 0;
    cartItems.forEach(item =>{
        items += item.quantity
        if(item.price)
            price += item.price * item.quantity
    })
    if(!cartItemsNumber)
    return (
    <Container maxWidth="lg">
    <div className={classes.title1}/>
    <Typography variant="h6">you have no items in your shopping cart, start adding some!
    <div className={classes.end}/>
    </Typography></Container>)

    return (
        <Container>
            <div className={classes.spacing2}/>
            <Typography className={classes.title2} variant="h4">Your Shopping Cart</Typography>
                <Grid container spacing={3}>
                    {cartItems.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} setSelectedItem={setSelectedItem}/>
                        </Grid>))}
                </Grid>
                <div className={classes.spacing1}/>
                <div className={classes.toolbar}>
                    <Typography variant="h4">Subtotal: {price}</Typography>
                    <div>
                        <div className={classes.spacing1}/>
                    <Stack direction="row" spacing={1}>
                         <Button className={classes.red_button} size="large" type="button" variant="contained" onClick={()=>{dispatch(emptyCart());navigate('/') }}>Empty Cart</Button>
                         <Button className={classes.blue_button} size="large" type="button" variant="contained" color="primary">Check Out</Button>
                    </Stack>
                    </div>
                </div>
        </Container>
    )
}
const mapStateToProps = (state)=>{
    return{
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Cart)