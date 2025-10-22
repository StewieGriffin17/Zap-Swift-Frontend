// components/FAQ.jsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    q: "How does ProFast Courier work?",
    a: "Book a pickup from our app or website, we collect your parcel from your door, sort it at our hub, and deliver to the destination with end-to-end live tracking and delivery confirmation.",
  },
  {
    q: "Is ProFast available for all package sizes?",
    a: "Yes. From small envelopes to bulky boxes, choose the size during booking and we'll assign the right rider or van for safe handling.",
  },
  {
    q: "Do you offer Cash on Delivery (COD)?",
    a: "Absolutely. Enable COD at checkout or while booking. We collect cash from your customer and settle it to your merchant wallet the next business day.",
  },
  {
    q: "How fast can you deliver?",
    a: "Same-day delivery is available inside the city. For nationwide shipments, we typically deliver within 24-72 hours depending on the route.",
  },
  {
    q: "How can I track my shipment?",
    a: "Use the tracking ID from your booking receipt. Track in real time from the ProFast app or website and get status notifications.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  const toggle = (idx) => setOpen((prev) => (prev === idx ? -1 : idx));

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Header */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-[#03373D]">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about booking, tracking, COD, and delivery with ProFast Courier.
        </p>

        {/* Accordion */}
        <div className="mt-8 space-y-4">
          {faqs.map((item, idx) => {
            const active = open === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-colors ${
                  active
                    ? "border-teal-400 bg-teal-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={active}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span
                    className={`font-semibold ${
                      active ? "text-[#03373D]" : "text-[#03373D]"
                    }`}
                  >
                    {item.q}
                  </span>
                  {active ? (
                    <ChevronUp className="text-[#03373D]" />
                  ) : (
                    <ChevronDown className="text-gray-500" />
                  )}
                </button>

                {/* Answer */}
                <div
                  id={`faq-panel-${idx}`}
                  className={`px-5 pb-5 pt-0 text-gray-600 transition-[grid-template-rows,opacity] duration-300 grid ${
                    active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-[#CFEA68] px-6 py-3 font-semibold text-[#0B3B36] shadow-sm transition hover:brightness-95"
          >
            See More FAQ's
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
