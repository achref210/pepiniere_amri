import Employer from "./screens/Employer/Employer";
import Sapling from "./screens/Sapling/Sapling";
import NavBar from "./screens/NavBar/NavBar";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import Paie from "./screens/Employer/Components/Employers/Employer/PaySlip/Paie";
import Auth from "./screens/Auth/Auth";
import { useState } from "react";
import React, { useRef } from "react";
import Plan from "./screens/Plan/Plan";
import Seed from "./screens/Seeds/Seed";
import BusinessPlan from "./screens/Plan/plans/BusinessPlan/BusineesPlan";
import SaplingDetails from "./screens/Sapling/SaplingDetails/SaplingDetails";
import List from "./screens/NavBar/List";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  return (
    <>
      {!user ? (
        <BrowserRouter>
          <Routes>
            <Route index element={<Auth user={user} setUser={setUser} />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route index element={<Employer />} />

            <Route exact path="/Seeds" element={<Seed />} />
            <Route exact path="/Seeds/search" element={<Seed />} />
            <Route exact path="/Products/:id" element={<SaplingDetails />} />

            <Route exact path="/Saplings" element={<Sapling />} />
            <Route exact path="/Saplings/search" element={<Sapling />} />
            <Route exact path="/Saplings/:id" element={<Sapling />} />

            <Route exact path="/Employers" element={<Employer />} />

            <Route exact path="/Plans" element={<Plan />} />
            <Route exact path="/Products/:id" element={<BusinessPlan />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
