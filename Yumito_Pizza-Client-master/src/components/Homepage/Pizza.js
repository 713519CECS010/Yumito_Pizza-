import React, { useState } from "react";
import { Button, Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { API_URL } from "../../globalconstant.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export function Pizza({ pizza, index }) {
  const [open, setOpen] = useState(false);
  const [Msg, setMsg] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const [quantity, setquantity] = useState(1);
  const [varient, setvarient] = useState("small");
  const username = localStorage.getItem("Username");
  const total = pizza.prices[0][varient] * quantity;
  const addtocart = (pizza, varient, quantity) => {
    const price = pizza.prices[0][varient];
    const data = {
      productname: pizza.name,
      image: pizza.image,
      varient: varient,
      quantity: quantity,
      price: price,
      totalamount: quantity * price,
      username: username,
    };
    // console.log(data);
    fetch(`${API_URL}/pizzas/add-to-cart`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200) {
        setMsg({ msg: "added to cart successfully", status: "success" });
        setOpen(true);
      }
    });
  };
  return (
    <Card
      key={index}
      sx={{
        display:'flex',
        flexWrap:'wrap',
        maxWidth: "400px",
        width:'300px',
        padding: "5px",
        margin: "10px",
        backgroundColor: "#f3f0f0",
        borderRadius: "15px",
      }}
    >
      <h2 style={{marginLeft:'20px'}}>{pizza.name}</h2>
      <div className="text-center" style={{width:'300px'}}>
        <div className="img-container">
          <img
            src={pizza.image}
            className="img-fluid"
            style={{ height: "200px", width: "200px" }}
            alt={pizza.name}
          />
        </div>
        <div className="flex-container">
          <div className="varients">
            {/* <Typography varient="h6">Varients : </Typography> */}
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select">varient</InputLabel>
              <Select
                id="demo-simple-select"
                value={varient}
                // label="varient"
                onChange={(e) => {
                  setvarient(e.target.value);
                }}
              >
                {pizza.varients.map((varient) => {
                  return <MenuItem value={varient}>{varient}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>

          <div className="quantity">
            {/* <Typography varient="h6">Quantity : </Typography> */}
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select">Quantity</InputLabel>
              <Select
                // label="Quantity"
                value={quantity}
                onChange={(e) => {
                  setquantity(e.target.value);
                }}
              >
                {[...Array(10).keys()].map((x, i) => {
                  return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flexcontainer">
          <Typography variant="h5">Price: {total} Rs/-</Typography>
          <Button
            size="medium"
            variant="contained"
            onClick={() => addtocart(pizza, varient, quantity)}
            style={{margin:20}}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={Msg.status}
          sx={{ width: "100%" }}
        >
          {Msg.msg}
        </Alert>
      </Snackbar>
    </Card>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
