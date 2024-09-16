const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require("morgan");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// CORS configuration
app.use(cors({
  origin: 'https://bloodconnect-client.onrender.com',
  credentials: true
}));

// API Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).send("API route not found");
});

const PORT = process.env.PORT || 5176;

app.listen(PORT, () => {
  console.log(`Node Server Running In ${process.env.MODE} Mode On Port ${PORT}`);
});
