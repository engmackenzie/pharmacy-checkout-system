import { React, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';
import '../styles/login.css';


const ProfilePage = props => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const userData = JSON.parse(localStorage.getItem('data'));

  useEffect(() => {
      if (!localStorage.getItem('token')) {
        navigate('/login');
      } else {
        setEmail(userData.email);
        setName(userData.name);
        setPassword(userData.password);
        setConfirmPassword(userData.password);
      }
    }, []);

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
      const response = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();

      if (response.status === 201) {
        swal({
          title: "Success",
          text: 'Details update successful, please logout and login again',
          icon: "success"
        });
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
      <div className="">
          <small> 
            <Link to="/">
            <FontAwesomeIcon icon={faHouse} />
               {' '}Go back Home</Link>
          </small>
        </div>
        <h1 className="">Profile</h1>
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
                Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;