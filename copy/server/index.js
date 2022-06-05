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

import seedRoutes from "./routes/Seed.js";
import saplingRoutes from "./routes/Sapling.js";
import employerRoutes from "./routes/Employer.js";
import userRoutes from "./routes/User.js";
import planRoutes from "./routes/Plan.js";
import supplierRoutes from "./routes/Plan.js";

const PORT = process.env.PORT || 5000;

app.use("/plantations/seeds", seedRoutes);
app.use("/plantations/saplings", saplingRoutes);

app.use("/employers", employerRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/user", userRoutes);
app.use("/user/plan", planRoutes);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));
