import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { TextField, Grid,Stack } from "@mui/material";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

import { HiOutlineSearch } from "react-icons/hi";
//
import Zoom from '@mui/material/Zoom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import useStyles from "./styles";
//
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./pamri.png";
import decode from "jwt-decode";
import { GiPlantSeed, GiFruitTree } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa";

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
   <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

const MyBar = (props) => {
  const pages = ["Employers", "Suppliers", "Materials", "Plans"];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  let Logo = require("./amrip.png");

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    props.setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = props.user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    props.setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
//background: '#76ff03'

  return (
    <React.Fragment>
      <AppBar position="static" style={{ background: '#01a3a4' }}>
        <Grid>
        <Container maxWidth="xl">
          <Toolbar >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <img src={logo} alt="logo" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <AiOutlineUnorderedList />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    to={`${page}`}
                    component={Link}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", lg: "none" } }}
            >
              <img src={logo} alt="logo" />
            </Typography>

            <Container maxWidth="xs">
            
              <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
              <TextField
              size="small"
                name="search"
                variant="outlined"
                label="Search"
                fullWidth
                value={props.search}
                onChange={async (e) => {
                  props.setSearch(e.target.value);
                }}
              />
              <HiOutlineSearch color="green"/>
</Stack>
              </AppBar>
              
              </Container>
            
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={(event) => {
                  handleCloseNavMenu();
                  setAnchorEl(event.currentTarget);
                }}
                id="button"
                aria-controls={open ? "menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Products
              </Button>
              <Menu
                className="mn"
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/Seeds");
                  }}
                >
                  <GiPlantSeed color="green" />
                  Seeds
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/Saplings");
                  }}
                >
                  <FaSeedling color="green" /> Sapling
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/Trees");
                  }}
                >
                  <GiFruitTree color="green" />
                  Tree
                </MenuItem>
              </Menu>

              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  to={`${page}`}
                  component={Link}
                >
                  {page}
                </Button>
              ))}<br></br>
              
              
            </Box>
            

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    {/*alt={user.result.name}
                   src={user.result.imageUrl}user.result.name.charAt(0)*/}
                  </Avatar>
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
              {//!user?.result.role=='admin'&&
                <MenuItem
                  onClick={() => {
                    navigate("/ManagerPanel")
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">Manager Panel</Typography>
                </MenuItem>}
                <MenuItem
                  onClick={() => {
                    logout();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
      
            </Box>
          </Toolbar>
        </Container>
        </Grid>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
   
    <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          Up!
        </Fab>
      </ScrollTop>
    </React.Fragment>);
};

export default MyBar;
