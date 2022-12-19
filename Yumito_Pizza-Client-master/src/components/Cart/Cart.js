import React, { useState, useEffect } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import { API_URL } from "../../globalconstant.js";
import DeleteIcon from "@mui/icons-material/Delete";
import { Cartproduct } from "./Cartproduct.js";
import { useHistory } from "react-router-dom";

export function Cart() {
  const history = useHistory();
  const [switchedit, setswitchedit] = useState(0);
  const data = JSON.parse(localStorage.getItem("user"));
  const username = localStorage.getItem("Username");
  // const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart"));
  const id = data._id;
  const [products, setproducts] = useState();
  const getProducts = () => {
    fetch(`${API_URL}/pizzas/add-to-cart`, {
      method: "GET",
      headers: { "x-auth-token": id },
    })
      .then((data) => data.json())
      .then((cart) => {
        // console.log(cart);
        localStorage.removeItem("cart");
        localStorage.removeItem("includestax");
        setproducts(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      });
  };
  useEffect(getProducts, [id]);

  const removefrom = (_id) => {
    console.log(_id);
    fetch(`${API_URL}/pizzas/product/${_id}`, {
      method: "DELETE",
    }).then(() => getProducts());
  };
  const getamount = () => {
    Total();
    setswitchedit(1);
  };
  const Total = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(cart);
    // console.log(typeof cart);
    return cart
      ? cart
          .map((product) => product.totalamount)
          .reduce((curr, sum) => sum + curr, 0)
      : 0;
  };
  // console.log(Total());
  // const [open, setopen] = useState(false);
  const includestax = Total() + 14 / 100 + (4.5 / 100) * Total();
  const totalAmount = Math.round(includestax);
  let date = new Date();
  //   // replace "/" with "."
  //   // toUTCString is a method to get a timestamp
  date = date.toISOString();
  const onSubmit = () => {
    const data = {
      username: username,
      products: cart,
      amountPaid: totalAmount,
      datePaid: date,
    };
    // console.log(data);
    fetch(`${API_URL}/pizzas/payment`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((datas) => {
        // console.log(datas);
        displayRazorpay(datas);
        localStorage.removeItem("cart");
      });
  };
  async function displayRazorpay(datas) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay sdk failed to load.Are you online");
      return;
    }

    // const data1 = JSON.parse(localStorage.getItem("order"));
    // const data = data1.data;
    // // console.log(data1);
    const options = {
      key: "rzp_test_wt6S48PF3wQ702",
      amount: datas.amount,
      currency: "INR",
      name: "King Cars",
      description: "Booking Transaction",
      image:
        "https://image.shutterstock.com/z/stock-vector-king-car-logo-design-template-vector-illustration-466912277.jpg",
      order_id: datas.id,
      prefill: {
        name: username,
        contact: data.phoneno,
        email: data.email,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setTimeout(() => history.push("/menu"), 20000);
  }
  return products ? (
    <section className="cart-list">
      <Typography variant="h2" sx={{ fontFamily: "Xuno" }}>
        My Cart🛒
      </Typography>
      <div className="cart-page">
        <div className="cartpage" style={{height:'min-content'}}>
          {products.map(
            ({ productname, _id, image, varient, quantity, price }) => (
              <Cartproduct
                key={_id}
                _id={_id}
                productname={productname}
                image={image}
                varient={varient}
                quantity={quantity}
                price={price}
                deleteButton={
                  <IconButton
                    onClick={() => removefrom(_id)}
                    className="movie-show-button"
                    color="error"
                    aria-label="delete movie"
                    style={{marginLeft:'auto'}}
                  >
                   
                    <DeleteIcon />
                  </IconButton>
                }
              />
            )
          )}
        </div>
        <div className="total">
          {switchedit === 0 && (
            <div>
              <Typography variant="h2">Order confirmation:</Typography>
              <Button
                variant="contained"
                color="info"
                onClick={() => getamount()}
              >
                Place Order
              </Button>
            </div>
          )}
          {switchedit === 1 && (
            <div>
              <Typography variant="h2">Amount:</Typography>
              <Typography variant="h6">subtotal: {Total()}</Typography>
              <Typography variant="h6">
                Tax:{(14 / 100 + (4.5 / 100) * Total()).toFixed(2)}
              </Typography>
              <Typography variant="h6">
                Total:{14 / 100 + (4.5 / 100) * Total() + Total()}
              </Typography>
              <Button
                onClick={() => {
                  onSubmit();
                }}
                variant="contained"
                color="warning"
                style={{margin:'20px'}}
              >
                Pay Now
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  setswitchedit(0);
                  window.location.reload();
                }}
              >
                Edit Order
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  ) : (
    <h3>No Items in your cart.please start shopping</h3>
  );
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
