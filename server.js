import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./Routes/Auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
