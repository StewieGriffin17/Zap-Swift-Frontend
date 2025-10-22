import React, { useRef } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import customer_top from "../../assets/customer-top.png";

const testimonials = [
  {
    message:
      "ProFast Courier has completely simplified my business deliveries. Their live tracking gives me total peace of mind every time I send a package.",
    name: "Amina Rahman",
    role: "E-commerce Store Owner",
  },
  {
    message:
      "I've used several courier services before, but none match the reliability and professionalism of ProFast. My parcels always arrive on time.",
    name: "Tanvir Hasan",
    role: "Logistics Manager",
  },
  {
    message:
      "Their same-day delivery option has been a game changer for my local store. My customers love how fast their orders reach them.",
    name: "Farzana Akter",
    role: "Boutique Owner",
  },
  {
    message:
      "I appreciate how easy it is to schedule pickups through their app. The team is always punctual and handles everything carefully.",
    name: "Rafiq Chowdhury",
    role: "Freelance Photographer",
  },
  {
    message:
      "ProFast Courier keeps me updated from pickup to delivery. I can focus on my work knowing my shipments are in safe hands.",
    name: "Nusrat Jahan",
    role: "Online Retailer",
  },
  {
    message:
      "The customer service is exceptional! Whenever I have a query, they respond instantly and solve it professionally.",
    name: "Arif Mahmud",
    role: "SME Owner",
  },
  {
    message:
      "Their cash-on-delivery service is seamless. It has helped me boost sales without worrying about payment security.",
    name: "Lamia Hossain",
    role: "Fashion Entrepreneur",
  },
  {
    message:
      "Even during the busiest times, ProFast maintains timely delivery. Truly dependable and professional service.",
    name: "Hasan Imam",
    role: "Corporate Client",
  },
  {
    message:
      "I love how transparent their tracking system is. I can see exactly where my parcel is without calling anyone.",
    name: "Sumaiya Karim",
    role: "Tech Accessories Seller",
  },
  {
    message:
      "Affordable, reliable, and fast — ProFast Courier delivers everything I need in a logistics partner.",
    name: "Zahidul Islam",
    role: "Small Business Owner",
  },
];

const getInitials = (name) => {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
};

export default function Customers() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="">
      <div className="flex justify-center mb-6 md:mb-8">
        <img src={customer_top} alt="Customer Top" />
      </div>

      <div className="w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#03373D] text-center mb-3">
            What our customers are saying
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto text-center mb-10 md:mb-12">
            Hear from satisfied merchants and business owners who rely on
            ProFast Courier for reliable, fast, and secure parcel delivery.
          </p>

          <div className="relative">
            <button
              ref={prevRef}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 bg-white text-[#03373D] hover:bg-gray-100 rounded-full p-3 shadow-lg z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
            </button>

            <button
              ref={nextRef}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-[#CFEA68] text-[#03373D] hover:brightness-95 rounded-full p-3 shadow-lg z-10"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
            </button>

            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay, Keyboard]}
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              loop
              centeredSlides
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1.2,
                  centeredSlides: true,
                  spaceBetween: 24,
                },
                768: {
                  slidesPerView: 2.3,
                  centeredSlides: true,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  centeredSlides: true,
                  spaceBetween: 24,
                },
              }}
              className="!pb-10"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i} className="!h-auto">
                  {({ isActive }) => (
                    <div
                      className={`
        max-h-[315px] rounded-3xl border border-gray-200 bg-white transition-all duration-500
        flex flex-col justify-between px-6 py-6
        ${
          isActive
            ? "shadow-2xl scale-105 opacity-100"
            : "opacity-40 scale-90 shadow-sm"
        }
        h-[360px] md:h-[380px]
      `}
                    >
                      <div>
                        <Quote className="text-[#A2C1C0] mb-3" size={28} />
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {t.message}
                        </p>
                      </div>

                      <div>
                        <div className="border-t border-dashed border-[#A2C1C0] my-4" />
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-[#03373D] flex items-center justify-center text-white font-bold">
                            {getInitials(t.name)}
                          </div>
                          <div>
                            <p className="text-[#03373D] font-semibold">
                              {t.name}
                            </p>
                            <p className="text-gray-500 text-sm">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
