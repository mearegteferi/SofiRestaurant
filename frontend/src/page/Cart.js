import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const stripe = useStripe();
  const elements = useElements();
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const cartItem = productCartItem.map((item) => {
    return{
        name: item.name,
        qty: item.qty,
        price: item.price
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  //const orderdata = {data, cartItem, totalPrice, totalQty}
  const orderdata = {
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      phone: '123-456-7890',
    },
    cartItem: [
      { name: 'Product 1', price: 10.99, quantity: 2 },
      { name: 'Product 2', price: 19.99, quantity: 1 },
    ],
    totalPrice: 41.97,
    totalQty: 3,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchData = await fetch(
      `${process.env.REACT_APP_SERVER_DOMIN}/orderFood`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ orderdata}),
      }
    );

    const fetchRes = await fetchData.json();
console.log(data,cartItem,totalPrice,totalQty)
    console.log(fetchRes);
    toast(fetchRes.message);

    setData(() => {
      return {
        name: "",
        email: "",
        address: "",
        phone: "",
      };
    });
  };

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600">
        Your Cart Items
      </h2>

      {productCartItem[0] ? (
        <div className="my-4 flex gap-3">
          <div className="w-full max-w-3xl ">
            {productCartItem.map((el) => {
              return (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              );
            })}
          </div>
          <div className="w-full max-w-md  ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span> {totalPrice}
              </p>
            </div>
            <form
              className="bg-slate-200"
              onSubmit={handleSubmit}
              style={styles.form}
            >
              <h2 style={styles.heading}>Complete Your Purchase</h2>
              <div style={styles.formGroup}>
                <label style={styles.label}>Card details</label>
                <CardElement options={styles.cardElementOptions} />
              </div>
              {["name", "email", "address", "phone"].map((field) => (
                <div key={field} style={styles.formGroup}>
                  <label style={styles.label}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    onChange={handleChange}
                    value={data[field]}
                    style={styles.input}
                  />
                </div>
              ))}
              <button type="submit" style={styles.button}>
                Pay Now
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className="w-full max-w-sm" alt="" />
            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
          </div>
        </>
      )}
    </div>
  );
};
const styles = {
  form: {
    maxWidth: "400px",
    margin: "auto",
    fontFamily: "Helvetica, sans-serif",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    borderRadius: "8px",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "16px",
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "16px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "8px",
    boxSizing: "border-box",
    fontSize: "16px",
  },
  cardElementOptions: {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#6772e5",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
  },
};

export default Cart;
