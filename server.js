import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./Routes/Auth.route.js";
import { connectToDb } from "./Helpers/connectToDb.js";
import cookieParser from "cookie-parser";
import companyRouter from "./Routes/Company.route.js";
import userRouter from "./Routes/User.route.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://careerx-one.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/company", companyRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectToDb();
  console.log(`Listening on PORT ${PORT}`);
});
