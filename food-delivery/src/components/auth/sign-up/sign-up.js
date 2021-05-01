import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "utils/loader";
import { errorHelper } from "utils/errorHelper";

import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "store/actions/user.actions";
import { TextField, Button } from "@material-ui/core";
import { Label } from "@material-ui/icons";

const SignUp = (props) => {
  const notifications = useSelector((state) => state.notifications);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("FirstName is required"),
      lastName: Yup.string().required("LastName is required"),
      email: Yup.string()
        .required("Sorry the email is required")
        .email("This is an invalid email"),
      password: Yup.string().required("Sorry the password is required"),
      confirmPassword: Yup.string()
        .required()
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
          ),
        }),
    }),
    onSubmit: (values) => {
      setLoading(true);
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    dispatch(userSignIn(values));
  };

  useEffect(() => {
    if (notifications && notifications.success) {
      props.history.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [notifications, props.history]);

  return (
    <>
      <div className="sign-in_container">
        {loading ? (
          <Loader />
        ) : (
          <form className="mt-3 w-100" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label for="firstName">FirstName</label>
              <TextField
                style={{ width: "100%" }}
                name="firstName"
                label="Enter your FirstName"
                variant="outlined"
                {...formik.getFieldProps("firstName")}
                {...errorHelper(formik, "firstName")}
              />
            </div>
            <div className="form-group">
              <label for="lastName">LastName</label>
              <TextField
                style={{ width: "100%" }}
                name="lastName"
                label="Enter your LastName"
                variant="outlined"
                {...formik.getFieldProps("lastName")}
                {...errorHelper(formik, "lastName")}
              />
            </div>
            <div className="form-group">
              <label for="email">Email</label>
              <TextField
                style={{ width: "100%" }}
                name="email"
                label="Enter your email"
                variant="outlined"
                {...formik.getFieldProps("email")}
                {...errorHelper(formik, "email")}
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <TextField
                style={{ width: "100%" }}
                name="password"
                label="Enter your password"
                variant="outlined"
                type="password"
                {...formik.getFieldProps("password")}
                {...errorHelper(formik, "password")}
              />
            </div>
            <div className="form-group">
              <label for="confirmPassword">ConfirmPassword</label>
              <TextField
                style={{ width: "100%" }}
                name="confirmPassword"
                label="Repeat your password"
                variant="outlined"
                type="password"
                {...formik.getFieldProps("confirmPassword")}
                {...errorHelper(formik, "confirmPassword")}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="small"
            >
              {props.formType ? "Register" : "Login"}
            </Button>
          </form>
        )}
      </div>
    </>
    // <Formik
    //   initialValues={{
    //     email: "",
    //     firstName: "",
    //     lastName: "",
    //     password: "",
    //     repeatePassword: "",
    //   }}
    //   validate={(values) => {
    //     const errors = {};
    //     if (values.email.touched && !values.email) {
    //       errors.email = "email is required";
    //     } else if (
    //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    //     ) {
    //       errors.email = "Invalid email address";
    //     }
    //     if (values.firstName.touched && !values.firstName)
    //       errors.firstName = "firstName is required";

    //     if (values.lastName.touched && !values.lastName)
    //       errors.lastName = "lastName is required";

    //     if (values.password.touched && !values.password)
    //       errors.password = "password is required";

    //     if (
    //       values.repeatePassword.touched &&
    //       values.password != values.repeatePassword
    //     )
    //       errors.repeatePassword = "repeat password doesn't to match password";
    //   }}
    //   onSubmit={(values) => {
    //     debugger;
    //     console.log(values);
    //     axios.post("https://localhost:44369/Account/sign-upss", values);
    //   }}
    // >
    //   {({
    //     values,
    //     errors,
    //     touched,
    //     handleChange,
    //     handleBlur,
    //     handleSubmit,
    //     isSubmitting,
    //   }) => (
    //     <form action="action_page.php" style={{ border: "1px solid #ccc" }}>
    //       <div className="container">
    //         <h1>Sign Up</h1>
    //         <p>Please fill in this form to create an account.</p>
    //         {errors.email}
    //         {errors.firstName}
    //         {errors.lastName}
    //         {errors.password}
    //         {errors.repeatePassword}

    //         <hr></hr>

    //         <label for="email">
    //           <b>Email</b>
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Enter Email"
    //           name="email"
    //           value={values.email}
    //           required
    //         ></input>

    //         <label for="firstName">
    //           <b>FirstName</b>
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Enter Email"
    //           name="firstName"
    //           value={values.firstName}
    //           required
    //         ></input>

    //         <label for="lastName">
    //           <b>FirstName</b>
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Enter Email"
    //           name="lastName"
    //           value={values.lastName}
    //           required
    //         ></input>

    //         <label for="password">
    //           <b>Password</b>
    //         </label>
    //         <input
    //           type="password"
    //           placeholder="Enter Password"
    //           name="password"
    //           value={values.password}
    //         ></input>
    //         <label for="repeatePassword">
    //           <b>Repeat Password</b>
    //         </label>
    //         <input
    //           type="password"
    //           placeholder="Repeat Password"
    //           name="repeatePassword"
    //           value={values.repeatePassword}
    //         ></input>

    //         <p>
    //           By creating an account you agree to our{" "}
    //           <a href="#" style={{ color: "dodgerblue" }}>
    //             Terms & Privacy
    //           </a>
    //           .
    //         </p>

    //         <div className="clearfix">
    //           <button type="button" className="cancelbtn">
    //             Cancel
    //           </button>
    //           <button type="submit" className="signupbtn">
    //             Sign Up
    //           </button>
    //         </div>
    //       </div>
    //     </form>
    //   )}
    // </Formik>
  );
};

export default SignUp;
