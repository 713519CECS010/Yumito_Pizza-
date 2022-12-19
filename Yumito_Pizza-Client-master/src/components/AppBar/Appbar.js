import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
// import Drawer from "@mui/material/Drawer";
// import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useHistory } from "react-router";
// import Button from "@mui/material/Button";
import { IconButton, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

export function Appbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [Name] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const Open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  // console.log(user);
  if (!user) {
    history.push("/login");
  }
  return (
    <AppBar
      color="inherit"
      sx={{ backgroundColor: "#f5f5f5" }}
      position="static"
    >
      <Toolbar variant="dense">
        <img src={logo} alt="logo" className="logo" />
        <Typography
          sx={{ fontFamily: "Pacifico", fontSize: { xs: "18px", sm: "50px" } }}
        >
          Yumi<span style={{color:'red'}}>to</span>
        </Typography>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Contact</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tell us the query and We will send updates occasionally.
            </DialogContentText>
            <DialogTitle>Email: {user.email} </DialogTitle>

            <DialogContentText>
              Through email you can send your query.we can take actions on query
              in 24 hrs.
            </DialogContentText>
            <DialogTitle>Phone No:{user.phoneno}</DialogTitle>
            <DialogContentText>
              Through phone no you can call us to resolve your queries.
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {/* <Button
          // sx={{ display: { xs: "none", sm: "block" } }}
          onClick={() => history.push("/cart")}
          variant="text"
        >
          cart
        </Button> */}
        <IconButton
          sx={{ ml: "auto" }}
          className="avatar"
          onClick={handleClick}
          aria-controls={Open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={Open ? "true" : undefined}
        >
          <Avatar
            alt={Name ? Name : localStorage.getItem("Username")}
            src={user.logo}
          />
        </IconButton>
        {/* Popup Menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Open}
          onClose={handleClose1}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
          <MenuItem>
            <Typography>
              {Name ? Name : localStorage.getItem("Username")}
            </Typography>
          </MenuItem>

          <MenuItem onClick={() => history.push("/menu")}>Home</MenuItem>
          <MenuItem onClick={() => history.push("/cart")}>Cart</MenuItem>
          <MenuItem onClick={() => history.push("/orderhistory")}>
            Order History
          </MenuItem>
          <MenuItem onClick={handleClickOpen}>Contact us</MenuItem>
          <MenuItem onClick={() => history.push("/settings")}>
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.clear();
              window.location.reload(false);
              window.location.href = "/";
            }}
          >
            Log Out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
