import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import baseUrl from "../config/config";
import '../styles/items.css'

const Items = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [quantity, setQuantity] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const [color] = useState("#ffffff");
  const [editingItem, setEditingItem] = useState(null); // new state variable for editing
  const token = localStorage.getItem('token');

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!itemName || !itemDesc || !itemPrice || !quantity) {
      toast.warning("Please fill in all fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: itemName,
          desc: itemDesc,
          price: itemPrice,
          quantity: quantity,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success(data.message || "Item created successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setItemName("");
        setItemDesc("");
        setItemPrice(0);
        setQuantity(0);

        getItems(); // Refresh the items list

      } else {
        toast.error(data.message || "Failed to create item", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to create item", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemDesc(item.desc);
    setItemPrice(item.price);
    setQuantity(item.quantity);
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!itemName || !itemDesc || !itemPrice || !quantity) {
      toast.warning("Please fill in all fields", {
        // ...
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/items/${editingItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: itemName,
          desc: itemDesc,
          price: itemPrice,
          quantity: quantity,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message || "Item updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setItemName("");
        setItemDesc("");
        setItemPrice(0);
        setQuantity(0);
        setEditingItem(null); // reset the editing state
        getItems(); // Refresh the items list
      } else {
        toast.error(data.message || "Failed to update item", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to update item", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));

      const response = await fetch(`${baseUrl}/items/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        toast.success(data.message || "Item deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
  
        // Remove the deleted item from the list
        setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      } else {
        toast.error(data.message || "Failed to delete item", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete item", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const confirmDeleteItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      handleDeleteItem(itemId);
    }
  };  
  
  const getItems = async () => {
    try {
      const response = await fetch(`${baseUrl}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setItems(data.data);
      } else {
        toast.error(data.message || "Action was unsuccessful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setItems([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetch items
    getItems();
  }, []);

  return (
    <div className="items">
      {isLoading && (
        <div className="loading-overlay">
          <ClipLoader
            color={color}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="loader"
          />
        </div>
      )}
      <ToastContainer />
      <h2>Create Item</h2>
      <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="item-form" >
        <label htmlFor="itemName">Name</label>
        <input
          type="text"
          id="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />

        <label htmlFor="itemDesc">Description</label>
        <input
          type="text"
          id="itemDesc"
          value={itemDesc}
          onChange={(e) => setItemDesc(e.target.value)}
        />

        <label htmlFor="itemPrice">Price</label>
        <input
          type="number"
          id="itemPrice"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />

      <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button type="submit">{editingItem ? "Update Item" : "Add Item"}</button>
      </form>

      <h2>All Items</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button id="edit" onClick={() => handleEditItem(item)}>Edit</button>

                  <button id="delete" onClick={() => confirmDeleteItem(item._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="noItems">
              <td colSpan="4">No items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
