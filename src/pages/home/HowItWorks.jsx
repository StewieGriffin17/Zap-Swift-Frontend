import React from "react";
import { Truck, Wallet, Package, Building2 } from "lucide-react";

const steps = [
  {
    title: "Booking Pick & Drop",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
    Icon: Truck,
  },
  {
    title: "Cash On Delivery",
    desc: "Collect payments at the doorstep with secure COD handling for every parcel.",
    Icon: Wallet,
  },
  {
    title: "Delivery Hub",
    desc: "Efficient routing and processing ensure parcels move quickly and safely.",
    Icon: Package,
  },
  {
    title: "Booking SME & Corporate",
    desc: "Flexible solutions tailored for teams and enterprises with higher volumes.",
    Icon: Building2,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-transparent mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div 
          className="text-left mb-2 sm:mb-4 lg:mb-8"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#03373D] mb-2 sm:mb-3">
            How it Works
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Simple steps to get your parcels delivered efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative bg-white rounded-xl lg:rounded-2xl 
               shadow-md hover:shadow-xl transition-all duration-300 
               hover:-translate-y-1 p-5 sm:p-6 h-full
               border border-gray-100"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center justify-start mb-4">
                <div
                  className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center
                      rounded-xl bg-emerald-50 text-emerald-600
                      group-hover:bg-emerald-100 transition-colors duration-300"
                >
                  <step.Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#03373D] mb-2 sm:mb-3">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// import React from "react";
// import { Truck, Wallet, Package, Building2 } from "lucide-react";

// const steps = [
//   {
//     title: "Booking Pick & Drop",
//     desc: "From personal packages to business shipments — we deliver on time, every time.",
//     Icon: Truck,
//   },
//   {
//     title: "Cash On Delivery",
//     desc: "Collect payments at the doorstep with secure COD handling for every parcel.",
//     Icon: Wallet,
//   },
//   {
//     title: "Delivery Hub",
//     desc: "Efficient routing and processing ensure parcels move quickly and safely.",
//     Icon: Package,
//   },
//   {
//     title: "Booking SME & Corporate",
//     desc: "Flexible solutions tailored for teams and enterprises with higher volumes.",
//     Icon: Building2,
//   },
// ];

// export default function HowItWorks() {
//   return (
//     <section className="w-full bg-transparent mt-10">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="text-left mb-2 sm:mb-4 lg:mb-8">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#03373D] mb-2 sm:mb-3">
//             How it Works
//           </h2>
//           <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
//             Simple steps to get your parcels delivered efficiently
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
//           {steps.map((step) => (
//             <div
//               key={step.title}
//               className="group relative bg-white rounded-xl lg:rounded-2xl 
//                shadow-md hover:shadow-xl transition-all duration-300 
//                hover:-translate-y-1 p-5 sm:p-6 h-full
//                border border-gray-100"
//             >
//               <div className="flex items-center justify-start mb-4">
//                 <div
//                   className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center
//                       rounded-xl bg-emerald-50 text-emerald-600
//                       group-hover:bg-emerald-100 transition-colors duration-300"
//                 >
//                   <step.Icon className="h-6 w-6 sm:h-7 sm:w-7" />
//                 </div>
//               </div>

//               <h3 className="text-base sm:text-lg font-bold text-[#03373D] mb-2 sm:mb-3">
//                 {step.title}
//               </h3>
//               <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
//                 {step.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
