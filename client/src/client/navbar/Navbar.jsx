import React, { useEffect, useState } from 'react' ;
import { getFruits } from '../../actions/products';
import { Tooltip, AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material';
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimateSharedLayout } from "framer-motion";

import logo from '../../assets/logo.png'
import demlogo from '../../assets/demlogo.png'
import useStyles from "./styles"

const Navbar = ({user,setUser}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItemsNumber = useSelector((state) =>state.cart.cart.length)
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        setUser(null);
        document.location.reload()
        navigate("/");
      };
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
  return (
    <AppBar className={classes.appBar} color="inherit">
    <Toolbar>
      <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <motion.div  initial={{y:-350}} animate={{y: -5}} transition={{delay:0.2, type: 'tween'}}>
          <motion.div whileHover={{scale:1.1}}> 
            <img src={logo} alt="Pepiniere Amri" height="25px" className={classes.image}/>
            Pepiniere Amri
          </motion.div>
        </motion.div></Link>
        <div className={classes.grow}/>
        <div className={classes.button}>
        <Tooltip title="Request Planting"><IconButton size='20px' onClick={()=>navigate("/request")} children={<img src={demlogo} alt="logo"/>}/></Tooltip>
        <Tooltip title= {cartItemsNumber?"Show Cart Items":"Cart Is Empty"}>
            <IconButton aria-label='show cart items' color='inherit' onClick={()=>navigate("/cart")}>
                <Badge badgeContent={cartItemsNumber} >
                    {!cartItemsNumber?<MdOutlineShoppingCart size="20px"/>:<MdShoppingCart size="20px"/>}
                </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title= {user?"Show Profile":"Connect"}>
            <IconButton aria-label='show profile' color='inherit' onClick={(e)=>user? handleOpenUserMenu(e):navigate("./auth")}>
                    <CgProfile size="22px"/>
            </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={()=>{handleCloseUserMenu();navigate("/profile")}}>
                    <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
        </div>
    </Toolbar>
</AppBar>
  )
}

export default Navbar