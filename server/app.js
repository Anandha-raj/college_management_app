const express = require("express");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const JobPostRoutes = require("./routes/JobPostRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const cors = require("cors");
const app = express();

app.use(
    fileUpload({
        createParentPath: true, // Automatically create directories if they don't exist
    })
);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/company", JobPostRoutes);
app.use("/api/student", applicationRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("the server is running.");
})