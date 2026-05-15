import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader/Loader";

export default function Categories() {
  const [Categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setCategories(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-white to-white">
      <div className="text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-800">
          Browse Categories
        </h1>
        <div className="w-20 h-1 mx-auto mb-6 bg-green-500 rounded-full"></div>
      </div>

      {Categories.length !== 0 ? (
        <div className="flex flex-wrap justify-center w-full gap-6">
          {Categories.map((Category) => (
            <div key={Category._id} className="w-80">
              <div className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl">
                <img
                  className="object-cover w-full h-48"
                  src={Category.image}
                  alt={Category.name}
                />
                <div className="p-5 text-center">
                  <h2 className="text-2xl font-semibold text-gray-700">
                    {Category.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <Loader />
        </div>
      )}
    </div>
  );
}
