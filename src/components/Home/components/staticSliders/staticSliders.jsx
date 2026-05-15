import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../../../assets/images/slider-image-1.jpeg";
import slide2 from "../../../../assets/images/slider-image-2.jpeg";
import slide3 from "../../../../assets/images/slider-image-3.jpeg";
import static1 from "../../../../assets/images/grocery-banner.png";
import static2 from "../../../../assets/images/grocery-banner-2.jpeg";

export default function StaticSliders() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
  };
  return (
    <>
      <div className="flex flex-wrap p-6 mb-10 bg-white rounded-lg shadow-xl">
        <div className="w-8/12 p-3 overflow-hidden rounded-lg cursor-pointer">
          <Slider {...settings}>
            {[slide1, slide2, slide3].map((slide, index) => (
              <div key={index} className="relative">
                <img
                  src={slide}
                  className="h-[400px] w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex flex-col w-4/12 gap-4 p-3 cursor-pointer">
          {[static1, static2].map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md">
              <img
                src={image}
                className="h-[200px] w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                alt={`Static ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
