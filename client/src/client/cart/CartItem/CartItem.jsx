import React, { useEffect, useState } from 'react'
import { TextField, IconButton, Container, Slider, Typography, Button, Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import { useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
//import { incrementQuantity } from '../../../actions/cart';
import { useNavigate } from "react-router-dom";
import { adjustLength, adjustQuantity, removeCartItems, removeCartItem, duplicateCartItem } from '../../../actions/cart';
import { MdDeleteOutline } from "react-icons/md";
import { BiDuplicate } from "react-icons/bi";
import { makeStyles } from '@material-ui/styles';

import useStyles from './styles';

const CartItem = ({ item }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([])
  const [intervalle, setIntervalle] = useState([])

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
  useEffect(() => {
    selectedItems[0]?.length && dispatch(adjustLength(item._id, item.growth, selectedItems[0].length, selectedItems[0].price))
  }, [selectedItems])

  const content = () => {
    return (
      <>
        <Container className={classes.container}>
          <div className={classes.topright}>
            <IconButton sx={{"&:hover, &.Mui-focusVisible": { backgroundColor: "#F3F8F7" }}} onClick={() => dispatch(removeCartItems(item._id))}><MdDeleteOutline color='#FF8769' /></IconButton></div>
          <CardMedia style={{borderRadius: 20}} image={item.selectedFile} alt={item.name} className={classes.media} />
        </Container>
        <CardContent className={classes.CardContent}>
          <Typography variant="h7">{item?.age && <>{item?.age} jours  - </>}{item?.price && <>{item?.price} dt</>}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <div>
            <Button className={classes.red_button} type="button" size="small" onClick={() => dispatch(adjustQuantity(item._id, item.growth, --item.quantity))}>-</Button>
            <Button className={classes.blue_button} type="button" size="small" onClick={() => dispatch(adjustQuantity(item._id, item.growth, ++item.quantity))}>+</Button>
          </div>
          <div className={classes.spacing}></div>
          <Typography > {item.name}</Typography>
          <TextField style={{width:56,height:39}} color='secondary' size="small" name="quantity" value={item.quantity} onChange={(e) => { dispatch(adjustQuantity(item._id, item.growth, e.target.value)) }}></TextField>
        </CardActions>
      </>)
  }

  return (
    <Card>
      <Grid container spacing={2}>
        <div className={classes.noSelectSize}/>
       <Grid item xs={11} >
          {content()}
        </Grid>
      </Grid>
    </Card>
  )
}

export default CartItem