import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseUrl from '../config/config';
import Cart from "./Cart";

const AddItem = props => {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('paid');
  const token = localStorage.getItem('token');


  const handleAddItem = (item) => {
    const itemInCart = (item) => {
      return cart.find((cartItem) => {
        return cartItem.itemId === item._id;
      });
    };
  
    const incrementNoOfItems = (item) => {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.itemId === item._id) {
          return {
            ...cartItem,
            noOfItems: cartItem.noOfItems + 1,
            subTotal: (cartItem.noOfItems + 1) * cartItem.unitPrice,
          };
        }
        return cartItem;
      });
  
      setCart(updatedCart);
    };
  
    if (itemInCart(item)) {
      incrementNoOfItems(item);
      console.log('----update', cart);
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          itemId: item._id,
          itemName: item.name,
          unitPrice: item.price,
          noOfItems: 1,
          subTotal: item.price,
        },
      ]);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    console.log('on checkout');
    if (cart.length < 1) {
      toast.warning('Your cart is empty', {
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
    try {
      const response = await fetch(`${baseUrl}/bills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({customerId: ' ', customerName, paymentMethod, paymentStatus, items: cart })
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success(data.message || 'Bill created successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(data.message || 'Failed to create bill', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };

    } catch(error) {
      console.log(error);
    }
    return;
  }

  const getItems = async () => {

    try {
      const response = await fetch(`${baseUrl}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.status === 200) {
        console.log(data)
        toast.info('Items loaded successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setItems(data.data);
      } else {
        toast.error(data.message || 'Action was unsuccessful', {
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
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // fetch items
    getItems();
  }, []);

  useEffect(() => {
    // console.log('cart updated')
  }, [cart]);

  return (
    <div className="createItem">
      <ToastContainer/>
      <div className="availableItems">
        <h2>ITEMS</h2>
        {
          items.map((item) => {
            return (
              <div key={item._id} className="item">
                <div>
                  {item.name}
                </div>
                <div>
                  {item.desc}
                </div>
                <div>
                  {item.price}
                </div>
                <div>
                  <button onClick={() => handleAddItem(item)}>
                    ADD
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>
      
      <Cart cart={cart}/>

      <form onSubmit={handleCheckout} className="checkoutForm">
        <label>Customer Name</label>
        <input 
          type="text"
          title="customerName"
          name="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        ></input>

        <label>Payment Method</label>
        <input 
          type="text"
          title="paymentMethod"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        ></input>   
        
        <div>
          <button>
            CHECKOUT
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItem;
