import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { tokenContext } from "../../Context/tokenContext";

export default function PasswordReset() {
  const [isCallingAPI, setIsCallingAPI] = useState(false);
  const { setToken } = useContext(tokenContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      rePassword: "",
    },
    onSubmit: resetPassword,
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.newPassword) {
        errors.newPassword = "Required";
      } else if (!/^[A-Za-z][A-Za-z0-9]{5,8}$/.test(values.newPassword)) {
        errors.newPassword =
          "Password must start with a letter and be 6-9 characters long (letters and numbers only)";
      }

      if (!values.rePassword) {
        errors.rePassword = "Required";
      } else if (values.rePassword !== values.newPassword) {
        errors.rePassword = "Passwords do not match";
      }

      return errors;
    },
  });

  async function resetPassword(values) {
    try {
      setIsCallingAPI(true);
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: values.email,
          newPassword: values.newPassword,
        }
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Password Reset Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsCallingAPI(false);
    }
  }

  return (
    <>
    
      <form
        onSubmit={formik.handleSubmit}
        className="p-4 mx-auto my-6 bg-white rounded-lg shadow-md md:max-w-6xl sm:max-w-2xl"
      >
        <div className="flex items-center justify-center">
  <ol className="flex items-center gap-4 mb-4 sm:mb-5 w-[700px] ml-40">
    <li className="flex w-full items-center text-blue-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
        <svg
          className="w-4 h-4 text-[#08AC0A] lg:w-6 lg:h-6 dark:text-blue-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 16"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 0 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
        </svg>
      </div>
    </li>
    <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-200 after:border-4 after:inline-block dark:after:border-blue-700">
      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-700 shrink-0">
        <svg
          className="w-4 h-4 text-[#08AC0A] lg:w-6 lg:h-6 dark:text-blue-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 14"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
          <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
        </svg>
      </div>
    </li>
    <li className="flex items-center w-full">
      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-700 shrink-0">
        <svg
          className="w-4 h-4 text-[#08AC0A] lg:w-6 lg:h-6 dark:text-blue-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
        </svg>
      </div>
    </li>
  </ol>
</div>
        <h1 className="text-3xl text-[#212529] mb-10">Reset Password</h1>

        {/* Email Field */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08ac0bad] focus:border-[#08ac0bad] block w-full p-2.5"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="flex items-center p-4 mt-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50">
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* New Password Field */}
        <div className="mb-5">
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            New Password
          </label>
          <input
            onBlur={formik.handleBlur}
            type="password"
            id="newPassword"
            name="newPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08ac0bad] focus:border-[#08ac0bad] block w-full p-2.5"
            placeholder="Enter your new password"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div className="flex items-center p-4 mt-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50">
              {formik.errors.newPassword}
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirm New Password
          </label>
          <input
            onBlur={formik.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08ac0bad] focus:border-[#08ac0bad] block w-full p-2.5"
            placeholder="Confirm your new password"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="flex items-center p-4 mt-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50">
              {formik.errors.rePassword}
            </div>
          )}
        </div>

        {isCallingAPI ? (
          <div className="flex flex-row-reverse justify-center sm:justify-start">
            <ClipLoader />
          </div>
        ) : (
          <div className="flex flex-row-reverse items-center justify-between">
            <button
              type="submit"
              className={`text-white bg-[#08AC0A] hover:bg-[#266327] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                !(formik.isValid && formik.dirty)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={!(formik.isValid && formik.dirty)}
            >
              Reset Password
            </button>
          </div>
        )}
      </form>
    </>
  );
}