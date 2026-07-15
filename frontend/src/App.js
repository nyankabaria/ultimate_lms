import React, {useEffect, useState} from "react";
import "./App.css";

function App(){

const API="https://ultimate-lms.onrender.com";

const [page,setPage]=useState("home");

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [role,setRole]=useState("student");

const [user,setUser]=useState(
JSON.parse(localStorage.getItem("user")) || null
);

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

try{

let v=await fetch(`${API}/videos`);
setVideos(await v.json());


let n=await fetch(`${API}/notes`);
setNotes(await n.json());


let a=await fetch(`${API}/assignments`);
setAssignments(await a.json());


let q=await fetch(`${API}/quizzes`);
setQuizzes(await q.json());

}
catch(err){
console.log(err);
}

};



const register=async()=>{

let response=await fetch(
`${API}/api/auth/register`,
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
});


let data=await response.json();

alert(data.message);

if(response.ok){
setPage("login");
}

};



const login=async()=>{


let response=await fetch(
`${API}/api/auth/login`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
});


let data=await response.json();


if(response.ok){

setUser(data.user);

localStorage.setItem(
"user",
JSON.stringify(data.user)
);

localStorage.setItem(
"token",
data.token
);

setPage("dashboard");


}
else{

alert(data.message);

}

};





const uploadVideo=async()=>{

let form=new FormData();

form.append("title",videoTitle);
form.append("video",video);


await fetch(
`${API}/upload-video`,
{
method:"POST",
body:form
}
);


alert("Video Uploaded");

loadData();

};



const uploadNote=async()=>{


let form=new FormData();

form.append("title",noteTitle);
form.append("note",note);


await fetch(
`${API}/upload-note`,
{
method:"POST",
body:form
}
);


alert("Note Uploaded");

loadData();

};





const addAssignment=async()=>{


await fetch(
`${API}/assignment`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
text:assignment
})
});


alert("Assignment Added");

loadData();

};





const addQuiz=async()=>{


await fetch(
`${API}/quiz`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
question:quiz
})
});


alert("Quiz Added");

loadData();

};




const logout=()=>{

localStorage.clear();

setUser(null);

setPage("home");

};




return(

<div>


<h1>ULTIMATE LMS</h1>


<nav>

<button onClick={()=>setPage("home")}>
Home
</button>


<button onClick={()=>setPage("login")}>
Login
</button>


<button onClick={()=>setPage("register")}>
Register
</button>


{user &&
<button onClick={logout}>
Logout
</button>
}

</nav>





{page==="home" &&

<div>

<h2>
Welcome to Ultimate LMS
</h2>


<p>
Online learning platform for students and teachers.
</p>


</div>

}






{page==="register" &&

<div className="card">

<h2>
Register
</h2>


<input
placeholder="Name"
onChange={e=>setName(e.target.value)}
/>


<input
placeholder="Email"
onChange={e=>setEmail(e.target.value)}
/>


<input
type="password"
placeholder="Password"
onChange={e=>setPassword(e.target.value)}
/>


<select onChange={e=>setRole(e.target.value)}>

<option value="student">
Student
</option>

<option value="teacher">
Teacher
</option>

</select>


<button onClick={register}>
Create Account
</button>


</div>

}





{page==="login" &&

<div className="card">

<h2>
Login
</h2>


<input
placeholder="Email"
onChange={e=>setEmail(e.target.value)}
/>


<input
type="password"
placeholder="Password"
onChange={e=>setPassword(e.target.value)}
/>


<button onClick={login}>
Login
</button>


</div>

}






{page==="dashboard" && user &&

<div>


<h2>
{user.role} Dashboard
</h2>




{
(user.role==="admin" || user.role==="teacher") &&

<div className="card">


<h3>
Upload Video
</h3>


<input
placeholder="Title"
onChange={e=>setVideoTitle(e.target.value)}
/>


<input
type="file"
onChange={e=>setVideo(e.target.files[0])}
/>


<button onClick={uploadVideo}>
Upload
</button>





<h3>
Upload Notes
</h3>


<input
placeholder="Title"
onChange={e=>setNoteTitle(e.target.value)}
/>


<input
type="file"
onChange={e=>setNote(e.target.files[0])}
/>


<button onClick={uploadNote}>
Upload Note
</button>





<h3>
Assignment
</h3>

<textarea
onChange={e=>setAssignment(e.target.value)}
/>


<button onClick={addAssignment}>
Add Assignment
</button>



<h3>
Quiz
</h3>


<textarea
onChange={e=>setQuiz(e.target.value)}
/>


<button onClick={addQuiz}>
Add Quiz
</button>


</div>

}





<h3>
Videos
</h3>

{
videos.map((v,i)=>

<p key={i}>

<a
href={`${API}/uploads/${v.file}`}
target="_blank"
rel="noreferrer"
>
{v.title}
</a>

</p>

)
}




<h3>
Notes
</h3>


{
notes.map((n,i)=>

<p key={i}>

<a
href={`${API}/uploads/${n.file}`}
download
>
{n.title}
</a>

</p>

)
}



<h3>
Assignments
</h3>

{
assignments.map((a,i)=>

<p key={i}>
{a.text}
</p>

)
}




<h3>
Quizzes
</h3>

{
quizzes.map((q,i)=>

<p key={i}>
{q.question}
</p>

)
}



</div>

}



</div>

);


}

export default App;
