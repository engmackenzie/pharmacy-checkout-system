import React from "react";
import '../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const NavBar = props => {
  const userData = JSON.parse(localStorage.getItem('data'));

  const handleLogout = () => {
    localStorage.clear();
    props.setIsSignedIn(false);
  };

  return (
    <nav>
      <ul>
      <li>
          <FontAwesomeIcon icon={faUser} />
          <span>
           {userData.firstname + ' ' + userData.lastname + ` (${userData.roleName})`}
          </span>
        </li>
        <li id="feed">{props.heading}</li>
        
        <li id="logout">
          <button onClick={() => {handleLogout()}}>
            Logout
          </button>
        </li>
        
      </ul>
    </nav>
  );
};

export default NavBar;
