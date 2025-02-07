const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // ✅ Keep only this one
const errorHandler = require("./middlewares/errorHandler.middleware.js");
const userRoutes = require("./routes/user.route.js");
const authRoutes = require("./routes/auth.route.js");
const jobRoutes = require("./routes/job.route.js");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/job', jobRoutes);
app.use(errorHandler);

app.get("/", (req, res, next) => {
    try {
        res.send("Hello World!");
    } catch (err) {
        next(err);
    }
});

// ✅ Ensure Mongoose is only declared once before connecting
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });
}).catch((err) => {
    console.log("MongoDB Connection Error:", err);
});
