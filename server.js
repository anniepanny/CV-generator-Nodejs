const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

require("dotenv").config();

const cors = require("cors");
const userRoutes = require("./src/routes/auth.routes.js");
const Templates = require("./src/routes/templates.routes.js");
const verifyToken = require("./src/middleware/authJWT.middleware.js");
const File = require("./src/models/fileSchema.js");

//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    if(ext === "pdf" || ext === "jpeg" || ext === "png")
      cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    else
      cb(new Error(`${ext} is not supported`), false);
      // res.status(415).send({"message":"file not supported"})
  },
});

// Multer Filter
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[1] === "pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Not a PDF File!!"), false);
//   }
// };

//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
});

mongoose.connect("mongodb://127.0.0.1:27017/cv_generator_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors({ credentials: true, origin: true }));

//parse requests content type
app.use(express.json());
//parse request of content-type
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/auth", userRoutes);
app.use('/templates', verifyToken, Templates)

//API Endpoint for uploading file
app.post("/api/uploadFile",verifyToken, upload.single("myFile"),(req, res) => {
  console.log(req.file);
  res.status(200).send({"message":"file uploaded"})
});

// setup server to listen on port 3000
app.listen(3000, () => {
  console.log("server started " + 3000);
});