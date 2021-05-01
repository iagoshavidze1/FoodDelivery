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
      <div className="sign-in_container flex-column">
        {loading ? (
          <Loader />
        ) : (
          <>
            <p className="d-flex justify-content-center title-description">
              Sign Up
            </p>
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
          </>
        )}
      </div>
    </>
  );
};

export default SignUp;
