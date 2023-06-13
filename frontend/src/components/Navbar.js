import React from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const NavBar = props => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('data'));

  return (
    <nav>
      <ul>
        <li id="feed">{props.heading}</li>
        <li>
          <FontAwesomeIcon icon={faUser} />
          <span>
            Admin
          </span>
        </li>
        
      </ul>
    </nav>
  );
};

export default NavBar;
