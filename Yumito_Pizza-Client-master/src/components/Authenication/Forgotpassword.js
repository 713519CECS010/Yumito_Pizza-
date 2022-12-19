import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { API_URL } from "../../globalconstant.js";

export function Forgotpassword() {
  const [open, setOpen] = React.useState(false);
  const [Msg, setMsg] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //   const history = useHistory();
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: formvalidationSchema,
      onSubmit: (email) => {
        // console.log(email);
        forgotpass(email);
      },
    });

  const forgotpass = (email) => {
    fetch(`${API_URL}/users/forgotpassword`, {
      method: "POST",
      body: JSON.stringify(email),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200) {
        setMsg({
          msg: "Verification link sent to the registered mail",
          status: "success",
        });
      } else {
        setMsg({ msg: "Mail is not registered", status: "error" });
      }
      // console.log(response);
      setOpen(true);
    });
  };

  return (
    <div className="forgotpage">
      <div className="brand">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Aladin",
            fontSize: { sm: "40px", xs: "28px" },
            color: "white",
          }}
        >
          Crunch & Munch
        </Typography>
      </div>
      <div className="formcontainer">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Roboto Condensed",
            fontSize: { sm: "40px", xs: "28px" },
          }}
        >
          Forgot Password
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontFamily: "Roboto Condensed",
            fontSize: "20px",
          }}
        >
          Please enter the registered mail to get the password reset link
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email}
            value={values.email}
            helperText={errors.email && touched.email && errors.email}
            name="email"
            id="email"
            label="Email"
            placeholder="Enter Email"
            fullWidth
            sx={{ margin: "5px" }}
          />
          <Button
            type="submit"
            variant="contained"
            className="signupfieldbutton"
            color="success"
          >
            Submit
          </Button>
        </form>
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
    </div>
  );
}
// formValidationSchema
const formvalidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter the valid email")
    .required("Required Field"),
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
