import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PopularCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  async function getCategories() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setCategories(data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="p-6 pb-5 mb-10 bg-gray-100 rounded-lg ">
      <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
        Popular Categories
      </h2>
      {loading ? (
        <div className="flex items-center justify-center h-40">Loading...</div>
      ) : categories.length > 0 ? (
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id} className="p-2">
              <div className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black opacity-0 bg-opacity-30 group-hover:opacity-100">
                  <span className="text-xl font-semibold text-white">{category.name}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">No categories available</p>
      )}
    </div>
  );
}
