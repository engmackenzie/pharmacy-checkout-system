import { React, useEffect } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import AddItem from "../components/AddItem";

import '../styles/checkout.css';


const Checkout = props => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      props.setIsSignedIn(false);
    }
  }, []);

  return (
    <>
      <NavBar heading="Checkout" setIsSignedIn={props.setIsSignedIn}></NavBar>
      <div className="container">
        <AddItem ></AddItem>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Checkout;
