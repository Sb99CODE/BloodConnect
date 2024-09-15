const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require("morgan");
const path=require('path')

dotenv.config();

connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(cors({
  origin: "https://bloodconnect-client.onrender.com",
  credentials: true,
}));
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// app.use(express.static(path.join(__dirname,'./build'))) //static folder
// app.get('*',function(req,res){ //static routes
//   res.sendFile(path.join(__dirname,'./build/index.html'));
// })

const PORT = process.env.PORT || 5176;

app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.MODE} ModeOn Port ${process.env.PORT}`
  );
});
