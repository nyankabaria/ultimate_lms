require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");

const app = express();


// Connect Database
connectDB();


// Middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));


// Authentication routes
app.use("/api/auth", authRoutes);


// Temporary LMS storage
let videos = [];
let notes = [];
let assignments = [];
let quizzes = [];


// File Upload Setup
const storage = multer.diskStorage({

destination:(req,file,cb)=>{
    cb(null,"uploads/");
},

filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname);
}

});


const upload = multer({
    storage
});



// Upload Video
app.post("/upload-video",
upload.single("video"),
(req,res)=>{

videos.push({

title:req.body.title,

file:req.file.filename

});


res.json({

message:"Video Uploaded"

});


});



// Get Videos
app.get("/videos",(req,res)=>{

res.json(videos);

});




// Upload Notes
app.post("/upload-note",
upload.single("note"),
(req,res)=>{


notes.push({

title:req.body.title,

file:req.file.filename

});


res.json({

message:"Note Uploaded"

});


});



// Get Notes
app.get("/notes",(req,res)=>{

res.json(notes);

});




// Assignments

app.post("/assignment",
(req,res)=>{


assignments.push(req.body);


res.json({

message:"Assignment Added"

});


});


app.get("/assignments",
(req,res)=>{

res.json(assignments);

});




// Quiz

app.post("/quiz",
(req,res)=>{


quizzes.push(req.body);


res.json({

message:"Quiz Added"

});


});


app.get("/quizzes",
(req,res)=>{

res.json(quizzes);

});





const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

console.log(
`Ultimate LMS Running on port ${PORT}`
);

});
