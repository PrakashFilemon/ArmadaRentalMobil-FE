import React from "react";

const ServiceCard = ({ image, title, description }) => {
  return (
    <div className="w-full bg-white rounded-lg sm:rounded-xl shadow hover:shadow-lg sm:hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      {/* Image Section - Smaller on mobile */}
      <div className="w-full h-20 sm:h-32 md:h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          src={image}
          alt={title}
        />
      </div>

      {/* Content Section - More compact on mobile */}
      <div className="p-1 sm:p-3 md:p-6 flex-grow">
        <h2 className="text-xs sm:text-sm md:text-lg font-bold mb-1 text-gray-800 line-clamp-2">
          {title}
        </h2>
        <p className="text-xs hidden sm:block sm:text-xs md:text-base text-gray-600 leading-tight sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
