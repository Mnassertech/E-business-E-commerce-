import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/tokenContext";
import ClipLoader from "react-spinners/ClipLoader";

export default function NumberInput() {
  const [isCallingAPI, setIsCallingAPI] = useState(false);
  const { setToken } = useContext(tokenContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verify,
    validate: (values) => {
      const errors = {};
      if (!values.resetCode) {
        errors.resetCode = "Required";
      } else if (!/^\d{6}$/.test(values.resetCode)) {
        errors.resetCode = "Must be a 6-digit code";
      }
      return errors;
    },
  });

  async function verify(values) {
    try {
      setIsCallingAPI(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        { resetCode: values.resetCode } 
      );

      console.log(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Validation Code Verified!",
        showConfirmButton: true,
      });
      navigate("/passwordReset");
    } catch (error) {
      console.log(error);
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
      <div className="flex items-center justify-center">
        <ol className="flex items-center gap-4 mb-4 sm:mb-5 w-[700px] ml-40">
          <li className="flex w-full items-center text-green-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block dark:after:border-green-800">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-800 shrink-0">
              <svg
                className="w-4 h-4 text-[#08AC0A] lg:w-6 lg:h-6 dark:text-green-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
              </svg>
            </div>
          </li>
          <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-4 after:inline-block dark:after:border-gray-700">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                className="w-4 h-4 text-[#08AC0A] dark:text-blue-300 lg:w-6 lg:h-6 "
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
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                className="w-4 h-4 text-[#08AC0A] lg:w-6 lg:h-6 dark:text-green-300"
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

      <form className="max-w-sm mx-auto my-12" onSubmit={formik.handleSubmit}>
        <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Please Enter the 6-Digit Code
        </label>
        <input
          type="text"
          id="resetCode"
          aria-describedby="helper-text-explanation"
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08AC0A] focus:border-[#08AC0A] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#08AC0A] dark:focus:border-[#08AC0A]`}
          placeholder="123456"
          {...formik.getFieldProps("resetCode")}
          required
        />
        {formik.errors.resetCode && formik.touched.resetCode && (
          <div className="mt-1 text-sm text-red-500">{formik.errors.resetCode}</div>
        )}
        <button
          type="submit"
          disabled={isCallingAPI}
          className={`mt-3 text-white bg-[#08AC0A] hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${isCallingAPI && "opacity-50 cursor-not-allowed"}`}
        >
          {isCallingAPI ? <ClipLoader size={20} color="#ffffff" /> : "Verify Code"}
        </button>
      </form>
    </>
  );
}