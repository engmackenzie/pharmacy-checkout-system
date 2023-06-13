import { React, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import swal from 'sweetalert';
import '../styles/login.css';


const SignupPage = props => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
      // if (localStorage.getItem('token')) {
      //   props.onLogin();
      //   navigate('/');
      // }
    }
  );

  const handleSubmit = async e => {
    e.preventDefault();
    if (confirmPassword !== password) {
      swal({
        title: "Error",
        text: 'Entered passwords do not match',
        icon: "warning"
      });
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();

      if (response.status === 201) {
        swal({
          title: "Success",
          text: 'Account creation successful, login',
          icon: "success"
        });
        navigate("/login");
      } else {
        swal({
          title: "Error",
          text: data.message,
          icon: "error"
        });
      }
    } catch (error) {
      swal({
        title: "Error",
        text: error.message,
        icon: "error"
      });
      console.log(error);
    }
  };
  return (
    <section className="loginContainer">
      <div className="innerDiv">
        <h1 className="title">Sign Up</h1>
        <form onSubmit={handleSubmit}>
        <label className="label" htmlFor="username">
            Name
          </label>
          <input 
            className="input" 
            type="text" 
            id="name" 
            name="name" 
            value={name} 
            required
            onChange={e => setName(e.target.value)}
          />

          <label className="label" htmlFor="username">
            Email
          </label>
          <input 
            className="input" 
            type="email" 
            id="email" 
            name="email" 
            value={email}
            required
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

          <label className="label" htmlFor="password">
            Confirm Password
          </label>
          <input 
            className="input" 
            type="password" 
            id="confirmPassword" 
            name="ConfirmPassword" 
            value={confirmPassword} 
            onChange={e => setConfirmPassword(e.target.value)}
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
          <small>Already have an account? 
            <Link to="/login"> Login</Link>
          </small>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;