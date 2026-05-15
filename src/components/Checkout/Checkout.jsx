import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { cartContext } from "../../Context/cartContext";
import { useNavigate } from "react-router-dom"; 

export default function Checkout() {
  const [isCallingAPI, setIsCallingAPI] = useState(false);
  const { cashOnDelivery, onlinePayment } = useContext(cartContext);
  const [isOnline, setIsOnline] = useState(false);
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: async (values) => {
      console.log(isOnline);
      
      setIsCallingAPI(true);
      try {
        if (isOnline) {
          let x= await onlinePayment(values);
          window.location.href=x.session.url
        } else {
          await cashOnDelivery(values);
        }
      
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You Have Checked Out Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        // navigate("/"); 
      } catch (error) {
        console.error("Checkout failed:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
      } finally {
        setIsCallingAPI(false);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.details) {
        errors.details = "Required";
      }
      if (!values.phone) {
        errors.phone = "Required";
      } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
        errors.phone = "Invalid Egyptian phone number format";
      }
      if (!values.city) {
        errors.city = "Required";
      }
      return errors;
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-4 mx-auto my-6 bg-white rounded-lg shadow-md md:max-w-6xl sm:max-w-2xl"
    >
      <h1 className="text-3xl text-[#212529] mb-10">Checkout Now</h1>

      <div className="mb-5">
        <label
          htmlFor="details"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Details
        </label>
        <input
          onBlur={formik.handleBlur}
          type="text"
          id="details"
          name="details"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08ac0bad] focus:border-[#08ac0bad] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#08ac0bad] dark:focus:border-[#08ac0bad]"
          placeholder="Enter your details"
          onChange={formik.handleChange}
          value={formik.values.details}
        />
        {formik.errors.details && formik.touched.details && (
          <div className="flex items-center p-4 mt-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            {formik.errors.details}
          </div>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone No.
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
        {formik.errors.phone && formik.touched.phone && (
          <div className="flex items-center p-4 mt-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            {formik.errors.phone}
          </div>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="city"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          City
        </label>
        <input
          onBlur={formik.handleBlur}
          type="text"
          id="city"
          name="city"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08ac0bad] focus:border-[#08ac0bad] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#08ac0bad] dark:focus:border-[#08ac0bad]"
          placeholder="Enter your City"
          onChange={formik.handleChange}
          value={formik.values.city}
        />
        {formik.errors.city && formik.touched.city && (
          <div className="flex items-center p-4 mt-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            {formik.errors.city}
          </div>
        )}
      </div>

      {isCallingAPI ? (
        <div className="flex flex-row-reverse justify-center sm:justify-start">
          <ClipLoader />
        </div>
      ) : (
        <div className="flex flex-row-reverse justify-between">
          <button
            type="submit"
            className={`text-white bg-[#08AC0A] hover:bg-[#266327] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              !(formik.isValid && formik.dirty) ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Checkout Now
          </button>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="online"
              checked={isOnline}
              onChange={() => setIsOnline(!isOnline)} // Toggle the online payment option
            />
            <label className="mx-2" htmlFor="online">Online Payment</label>
          </div>
        </div>
      )}
    </form>
  );
}