import React from "react";

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div
      className="flex flex-col rounded-2xl p-6 sm:p-8 text-center w-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full bg-white hover:bg-lime-300"
    >
      <div className="flex justify-center mb-4 transform transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-gray-800">
        {title}
      </h3>
      <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;