import React from "react";
import {
  FaShippingFast,
  FaGlobeAsia,
  FaBoxes,
  FaMoneyBillWave,
  FaHandshake,
  FaUndo,
} from "react-icons/fa";
import ServiceCard from "./ServiceCard";

const ServicesSection = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
      icon: <FaShippingFast className="text-4xl sm:text-5xl text-emerald-600" />,
    },
    {
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
      icon: <FaGlobeAsia className="text-4xl sm:text-5xl text-emerald-600" />,
    },
    {
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      icon: <FaBoxes className="text-4xl sm:text-5xl text-emerald-600" />,
    },
    {
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      icon: <FaMoneyBillWave className="text-4xl sm:text-5xl text-emerald-600" />,
    },
    {
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
      icon: <FaHandshake className="text-4xl sm:text-5xl text-emerald-600" />,
    },
    {
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      icon: <FaUndo className="text-4xl sm:text-5xl text-emerald-600" />,
    },
  ];

  return (
    <section
      className="bg-gradient-to-br from-[#03373D] to-[#024950] text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 rounded-3xl max-w-[1500px] mx-auto mt-12 sm:mt-16"
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-easing="ease-out-cubic"
      data-aos-once="true"
    >
      {/* Section heading */}
      <div
        className="text-center mb-10 sm:mb-12 lg:mb-16 px-2"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          Our Services
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* Cards with staggered fade-up */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr">
        {services.map((service, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 120}
            data-aos-duration="700"
            data-aos-easing="ease-out-cubic"
            data-aos-once="true"
          >
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;


// import React from "react";
// import {
//   FaShippingFast,
//   FaGlobeAsia,
//   FaBoxes,
//   FaMoneyBillWave,
//   FaHandshake,
//   FaUndo,
// } from "react-icons/fa";
// import ServiceCard from "./ServiceCard";

// const ServicesSection = () => {
//   const services = [
//     {
//       title: "Express & Standard Delivery",
//       description:
//         "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
//       icon: (
//         <FaShippingFast className="text-4xl sm:text-5xl text-emerald-600" />
//       ),
//     },
//     {
//       title: "Nationwide Delivery",
//       description:
//         "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
//       icon: <FaGlobeAsia className="text-4xl sm:text-5xl text-emerald-600" />,
//     },
//     {
//       title: "Fulfillment Solution",
//       description:
//         "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
//       icon: <FaBoxes className="text-4xl sm:text-5xl text-emerald-600" />,
//     },
//     {
//       title: "Cash on Home Delivery",
//       description:
//         "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
//       icon: (
//         <FaMoneyBillWave className="text-4xl sm:text-5xl text-emerald-600" />
//       ),
//     },
//     {
//       title: "Corporate Service / Contract In Logistics",
//       description:
//         "Customized corporate services which includes warehouse and inventory management support.",
//       icon: <FaHandshake className="text-4xl sm:text-5xl text-emerald-600" />,
//     },
//     {
//       title: "Parcel Return",
//       description:
//         "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
//       icon: <FaUndo className="text-4xl sm:text-5xl text-emerald-600" />,
//     },
//   ];

//   return (
//     <section className="bg-gradient-to-br from-[#03373D] to-[#024950] text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 rounded-3xl max-w-[1500px] mx-auto mt-12 sm:mt-16">
//       <div className="text-center mb-10 sm:mb-12 lg:mb-16 px-2">
//         <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
//           Our Services
//         </h2>
//         <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
//           Enjoy fast, reliable parcel delivery with real-time tracking and zero
//           hassle. From personal packages to business shipments — we deliver on
//           time, every time.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr">
//         {services.map((service, index) => (
//           <ServiceCard
//             key={index}
//             icon={service.icon}
//             title={service.title}
//             description={service.description}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;
