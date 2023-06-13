import React, { useState } from "react";

const AddItem = props => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [noOfItems, setNoOfItems] = useState(0);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  //const [options, setOptions] = useState([]);

  const options = [
    { value: "", label: "Select a value" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" }
  ]
 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (noOfItems < 1) return;
    console.log(cart)
    let currentCart = cart;
    setCart(currentCart.push({item: item, price: price, noOfItems: noOfItems, subTotal: price * noOfItems }));
    console.log(cart)
    // props.setLoading(true);
    // try {
    //   const response = await fetch("http://localhost:5000/api/posts", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": localStorage.getItem('token')
    //     },
    //     body: JSON.stringify({ title, description })
    //   });
    //   const data = await response.json();

    //   if (response.status === 201) {
    //     setTitle("");
    //     setDescription("");
    //     swal({
    //       title: "Success",
    //       text: 'Post created successfully!',
    //       icon: "success"
    //     });
    //   } else {
    //     swal({
    //       title: "Error",
    //       text: data.message,
    //       icon: "warning"
    //     });
    //   }
    // } catch (error) {
    //   swal({
    //     title: "Error!",
    //     text: error.message,
    //     icon: "error"
    //   });
    //   console.error("Error creating :", error);
    // } finally {
    //   props.onCreatePost();
    //   props.setLoading(false);
    // }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="createItem">
          <div className="itemInputGroup">
            <label>
              Item
            </label>
            <select
              className=""
              value={item}
              onChange={e => setItem(e.target.value)}
            >
              {options.map((fruit) => <option value={fruit.value}>{fruit.label}</option>)}
            </select>
          </div>
          
          <div>
            <label>
                Price
              </label>
            <input 
              type="text"
              id="price"
              name="price"
              className=""
              disabled
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label>
                No. of Items
            </label>
            <input 
              type="number"
              id="noOfItems"
              name="noOfItems"
              className=""
              value={noOfItems}
              onChange={e => setNoOfItems(e.target.value)}
            />
          </div>
          
          <button>
            Add To Cart
          </button>
        </div>
      </form>
    </>
  );
}

export default AddItem;
