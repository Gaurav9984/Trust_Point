const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ✅ Middlewares (VERY IMPORTANT)
app.use(cors({
  origin: [
    'https://trustpoint.in',
    'https://backend.trustpoint.in',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
const authRoutes = require("./Routes/authRouter");
// const authRoutes = require("./route/auth");

const userRoutes = require("./Routes/userRouter");

// 🔥 THIS LINE IS THE KEY (without this → Cannot POST error)
app.use("/auth", authRoutes);

app.use("/users", userRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_CONN)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

const PORT = process.env.PORT || 3002;

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
