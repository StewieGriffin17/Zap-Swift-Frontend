import React from "react";
import Marquee from "react-fast-marquee";
import amazon from "../../assets/brands/amazon.png";
import amazon_vector from "../../assets/brands/amazon_vector.png";
import casio from "../../assets/brands/casio.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import smart_people from "../../assets/brands/start-people 1.png";
import start from "../../assets/brands/start.png";

const BrandsSection = () => {
  const brands = [
    amazon,
    amazon_vector,
    casio,
    moonstar,
    randstad,
    smart_people,
    start,
  ];

  return (
    <section className="py-10 overflow-hidden mx-auto max-w-[1280px]">
      <div className="text-center mb-10 px-4">
        <h2 className="font-extrabold text-xl sm:text-2xl text-[#03373D]">
          We've helped thousands of sales teams
        </h2>
      </div>

      <div className="w-full overflow-hidden mb-2 sm:mb-7">
        <Marquee
          gradient={false} 
          speed={50}        
          pauseOnHover={true}
        >
          {brands.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-6 sm:mx-10 flex items-center justify-center"
            >
              <img
                src={logo}
                alt="brand logo"
                className="object-contain opacity-80 hover:opacity-100 transition duration-300 w-24 sm:w-32"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default BrandsSection;
