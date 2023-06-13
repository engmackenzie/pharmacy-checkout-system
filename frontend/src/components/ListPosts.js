import React, {useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';
import ClipLoader from "react-spinners/ClipLoader";


import '../styles/home.css';

const ListPosts = props => {
  let [color] = useState("#ffffff");
  const userData = JSON.parse(localStorage.getItem('data'));

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const handleDelete = async (id) => {
    props.setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('token')
        }
      });
      
      if (response.status === 200) {
        swal({
          title: "Success",
          text: 'Delete successfully',
          icon: "success"
        });
        props.onDelete();
      }
    } catch(err) {
      swal({
        title: "Error",
        text: err.message,
        icon: "error"
      });
    } finally {
      props.setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    
  };

  return (
    <>
      <div className="postContainer">
        { props.loading ? 
          <ClipLoader
            color={color}
            loading={props.loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> :
          props.posts.map((post) => {
            return (
              <div key={post.id} className="post">
                <div className="toprow">
                  <span>{post.title}</span>
                  <small>{new Date(post.createdAt).toLocaleDateString('en-us', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}</small>  
                </div>
                <p>{post.description}</p>
                <div className="bottomrow">   
                  <small>{post.owner} {post.userId === userData.id ? ' (You)' : ''}</small>
                  <small>
                    <Link to={`/posts/${post.id}`}>
                      view comments
                    </Link>
                  </small>

                  <span className="edit">
                  {post.userId === userData.id ? 
                    <FontAwesomeIcon value={post.id} onClick={() => handleEdit(post.id)} icon={faPenToSquare} /> : 
                  ''}
                  </span>
                  <span className="deleteIt">
                    {post.userId === userData.id ? 
                    <FontAwesomeIcon value={post.id} onClick={() => handleDelete(post.id)} icon={faTrash} /> : 
                    ''}
                  </span>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  );
}

export default ListPosts;