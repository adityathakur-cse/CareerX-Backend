import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./Routes/Auth.route.js";
import { connectToDb } from "./Helpers/connectToDb.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectToDb();
  console.log(`Listening on PORT ${PORT}`);
});
