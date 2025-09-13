// app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route"; 
import { MErrorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API berjalan. Coba akses /api/v1/auth/login");
});

app.use(MErrorHandler);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

export default app;
