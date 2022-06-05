import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import Recaptcha from 'react-recaptcha';
import React, { useState } from "react";
import Main from "./screens/Main/Main";
import Employer from "./screens/Employer/Employer";
import Sapling from "./screens/Sapling/Sapling";
import NavBar from "./screens/NavBar/NavBar";
import Plan from "./screens/Plan/Plan";
import Seed from "./screens/Seeds/Seed";
import Material from "./screens/Material/Material";
import Supplier from "./screens/Supplier/Supplier";
import BusinessPlan from "./screens/Plan/plans/BusinessPlan/BusineesPlan";
import MaterialDetails from "./screens/Material/MaterialDetails/MaterialDetails";
import SaplingDetails from "./screens/Sapling/SaplingDetails/SaplingDetails";
import SeedDetails from "./screens/Seeds/SeedDetails/SeedDetails";
import { green, yellow, blue, blueGrey } from "@mui/material/colors";
import ManagerPanel from "./screens/ManagerPanel/ManagerPanel";
import {Cart,Navbar,Products,Auth,Request} from './client'
import { ThemeProvider, createTheme } from "@mui/material";
import ProductDetails from "./client/products/ProductDetails/ProductDetails";
import Profile from "./client/profile/Profile";
import List from "./screens/NavBar/List";


const outertheme = createTheme({
  palette: {
    primary: {
      main: "#3dc1d3",
    },
    secondary: {
      main: "#f8a5c2",
    },
    third: {
      main: yellow[100],
    },
  },
});

const blueTheme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: blueGrey[200],
    },
    third: {
      main: blueGrey[500],
    },
  },
});

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [search, setSearch] = useState("");
  return (
    <>
      {!user?.result.role ? (
        <div className="client">
        <ThemeProvider theme={blueTheme}>
        <BrowserRouter>
          <Navbar user={user} setUser={setUser}/>
          <Routes>
            <Route index element={<Products />} />
            <Route exact path="/:id" element={<Products />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/fruits" element={<Products />} />
            <Route exact path="/decoration/:id" element={<Products />} />
            <Route exact path="/decoration" element={<Products />} />
            <Route exact path="/vegetables" element={<Products />} />
            <Route exact path="/vegetables/:id" element={<Products />} />
            <Route exact path="/oliviers" element={<Products />} />
            <Route exact path="/oliviers/:id" element={<Products />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/request" element={<Request />} />
            <Route exact path="/auth" element={<Auth user={user} setUser={setUser}/>} />
          </Routes>
        </BrowserRouter>
        </ThemeProvider>
        </div>
      ) : (
        <div className="manager">
        <ThemeProvider theme={outertheme}>
        <BrowserRouter>
          <NavBar search={search} setSearch={setSearch} user={user} setUser={setUser} />
          <Routes>
            <Route index element={<Main />} />

            <Route exact path="/Seeds" element={<Seed search={search}/>} />
            <Route exact path="/Seeds/search" element={<Seed search={search}/>} />
            <Route exact path="/Seeds/:id" element={<SeedDetails />} />

            <Route exact path="/Materials" element={<Material search={search}/>} />
            <Route exact path="/Materials/search" element={<Material search={search}/>} />
            <Route exact path="/Materials/:id" element={<MaterialDetails />} />

            <Route exact  path="/Saplings" element={<Sapling search={search}/>} />
            <Route exact path="/Saplings/search" element={<Sapling search={search} />} />
            <Route exact path="/Saplings/:id" element={<SaplingDetails />} />


            <Route exact path="/Employers" element={<Employer />} />

            <Route exact path="/Suppliers" element={<Supplier search={search} />} />


            <Route exact path="/Plans" element={<Plan />} />
            <Route exact path="/Plans/:id" element={<BusinessPlan />} />

            <Route exact path="/ManagerPanel" element={<ManagerPanel />} />
          </Routes>
        </BrowserRouter>
        </ThemeProvider>
        </div>
      )}
    </>
  );
};

export default App;
