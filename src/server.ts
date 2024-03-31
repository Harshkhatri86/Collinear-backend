import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import db from "../models";
import swaggerDocs from './utils/swagger';
import { notFoundMiddleware } from "./middleware/notfoundmiddleware";
import RegisterRoute from "./routers"


dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Register Middleware
app.use("/", RegisterRoute);
app.use(notFoundMiddleware);


db.sequelize.sync().then(() => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const bindAdress = process.env.BIND_ADDRESS || "0.0.0.0";
  console.log("connected to Database")
  app.listen(port, bindAdress, () => {
    console.log(`Server is running at http://localhost:${port}`);
    swaggerDocs(app, port);
  });
});
