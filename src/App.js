// import logo from './logo.svg';
// import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:5001/api/user")
    .then(res => res.json())
    .then(data => {
      setUsers(data)})
    .catch(err => console.error(err))
  },[]);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((u,i)=>(
          <li key ={i}>{u.name}</li>
        ))

        }
      </ul>
    </div>
  );
}

export default App;
