import { Formik } from "formik";
import React, { useState } from "react";
import axios from "axios";

function SignUp() {
  debugger;
  let [name, setName] = useState("");

  return (
    <Formik
      initialValues={{ email: "", firstName: "", lastName: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.firstName) errors.firstName = "firstName is required";

        if (!values.lastName) errors.lastName = "lastName is required";

        if (!values.password) errors.password = "password is required";

        return errors;
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
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}

          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
          />
          {errors.firstName && touched.firstName && errors.firstName}

          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
          />
          {errors.lastName && touched.lastName && errors.lastName}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}

export default SignUp;
