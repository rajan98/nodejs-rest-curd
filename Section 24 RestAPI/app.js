const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer"); // this is for file upload
const path = require("path"); // this is to access local system files

const feedRoutes = require("./routes/feeds");
const authRoutes = require("./routes/auth");
const isAuth = require("./middleware/is-auth");

const app = express();

// Below code logic is to configure file upload
// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, "uploadedFile" + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimeType === "image/png" ||
//     file.mimeType === "image/jpg" ||
//     file.mimeType === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// This is the body parser to parse the request body as JSON.
app.use(bodyParser.json());

// Adding the File config to the app middleware
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
// );

// If we have images in local directory that we need to expose we can use this logic.
// If we dont use this the path will not be exposed to public.
// app.use("/images", express.static(path.join(__dirname, "images")));

// This is to remove CORS from frontend.
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// });

// Here we define the routes
app.use("/feed", isAuth, feedRoutes);
app.use("/auth", authRoutes);

// This is for global error handeling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://learninguser:Rd1HyYzVvVdFjk40@learning.dvnmcr3.mongodb.net/messages?retryWrites=true&w=majority&appName=learning"
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((error) => console.log("Monogo DB Connection Error: ", error));
