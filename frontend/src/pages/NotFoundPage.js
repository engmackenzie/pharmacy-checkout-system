import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/notfound.css';

const NotFoundPage = () => {
  return (
    <>
        <div className="not-found-container">
          <h1>404 Not Found</h1>
          <p>The page you're looking for does not exist.</p>
        </div>
      <Footer/>
    </>
  );
}

export default NotFoundPage;
