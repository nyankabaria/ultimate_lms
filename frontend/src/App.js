
import React,{useEffect,useState} from "react";

function App(){

const [page,setPage]=useState("home");

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [name,setName]=useState("");
const [role,setRole]=useState("student");

const [user,setUser]=useState(null);

const [video,setVideo]=useState(null);
const [videoTitle,setVideoTitle]=useState("");

const [note,setNote]=useState(null);
const [noteTitle,setNoteTitle]=useState("");

const [assignment,setAssignment]=useState("");
const [quiz,setQuiz]=useState("");

const [videos,setVideos]=useState([]);
const [notes,setNotes]=useState([]);
const [assignments,setAssignments]=useState([]);
const [quizzes,setQuizzes]=useState([]);

useEffect(()=>{
loadData();
},[]);

const loadData=async()=>{

const v=await fetch("http://localhost:5000/videos");
setVideos(await v.json());

const n=await fetch("http://localhost:5000/notes");
setNotes(await n.json());

const a=await fetch("http://localhost:5000/assignments");
setAssignments(await a.json());

const q=await fetch("http://localhost:5000/quizzes");
setQuizzes(await q.json());
};

const register=async()=>{

const response=await fetch(
"http://localhost:5000/register",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
email,
password,
role
})
}
);

const data=await response.json();

alert(data.message);

setPage("login");
};

const login=async()=>{

const response=await fetch(
"http://localhost:5000/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
}
);

const data=await response.json();

if(data.role){
setUser(data);
setPage("dashboard");
}else{
alert(data.message);
}
};

const uploadVideo=async()=>{

const formData=new FormData();

formData.append("title",videoTitle);
formData.append("video",video);

await fetch(
"http://localhost:5000/upload-video",
{
method:"POST",
body:formData
}
);

alert("Video Uploaded");

loadData();
};

const uploadNote=async()=>{

const formData=new FormData();

formData.append("title",noteTitle);
formData.append("note",note);

await fetch(
"http://localhost:5000/upload-note",
{
method:"POST",
body:formData
}
);

alert("Note Uploaded");

loadData();
};

const addAssignment=async()=>{

await fetch(
"http://localhost:5000/assignment",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
text:assignment
})
}
);

alert("Assignment Added");

loadData();
};

const addQuiz=async()=>{

await fetch(
"http://localhost:5000/quiz",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
question:quiz
})
}
);

alert("Quiz Added");

loadData();
};

return(

<div>

<nav className="nav">

<h2>ULTIMATE LMS</h2>

<div>

<button onClick={()=>setPage("home")}>Home</button>

<button onClick={()=>setPage("about")}>About</button>

<button onClick={()=>setPage("contact")}>Contact</button>

<button onClick={()=>setPage("help")}>Help</button>

<button onClick={()=>setPage("login")}>Login</button>

<button onClick={()=>setPage("register")}>Register</button>

</div>

</nav>

{page==="home" && (

<div className="page">

<h1>WELCOME TO THE ULTIMATE LMS</h1>

<p>
This Learning Management System allows students,
teachers and administrators to interact professionally online.
Students can watch videos, download notes, attempt quizzes,
submit assignments and access online learning resources globally.
</p>

<h2>Latest Uploads</h2>

<ul>

<li>
<button onClick={()=>setPage("login")}>
Latest Videos (Login Required)
</button>
</li>

<li>
<button onClick={()=>setPage("login")}>
Latest Notes (Login Required)
</button>
</li>

<li>
<button onClick={()=>setPage("login")}>
Latest Assignments (Login Required)
</button>
</li>

</ul>

<footer>
<p>Ultimate LMS © 2026</p>
</footer>

</div>

)}

{page==="about" && (

<div className="page">

<h1>About Courses</h1>

<p>
Courses include technology, programming,
network engineering, cybersecurity,
electronics and online digital learning.
</p>

<footer>
<p>Ultimate LMS © 2026</p>
</footer>

</div>

)}

{page==="contact" && (

<div className="page">

<h1>Contact Us</h1>

<p>Email: support@lms.com</p>

<p>Phone: +254700000000</p>

<footer>
<p>Ultimate LMS © 2026</p>
</footer>

</div>

)}

{page==="help" && (

<div className="page">

<h1>Help Center</h1>

<p>
Teachers upload videos, notes, quizzes and assignments.
Students login to access learning materials.
</p>

<footer>
<p>Ultimate LMS © 2026</p>
</footer>

</div>

)}

{page==="login" && (

<div className="card">

<h1>Login</h1>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={login}>
Login
</button>

</div>

)}

{page==="register" && (

<div className="card">

<h1>Register</h1>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<select onChange={(e)=>setRole(e.target.value)}>

<option value="student">
Student
</option>

<option value="teacher">
Teacher
</option>

</select>

<button onClick={register}>
Register
</button>

</div>

)}

{page==="dashboard" && user && (

<div className="page">

<h1>{user.role.toUpperCase()} DASHBOARD</h1>

{(user.role==="teacher" || user.role==="admin") && (

<div className="card">

<h2>Upload Video</h2>

<input
placeholder="Video Title"
onChange={(e)=>setVideoTitle(e.target.value)}
/>

<input
type="file"
accept="video/*"
onChange={(e)=>setVideo(e.target.files[0])}
/>

<button onClick={uploadVideo}>
Upload Video
</button>

<h2>Upload Notes</h2>

<input
placeholder="Note Title"
onChange={(e)=>setNoteTitle(e.target.value)}
/>

<input
type="file"
accept=".pdf,.doc,.docx"
onChange={(e)=>setNote(e.target.files[0])}
/>

<button onClick={uploadNote}>
Upload Notes
</button>

<h2>Add Assignment</h2>

<textarea
onChange={(e)=>setAssignment(e.target.value)}
></textarea>

<button onClick={addAssignment}>
Add Assignment
</button>

<h2>Add MCQ Quiz</h2>

<textarea
placeholder="Enter MCQ Question"
onChange={(e)=>setQuiz(e.target.value)}
></textarea>

<button onClick={addQuiz}>
Add Quiz
</button>

</div>

)}

<div className="card">

<h2>Videos</h2>

{videos.map((v,i)=>(

<div key={i}>

<p>{v.title}</p>

<a
href={`http://localhost:5000/uploads/${v.file}`}
target="_blank"
rel="noreferrer"
>
Watch Video
</a>

</div>

))}

</div>

<div className="card">

<h2>Notes</h2>

{notes.map((n,i)=>(

<div key={i}>

<p>{n.title}</p>

<a
href={`http://localhost:5000/uploads/${n.file}`}
download
>
Download Note
</a>

</div>

))}

</div>

<div className="card">

<h2>Assignments</h2>

{assignments.map((a,i)=>(

<div key={i}>
<p>{a.text}</p>
</div>

))}

</div>

<div className="card">

<h2>MCQ Quizzes</h2>

{quizzes.map((q,i)=>(

<div key={i}>
<p>{q.question}</p>
</div>

))}

</div>

<footer>
<p>Ultimate LMS © 2026</p>
</footer>

</div>

)}

</div>

);
}

export default App;
