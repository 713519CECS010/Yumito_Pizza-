import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useHistory } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import { API_URL } from "../../globalconstant.js";

export function Resetpassword() {
  const history = useHistory();
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [Msg, setMsg] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        password: "",
        confirmpassword: "",
        token: id,
      },
      validationSchema: formvalidationSchema,
      onSubmit: (updatepass) => {
        // console.log(updatepass);
        user(updatepass);
      },
    });
  const user = (updatepass) => {
    fetch(`${API_URL}/users/resetpassword`, {
      method: "POST",
      body: JSON.stringify(updatepass),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200) {
        setMsg({
          msg: "Password Changed Successfully",
          status: "success",
        });
        setOpen(true);
        history.push("/login");
      }
    });
  };
  return (
    <div className="resetpage">
      <div className="brand">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Aladin",
            fontSize: { sm: "35px", xs: "28px" },
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
            fontSize: { sm: "35px", xs: "28px" },
          }}
        >
          Update Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
            value={values.password}
            helperText={errors.password && touched.password && errors.password}
            name="password"
            id="password"
            label="password"
            placeholder="Enter password"
            fullWidth
            sx={{ margin: "5px" }}
          />
          <TextField
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmpassword && touched.confirmpassword}
            value={values.confirmpassword}
            helperText={
              errors.confirmpassword &&
              touched.confirmpassword &&
              errors.confirmpassword
            }
            name="confirmpassword"
            id="confirmpassword"
            label="confirmpassword"
            placeholder="Enter password"
            fullWidth
            sx={{ margin: "5px" }}
          />
          <Button
            type="submit"
            variant="contained"
            className="signupfieldbutton"
            color="success"
          >
            Confirm Password
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
          sx={{ width: "100vw" }}
        >
          {Msg.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
// formValidationSchema
const formvalidationSchema = Yup.object({
  password: Yup.string()
    .required("Please Enter your password")
    .min(8, "Too short password"),
  confirmpassword: Yup.string()
    .required("Please Enter your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
