import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import productRoutes from "./routes/products.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/products", productRoutes);

// DB + server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
