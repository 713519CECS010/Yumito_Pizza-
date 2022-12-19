import * as React from "react";
import { Typography, IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { API_URL } from "../../globalconstant.js";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";

export function OrderHistory() {
  const [orders, setorders] = useState("");
  const token = localStorage.getItem("token");
  //   console.log(token);
  const getorders = () => {
    fetch(`${API_URL}/pizzas/orderhistory`, {
      method: "GET",
      headers: { "x-auth-token": token },
    })
      .then((data) => data.json())
      .then((x) => setorders(x));
  };
  useEffect(getorders, [token]);
  return orders ? <OrdersList orders={orders} /> : "";
}

function OrdersList({ orders }) {
  const [open, setOpen] = React.useState(false);
  const [Msg, setMsg] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // console.log(customers);
  const deletecustomer = (_id) => {
    fetch(`${API_URL}/pizzas/order/${_id}`, {
      method: "DELETE",
    }).then(() => {
      setOpen(true);
      setMsg({ msg: "order history Deleted successfully", status: "success" });
      window.location.reload();
    });
  };
  return (
    <section className="orderhistory">
      <Typography variant="h3" sx={{ fontFamily: "Aladin" }}>
        Order History
      </Typography>
      {orders.length === 0 ? (
        <div>
          <img
            src="https://cdn.dribbble.com/users/3956545/screenshots/15463522/0311.jpg"
            alt="nothing"
            height="200"
            width="200"
          />
          <br />
          <Typography variant="h6">
            No pizzas are ordered yet.please order some pizzas to order history
          </Typography>
        </div>
      ) : (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "gray" }}>
                  <TableCell>Date of pizza ordered</TableCell>
                  <TableCell align="center">Pizza Name</TableCell>
                  <TableCell align="center">Amount paid</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(
                  ({ datePaid, products, amountPaid, _id }, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {datePaid}
                      </TableCell>
                      <TableCell align="center">
                        {products.map((product) => product.productname)}
                      </TableCell>
                      <TableCell align="center">
                        ₹{amountPaid.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        {
                          <IconButton onClick={() => deletecustomer(_id)}>
                            <DeleteIcon style={{ color: "#d32f2f" }} />
                          </IconButton>
                        }
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
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
    </section>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
