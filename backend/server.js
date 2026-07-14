
const express=require("express");
const cors=require("cors");
const multer=require("multer");

const app=express();

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));

let users=[
{
name:"Admin",
email:"admin@gmail.com",
password:"1234",
role:"admin"
}
];

let videos=[];
let notes=[];
let assignments=[];
let quizzes=[];

const storage=multer.diskStorage({
destination:(req,file,cb)=>{
cb(null,"uploads/");
},
filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname);
}
});

const upload=multer({storage});

app.post("/register",(req,res)=>{

const exists=users.find(
u=>u.email===req.body.email
);

if(exists){
return res.status(400).json({
message:"User already exists"
});
}

users.push(req.body);

res.json({
message:"Registered Successfully"
});
});

app.post("/login",(req,res)=>{

const user=users.find(
u=>u.email===req.body.email &&
u.password===req.body.password
);

if(!user){
return res.status(401).json({
message:"Invalid Login"
});
}

res.json(user);
});

app.post("/upload-video",upload.single("video"),(req,res)=>{

videos.push({
title:req.body.title,
file:req.file.filename
});

res.json({
message:"Video Uploaded"
});
});

app.get("/videos",(req,res)=>{
res.json(videos);
});

app.post("/upload-note",upload.single("note"),(req,res)=>{

notes.push({
title:req.body.title,
file:req.file.filename
});

res.json({
message:"Note Uploaded"
});
});

app.get("/notes",(req,res)=>{
res.json(notes);
});

app.post("/assignment",(req,res)=>{

assignments.push(req.body);

res.json({
message:"Assignment Added"
});
});

app.get("/assignments",(req,res)=>{
res.json(assignments);
});

app.post("/quiz",(req,res)=>{

quizzes.push(req.body);

res.json({
message:"Quiz Added"
});
});

app.get("/quizzes",(req,res)=>{
res.json(quizzes);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Ultimate LMS Running on port ${PORT}`);
});
