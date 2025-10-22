import React from "react";
import live_parcel_tracking from "../../assets/live-tracking.png";
import safe_delivery from "../../assets/safe-delivery.png";
import call_service from "../../assets/call-service.png";

const benefits = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: live_parcel_tracking,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: safe_delivery,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: call_service,
  },
];

const Benefits = () => {
  return (
    <div
      className="mx-auto max-w-[1280px]"
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-easing="ease-out-cubic"
      data-aos-once="true"
    >
      <div className="mx-auto mb-8" data-aos="fade-up" data-aos-delay="100">
        <hr className="border-t-2 border-dashed border-gray-400" />
      </div>

      <div className="flex flex-col gap-5 sm:gap-6">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-6 lg:p-10 flex flex-col md:flex-row items-center gap-4 sm:gap-6 lg:gap-8 border-l-4 border-[#03373D]"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-delay={index * 150}
            data-aos-duration="800"
            data-aos-once="true"
          >
            {/* Image */}
            <div className="w-full md:w-1/4 flex justify-center md:justify-center flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 sm:w-28 lg:w-36 h-auto object-contain"
                data-aos="zoom-in"
                data-aos-delay={index * 150 + 100}
              />
            </div>

            {/* Divider (desktop only) */}
            <div className="hidden md:block w-px h-24 lg:h-32 bg-gray-400"></div>

            {/* Content */}
            <div
              className="w-full md:flex-1 text-center md:text-left"
              data-aos="fade-up"
              data-aos-delay={index * 150 + 200}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-[#03373D]">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed max-w-[850px]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mx-auto mt-8 mb-12"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <hr className="border-t-2 border-dashed border-gray-400" />
      </div>
    </div>
  );
};

export default Benefits;



// import React from "react";
// import live_parcel_tracking from "../../assets/live-tracking.png";
// import safe_delivery from "../../assets/safe-delivery.png";
// import call_service from "../../assets/call-service.png";

// const benefits = [
//   {
//     title: "Live Parcel Tracking",
//     description:
//       "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
//     image: live_parcel_tracking,
//   },
//   {
//     title: "100% Safe Delivery",
//     description:
//       "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
//     image: safe_delivery,
//   },
//   {
//     title: "24/7 Call Center Support",
//     description:
//       "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
//     image: call_service,
//   },
// ];

// const Benefits = () => {
//   return (
//     <div className="mx-auto max-w-[1280px]">
//       <div className="mx-auto mb-8">
//         <hr className="border-t-2 border-dashed border-gray-400" />
//       </div>

//       <div className="flex flex-col gap-5 sm:gap-6">
//         {benefits.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-6 lg:p-10 flex flex-col md:flex-row items-center gap-4 sm:gap-6 lg:gap-8 border-l-4 border-[#03373D]"
//           >
//             {/* Image Container */}
//             <div className="w-full md:w-1/4 flex justify-center md:justify-center flex-shrink-0">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-24 sm:w-28 lg:w-36 h-auto object-contain"
//               />
//             </div>

//             {/* Divider Line (vertical on desktop, hidden on mobile) */}
//             <div className="hidden md:block w-px h-24 lg:h-32 bg-gray-400"></div>

//             {/* Content Container */}
//             <div className="w-full md:flex-1 text-center md:text-left">
//               <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-[#03373D]">
//                 {item.title}
//               </h3>
//               <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed max-w-[850px]">
//                 {item.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mx-auto mt-8 mb-12">
//         <hr className="border-t-2 border-dashed border-gray-400" />
//       </div>
//     </div>
//   );
// };

// export default Benefits;
