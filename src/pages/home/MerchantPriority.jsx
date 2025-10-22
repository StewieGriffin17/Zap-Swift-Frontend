import React from "react";
import merchant_bg from "../../assets/be-a-merchant-bg.png";
import location from "../../assets/location-merchant.png";

export default function MerchantPriority() {
  return (
    <div className="relative isolate max-w-[1280px] mx-auto overflow-hidden rounded-xl lg:rounded-2xl bg-gradient-to-br px-8 from-[#07383D] to-[#0a4a51] text-white shadow-2xl my-8 sm:my-12 lg:my-16">
      {/* Background Image */}
      <img
        src={merchant_bg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-50"
      />

      <div className="relative grid gap-6 sm:gap-8 lg:gap-10 p-6 sm:p-8 lg:p-12 md:grid-cols-2 items-center">
        {/* Content Section */}
        <div className="z-10 space-y-4 sm:space-y-5 lg:space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
            Merchant and Customer Satisfaction
            <br className="hidden sm:block" /> is Our First Priority
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-teal-100 leading-relaxed max-w-xl">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl bg-[#CFEA68] px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-[#0E1B16] shadow-lg transition-all duration-200 hover:bg-lime-400 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#CFEA68] focus:ring-offset-2 focus:ring-offset-[#07383D]"
            >
              Become a Merchant
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#CFEA68] px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-[#CFEA68] transition-all duration-200 hover:bg-[#CFEA68]/10 hover:border-lime-400 hover:text-lime-400 focus:outline-none focus:ring-2 focus:ring-[#CFEA68] focus:ring-offset-2 focus:ring-offset-[#07383D]"
            >
              Earn with Profast Courier
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative z-0 flex items-center justify-center md:justify-end">
          <img
            src={location}
            alt="Stacked parcels with location pin"
            className="w-48 sm:w-56 md:w-64 lg:w-[532px] h-auto object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Decorative border ring */}
      <div className="pointer-events-none absolute inset-0 rounded-xl lg:rounded-2xl ring-1 ring-inset ring-white/10" />
    </div>
  );
}