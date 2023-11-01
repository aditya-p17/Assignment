

import { useEffect, useState } from 'react';

function Form() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handleForm = (e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:8080/demo',{
      method:'POST',
      body:JSON.stringify(form),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await response.json();
   console.log(data);
  }

  const getUsers = async ()=>{
    const response = await fetch('http://localhost:8080/demo',{
      method:'GET',
    })
   const data = await response.json();
   setUsers(data);
  }

  useEffect(()=>{
    getUsers();
  },[])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label >Username</label>
        <input type="text"  className = "form-control" name="username" onChange={handleForm}></input>
        <label>Email</label>
        <input type="email" className = "form-control" name="email" onChange={handleForm}></input>
        <span>Phone Number</span>
        <input type="text" className = "form-control"  name="phoneno" onChange={handleForm} />
        <input type="submit" className="btn btn-primary"></input>
      </form>
      <div>
        <ul>
          {users.map(user=><li key={user._id}>{user.username} , {user.email} , {user.phoneno}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Form;
