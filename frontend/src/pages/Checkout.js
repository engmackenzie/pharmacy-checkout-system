import { React, useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import AddItem from "../components/AddItem";

import '../styles/checkout.css';


const Home = props => {
  const [posts, setPosts] = useState([]);
  let [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  // const onCreatePost = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/posts", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": localStorage.getItem('token')
  //       }
  //     });

  //     if (response.status === 200) {
  //       const data = await response.json();
  //       setPosts(data.data);
  //     }
  //   } catch(err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
    
  // }, []);
  useEffect(() => {
    if (!token) {
      console.log(token);
      props.setIsSignedIn(false);
    }
  }, []);

  return (
    <>
      <NavBar heading="Checkout" ></NavBar>
      <div className="container">
        <AddItem ></AddItem>
        {/* <ListPosts posts={posts} onDelete={onCreatePost} loading={loading} setLoading={setLoading}></ListPosts> */}
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
