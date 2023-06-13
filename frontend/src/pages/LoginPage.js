import { React, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import swal from 'sweetalert';
import '../styles/login.css';


const LoginPage = props => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
      if (localStorage.getItem('token')) {
        props.onLogin();
        navigate('/');
      }
    }
  );

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.status === 200) {
        props.onLogin();
        console.log(data)
        localStorage.setItem('token', data.token);
        localStorage.setItem('data', JSON.stringify(data.data));
        navigate("/");
      } else {
        swal({
          title: "Error",
          text: data.message,
          icon: "error"
        });
        console.log("Error logging in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="loginContainer">
      <div className="innerDiv">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input 
            className="input" 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
          />

          <label className="label" htmlFor="password">
            Password
          </label>
          <input 
            className="input" 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
          <div id="loginButton">
            <button 
              style={{ marginTop: '10px' }}
              className="button" 
              type="submit">
                Submit
            </button>
          </div>
        </form>
        <div className="signupInfo">
          <small>Don't have an account? 
            <Link to="/signup"> Sign Up</Link>
          </small>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;