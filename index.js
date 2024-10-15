import express from 'express';
import dotenv from 'dotenv';
import noteRouter from "./src/routes/notes.js";
import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect("mongodb://localhost:27017/notes")
    .then((res) => {
      console.log("connectDB");
    })
    .catch((err) => {
      console.log("fail to connectDB", err);
    });
};
 
connectDB();
const app = express();

dotenv.config();
app.use(express.json());
app.use(noteRouter);

const PORT = process.env.PORT || 3000;

app.use('*', (req, res) => {
  res.send('Hello, ERROR!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

