import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

import requestRoutes from "./routes/Request.js";
import seedRoutes from "./routes/Seed.js";
//import treeRoutes from "./routes/Tree.js";
import materialRoutes from "./routes/Material.js";
import saplingRoutes from "./routes/Sapling.js";
import employerRoutes from "./routes/Employer.js";
import userRoutes from "./routes/User.js";
import planRoutes from "./routes/Plan.js";
import defaultPlanRoutes from "./routes/DefaultFertilizaionPlan.js";
import supplierRoutes from "./routes/Suppliers.js";
import productRoutes from "./routes/Products.js";
import refSeedsRoutes from "./routes/RefSeeds.js"
import geoRoutes from "./routes/Geo.js"
import ingineerRequestRoutes from "./routes/IngineerRequests.js"

const PORT = process.env.PORT || 5000;

app.use("/plantations/seeds", seedRoutes);
app.use("/materials", materialRoutes);
app.use("/ingineerRequest", ingineerRequestRoutes);
app.use("/request", requestRoutes);
app.use("/refSeeds", refSeedsRoutes);
app.use("/plantations/saplings", saplingRoutes);
app.use("/plan/default", defaultPlanRoutes);
app.use("/products", productRoutes);
app.use("/employers", employerRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/user", userRoutes);
app.use("/user/plan", planRoutes);
app.use("/geo", geoRoutes);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));
