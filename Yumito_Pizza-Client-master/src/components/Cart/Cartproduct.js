import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import { API_URL } from "../../globalconstant.js";

function Cartproduct({
  _id,
  productname,
  image,
  varient,
  quantity,
  price,
  deleteButton,
}) {
  const [Quantity, setQuantity] = useState(quantity);
  const Price = Quantity * price;

  const onAdd = (_id) => {
    setQuantity(Quantity + 1);
    const cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(cart);
    cart.map(function (item, index) {
      var idx = -1;
      if (item._id === _id) {
        idx = index;
      }
      if (idx !== -1) {
        // console.log(cart[index].quantity);
        cart[index].quantity = parseInt(Quantity) + 1;
        cart[index].totalamount = cart[index].quantity * cart[index].price;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      return console.log(cart);
    });
  };

  const onSub = (_id) => {
    setQuantity(Quantity - 1);
    const cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(cart);
    cart.map(function (item, index) {
      var idx = -1;
      if (item._id === _id) {
        idx = index;
      }
      if (idx !== -1) {
        // console.log(cart[index].quantity);
        cart[index].quantity = parseInt(Quantity) - 1;
        cart[index].totalamount = cart[index].quantity * cart[index].price;
      }
      console.log(cart);
      return localStorage.setItem("cart", JSON.stringify(cart));
    });
  };
  return (
    <Card sx={{ width: 200, margin: "10px" }}>
      <img
        src={image}
        className="img-fluid"
        style={{ height: "200px", width: "200px" }}
        alt={productname}
      />
      <CardContent>
        <Typography variant="h6" style={{fontWeight:'bold'}}>{productname}</Typography>
        <Typography variant="h6" ><span style={{fontWeight:'bold'}}>Size:</span> {varient}</Typography>
        <Typography variant="h6"><span style={{fontWeight:'bold'}}>Price:</span>{Price}</Typography>
      </CardContent>
      <CardActions className="details">
      <IconButton onClick={() => onSub(_id)}>-</IconButton>
        
        <Typography variant="h6">{Quantity}</Typography>
        <IconButton onClick={() => onAdd(_id)}>+</IconButton>
       
        {deleteButton}
      </CardActions>
    </Card>
  );
}

export { Cartproduct };
