import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function Register() {
  let [isCallingAPI, setIsCallingAPI] = useState(false);
  let [isAPISuccess, setIsAPISuccess] = useState(true);
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: callRegister,

    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = "Required";
      } else if (values.name.length < 3) {
        errors.name = "Name must be at least 3 characters";
      }

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email format";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (!/^[A-Za-z][A-Za-z0-9]{5,8}$/.test(values.password)) {
        errors.password =
          "Password must start with a letter and be 6-9 characters long (letters and numbers only)";
      }

      if (values.password !== values.rePassword) {
        errors.rePassword = "Passwords do not match";
      }

      if (!values.phone) {
        errors.phone = "Required";
      } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
        errors.phone = "Invalid Egyptian phone number format";
      }

      return errors;
    },
  });
  async function callRegister(values) {
    try {
      setIsCallingAPI(true);
      setIsAPISuccess(true)
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      setIsCallingAPI(false);
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You Have Registered Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login")
    } catch (error) {
      console.log(error.response.data.message);
      setIsAPISuccess(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-4 mx-auto my-6 bg-white rounded-lg shadow-md md:max-w-6xl sm:max-w-2xl"
    >
      <h1 className="text-3xl text-[#212529] mb-10">Register Now</h1>

      <div className="relative mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          onBlur={formik.handleBlur}
          type="text"
          id="name"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08ac0bad] focus:border-[#08ac0bad] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#08ac0bad] dark:focus:border-[#08ac0bad]"
          placeholder="Enter your name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="flex items-center p-4 mt-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            {formik.errors.name}
          </div>
        ) : null}
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          onBlur={formik.handleBlur}
          type="email"
          id="email"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08ac0bad] focus:border-[#08ac0bad] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#08ac0bad] dark:focus:border-[#08ac0bad]"
          placeholder="Enter your email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="flex items-center p-4 mt-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            {formik.errors.email}
          </div>
        ) : null}
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          onBlur={formik.handleBlur}
          type="password"
          id="password"
          name="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08ac0bad] focus:border-[#08ac0bad] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#08ac0bad] dark:focus:border-[#08ac0bad]"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <div className="flex items-center p-4 mt-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <div className="mb-5">
        <label
          htmlFor="rePassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Re-password
        </label>
        <input
          onBlur={formik.handleBlur}
          type="password"
          id="rePassword"
          name="rePassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08ac0bad] focus:border-[#08ac0bad] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#08ac0bad] dark:focus:border-[#08ac0bad]"
          placeholder="Re-enter your password"
          onChange={formik.handleChange}
          value={formik.values.rePassword}
        />
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div className="flex items-center p-4 mt-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            {formik.errors.rePassword}
          </div>
        ) : null}
      </div>

      <div className="mb-5">
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone
        </label>
        <input
          onBlur={formik.handleBlur}
          type="tel"
          id="phone"
          name="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08ac0bad] focus:border-[#08ac0bad] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#08ac0bad] dark:focus:border-[#08ac0bad]"
          placeholder="Enter your phone number"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div className="flex items-center p-4 mt-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            {formik.errors.phone}
          </div>
        ) : null}
      </div>

      {isCallingAPI && isAPISuccess ? (
        <div className="flex flex-row-reverse justify-center sm:justify-start">
          <ClipLoader />
        </div>
      ) : (
        <div className="flex flex-row-reverse">
          <button
            type="submit"
            className={`text-white bg-[#08AC0A] hover:bg-[#266327] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              !(formik.isValid && formik.dirty)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Register Now
          </button>
        </div>
      )}
    </form>
  );
}
