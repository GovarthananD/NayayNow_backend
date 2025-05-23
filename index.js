import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import DB from "./config.js";
import { complaint } from "./routes.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin:'*'}));
app.use(bodyParser.json());

DB();

app.use(complaint)


app.listen(process.env.PORT, ()=>console.log("APP Running on PORT", process.env.PORT));