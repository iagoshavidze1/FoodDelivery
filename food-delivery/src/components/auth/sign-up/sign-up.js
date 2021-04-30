import { Formik } from "formik";
import React, { useState } from "react";
import axios from "axios";

function SignUp() {
  debugger;
  let [name, setName] = useState("");

  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        repeatePassword: "",
      }}
      validate={(values) => {
        const errors = {};
        if (values.email.touched && !values.email) {
          errors.email = "email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (values.firstName.touched && !values.firstName)
          errors.firstName = "firstName is required";

        if (values.lastName.touched && !values.lastName)
          errors.lastName = "lastName is required";

        if (values.password.touched && !values.password)
          errors.password = "password is required";

        if (
          values.repeatePassword.touched &&
          values.password != values.repeatePassword
        )
          errors.repeatePassword = "repeat password doesn't to match password";
      }}
      onSubmit={(values) => {
        debugger;
        console.log(values);
        axios.post("https://localhost:44369/Account/sign-upss", values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form action="action_page.php" style={{ border: "1px solid #ccc" }}>
          <div className="container">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            {errors.email}
            {errors.firstName}
            {errors.lastName}
            {errors.password}
            {errors.repeatePassword}

            <hr></hr>

            <label for="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={values.email}
              required
            ></input>

            <label for="firstName">
              <b>FirstName</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="firstName"
              value={values.firstName}
              required
            ></input>

            <label for="lastName">
              <b>FirstName</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="lastName"
              value={values.lastName}
              required
            ></input>

            <label for="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={values.password}
            ></input>
            <label for="repeatePassword">
              <b>Repeat Password</b>
            </label>
            <input
              type="password"
              placeholder="Repeat Password"
              name="repeatePassword"
              value={values.repeatePassword}
            ></input>

            <p>
              By creating an account you agree to our{" "}
              <a href="#" style={{ color: "dodgerblue" }}>
                Terms & Privacy
              </a>
              .
            </p>

            <div className="clearfix">
              <button type="button" className="cancelbtn">
                Cancel
              </button>
              <button type="submit" className="signupbtn">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default SignUp;
