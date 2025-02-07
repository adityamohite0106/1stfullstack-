const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler.middleware.js");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const jobRoutes = require("./routes/job.route");

dotenv.config();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);


app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Error Handling Middleware (✅ Move this below routes)
app.use(errorHandler);

// Start the Server and Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
