import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "utils/loader";
import { errorHelper } from "utils/errorHelper";

import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "store/actions/user.actions";
import { TextField, Button } from "@material-ui/core";

const SignIn = (props) => {
  const notifications = useSelector((state) => state.notifications);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "francis@gmail.com", password: "testing123" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry the email is required")
        .email("This is an invalid email"),
      password: Yup.string().required("Sorry the password is required"),
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
              Sign In
            </p>
            <form className="mt-3 w-100" onSubmit={formik.handleSubmit}>
              <div className="form-group">
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

export default SignIn;
