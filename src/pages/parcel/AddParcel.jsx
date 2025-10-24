import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RATE = {
  document: 60,
  nonDocument: { base: 100, perKg: 20 },
  interDivisionSurcharge: 60,
};

const REGIONS = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Rangpur",
  "Barisal",
  "Mymensingh",
];

const SERVICE_CENTERS_BY_REGION = {
  Dhaka: [
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
  ],
  Chattogram: [
    "Chattogram",
    "Cox's Bazar",
    "Cumilla",
    "Brahmanbaria",
    "Chandpur",
    "Feni",
    "Khagrachari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
    "Bandarban",
  ],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Khulna: [
    "Khulna",
    "Jessore",
    "Satkhira",
    "Bagerhat",
    "Magura",
    "Narail",
    "Jhenaidah",
    "Chuadanga",
    "Meherpur",
    "Kushtia",
  ],
  Rajshahi: [
    "Rajshahi",
    "Natore",
    "Naogaon",
    "Chapainawabganj",
    "Pabna",
    "Sirajganj",
    "Joypurhat",
    "Bogura",
  ],
  Rangpur: [
    "Rangpur",
    "Dinajpur",
    "Thakurgaon",
    "Panchagarh",
    "Nilphamari",
    "Lalmonirhat",
    "Kurigram",
    "Gaibandha",
  ],
  Barisal: [
    "Barisal",
    "Bhola",
    "Patuakhali",
    "Pirojpur",
    "Barguna",
    "Jhalokati",
  ],
  Mymensingh: ["Mymensingh", "Netrokona", "Jamalpur", "Sherpur"],
};

function SectionHeader({ children }) {
  return (
    <h3 className="text-sm font-semibold text-[#0B3B36] tracking-wide">
      {children}
    </h3>
  );
}

// Cost calculator
function calculateCost({ type, weight, senderRegion, receiverRegion }) {
  if (type === "document") {
    let cost = RATE.document;
    if (senderRegion && receiverRegion && senderRegion !== receiverRegion) {
      cost += RATE.interDivisionSurcharge;
    }
    return cost;
  }

  // non-document
  const w = Math.max(0, parseFloat(weight || 0));
  const extraKg = Math.max(0, Math.ceil(w - 1));
  let cost = RATE.nonDocument.base + extraKg * RATE.nonDocument.perKg;

  if (senderRegion && receiverRegion && senderRegion !== receiverRegion) {
    cost += RATE.interDivisionSurcharge;
  }
  return cost;
}

// utils/generateTrackingId.js
function generateTrackingId(prefix = "PF") {
  const timestamp = Date.now().toString(36).toUpperCase(); // encodes current time
  const random = Math.random().toString(36).substring(2, 8).toUpperCase(); // adds randomness
  return `${prefix}-${timestamp}-${random}`;
}

export default function AddParcel({ currentUser }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    resetField,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      // Parcel
      type: "document",
      title: "",
      weight: "",

      // Sender
      senderName: currentUser?.name || "",
      senderContact: currentUser?.contact || "",
      senderRegion: "",
      senderCenter: "",
      senderAddress: "",
      pickupInstruction: "",

      // Receiver
      receiverName: "",
      receiverContact: "",
      receiverRegion: "",
      receiverCenter: "",
      receiverAddress: "",
      deliveryInstruction: "",
    },
  });

  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Reset dependent center when region changes
  useMemo(() => resetField("senderCenter"), [senderRegion, resetField]);
  useMemo(() => resetField("receiverCenter"), [receiverRegion, resetField]);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const onSubmit = () => {
    const vals = getValues();
    const cost = calculateCost({
      type: vals.type,
      weight: vals.weight,
      senderRegion: vals.senderRegion,
      receiverRegion: vals.receiverRegion,
    });

    // Toast with confirm
    toast.custom(
      (t) => (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-[320px]">
          <h4 className="text-base font-semibold text-[#0B3B36]">
            Confirm Booking
          </h4>
          <p className="mt-2 text-sm text-gray-700">
            Estimated delivery cost:
            <span className="font-bold text-[#0B3B36]"> ৳ {cost}</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Type: {vals.type === "document" ? "Document" : "Non-document"} •
            From {vals.senderRegion || "-"} to {vals.receiverRegion || "-"}
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                const payload = {
                  ...vals,
                  cost,
                  creation_date: new Date().toISOString(),
                  created_by: user?.email || "",
                  delivery_status: "not_collected",
                  payment_status: "unpaid",
                  trackingId: generateTrackingId(),
                };
                console.log("Parcel data before saving:", payload);

                // API CALL
                axiosSecure.post("/parcels", payload).then((res) => {
                  console.log(res.data);
                  if (res.data.insertedId) {
                    toast.dismiss(t.id);
                    toast.success("Parcel booked successfully!");
                    reset();
                  }
                });
              }}
              className="flex-1 rounded-md bg-[#CFEA68] py-2 text-sm font-semibold text-[#0B3B36] hover:brightness-95 transition"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 rounded-md border border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 100000 }
    );
  };

  return (
    <section className="bg-white rounded-[22px] shadow-sm border border-gray-200/60 p-6 sm:p-8 lg:p-10 mb-6 sm:mb-16">
      <Toaster position="top-center" />

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3B36]">
          Add Parcel
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Subtitle */}
        <div>
          <p className="text-base font-semibold text-[#0B3B36] mb-3">
            Enter your parcel details
          </p>

          {/* Type */}
          <div className="flex items-center gap-8">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                value="document"
                {...register("type")}
                className="radio radio-success"
              />
              <span className="text-sm text-gray-700">Document</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                value="non-document"
                {...register("type")}
                className="radio radio-success"
              />
              <span className="text-sm text-gray-700">Non-Document</span>
            </label>
          </div>
        </div>

        {/* PARCEL INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Parcel Name
            </label>
            <input
              type="text"
              placeholder="Parcel Name"
              {...register("title", { required: "Parcel name is required" })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Parcel Weight (KG)
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Parcel Weight (KG)"
              disabled={type !== "non-document"}
              {...register("weight", {
                validate: (v) =>
                  type === "non-document" ? !!v || "Weight is required" : true,
              })}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-gray-400 ${
                type !== "non-document"
                  ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                  : "border-gray-300"
              }`}
            />
            {errors.weight && (
              <p className="mt-1 text-xs text-red-500">
                {errors.weight.message}
              </p>
            )}
          </div>
        </div>

        {/* DIVIDER */}
        <hr className="border-t border-dashed border-gray-300" />

        {/* SENDER + RECEIVER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sender */}
          <div>
            <SectionHeader>Sender Details</SectionHeader>

            <div className="mt-3 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Sender Name
                </label>
                <input
                  type="text"
                  placeholder="Sender Name"
                  {...register("senderName", {
                    required: "Sender name is required",
                  })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                />
                {errors.senderName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.senderName.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Select Region
                  </label>
                  <select
                    {...register("senderRegion", {
                      required: "Sender region is required",
                    })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your region
                    </option>
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.senderRegion && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.senderRegion.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Select Service Center
                  </label>
                  <select
                    {...register("senderCenter", {
                      required: "Sender service center is required",
                    })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select service center
                    </option>
                    {(SERVICE_CENTERS_BY_REGION[senderRegion] || []).map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      )
                    )}
                  </select>
                  {errors.senderCenter && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.senderCenter.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Sender Contact No
                  </label>
                  <input
                    type="tel"
                    placeholder="Sender Contact No"
                    {...register("senderContact", {
                      required: "Contact is required",
                    })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                  />
                  {errors.senderContact && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.senderContact.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("senderAddress", {
                      required: "Address is required",
                    })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                  />
                  {errors.senderAddress && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.senderAddress.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Pickup Instruction
                </label>
                <textarea
                  rows={3}
                  placeholder="Pickup Instruction"
                  {...register("pickupInstruction", {
                    required: "Pickup instruction is required",
                  })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                />
                {errors.pickupInstruction && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.pickupInstruction.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div>
            <SectionHeader>Receiver Details</SectionHeader>

            <div className="mt-3 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Receiver Name
                </label>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  {...register("receiverName", {
                    required: "Receiver name is required",
                  })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                />
                {errors.receiverName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.receiverName.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Select Region
                  </label>
                  <select
                    {...register("receiverRegion", {
                      required: "Receiver region is required",
                    })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your region
                    </option>
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.receiverRegion && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.receiverRegion.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Select Service Center
                  </label>
                  <select
                    {...register("receiverCenter", {
                      required: "Receiver service center is required",
                    })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select service center
                    </option>
                    {(SERVICE_CENTERS_BY_REGION[receiverRegion] || []).map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      )
                    )}
                  </select>
                  {errors.receiverCenter && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.receiverCenter.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Receiver Contact No
                  </label>
                  <input
                    type="tel"
                    placeholder="Receiver Contact No"
                    {...register("receiverContact", {
                      required: "Contact is required",
                    })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                  />
                  {errors.receiverContact && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.receiverContact.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Receiver Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("receiverAddress", {
                      required: "Address is required",
                    })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                  />
                  {errors.receiverAddress && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.receiverAddress.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Delivery Instruction
                </label>
                <textarea
                  rows={3}
                  placeholder="Delivery Instruction"
                  {...register("deliveryInstruction", {
                    required: "Delivery instruction is required",
                  })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
                />
                {errors.deliveryInstruction && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.deliveryInstruction.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-600">* PickUp Time 4pm-7pm Approx.</p>

        {/* CTA */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-[#CFEA68] px-5 py-2.5 text-sm font-semibold text-[#0B3B36] hover:brightness-95 transition disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Proceed to Confirm Booking"}
          </button>
        </div>
      </form>
    </section>
  );
}
