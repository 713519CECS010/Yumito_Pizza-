import { Pizza } from "./Pizza.js";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../globalconstant.js";

export function Pizzalist() {
  const history = useHistory();
  const [pizzas, setpizzas] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/pizzas`)
      .then((data) => data.json())
      .then((pizzas) => setpizzas(pizzas));
  }, []);
  const Username = localStorage.getItem("Username");
  if (!Username) {
    history.push("/");
  }
  return (
    <div className="pizzas-list" >
      {pizzas && pizzas.length < 0 ? (
        <Loader />
      ) : (
        pizzas.map((pizza, index) => <Pizza pizza={pizza} key={index} />)
      )}
      {/* {pizzas.map((pizza) => (
        <Pizza pizza={pizza} />
      ))} */}
    </div>
  );
}
export function Loader() {
  const [open] = useState(true);
  return (
    <div className="loading">
      <Backdrop
        sx={{ color: "black", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}
