import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/parcels/${id}`);

        if (res.data?.result?.deletedCount > 0) {
          Swal.fire(
            "Deleted!",
            "Parcel has been deleted successfully.",
            "success"
          );
          refetch();
        } else {
          Swal.fire("Error!", "Parcel could not be deleted.", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting parcel:", error);
      Swal.fire("Error!", "Failed to delete parcel.", "error");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
      <h2 className="text-2xl font-extrabold text-[#0B3B36] mb-6">
        My Parcels ({parcels.length})
      </h2>

      {parcels.length === 0 ? (
        <p className="text-gray-500 text-sm">No parcels found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-100">
            <thead className="bg-[#F6FAEF] text-[#0B3B36] uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 border-b">Tracking ID</th>
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">Type</th>
                <th className="px-4 py-3 border-b">Cost</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Payment</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2 border-b font-mono text-xs text-gray-700">
                    {parcel.trackingId || "—"}
                  </td>
                  <td className="px-4 py-2 border-b font-medium text-gray-800">
                    {parcel.title}
                  </td>
                  <td className="px-4 py-2 border-b capitalize text-gray-700">
                    {parcel.type}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-700">
                    ৳{parcel.cost || 0}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        parcel.delivery_status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : parcel.delivery_status === "not_collected"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {parcel.delivery_status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        parcel.payment_status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {parcel.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <button
                      onClick={() => setSelectedParcel(parcel)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => console.log("Pay logic later")}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for parcel details */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedParcel(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-[#0B3B36] mb-4">
              Parcel Details
            </h3>

            {/* Parcel Info */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#0B3B36] mb-2">
                Parcel Information
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Tracking ID:</span>{" "}
                  {selectedParcel.trackingId}
                </p>
                <p>
                  <span className="font-semibold">Type:</span>{" "}
                  {selectedParcel.type}
                </p>
                <p>
                  <span className="font-semibold">Title:</span>{" "}
                  {selectedParcel.title}
                </p>
                <p>
                  <span className="font-semibold">Cost:</span> ৳
                  {selectedParcel.cost}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {selectedParcel.delivery_status}
                </p>
                <p>
                  <span className="font-semibold">Payment:</span>{" "}
                  {selectedParcel.payment_status}
                </p>
              </div>
            </div>

            {/* Sender Info */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#0B3B36] mb-2">
                Sender Information
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedParcel.senderName}
                </p>
                <p>
                  <span className="font-semibold">Contact:</span>{" "}
                  {selectedParcel.senderContact}
                </p>
                <p>
                  <span className="font-semibold">Service Center:</span>{" "}
                  {selectedParcel.senderCenter}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedParcel.senderAddress}
                </p>
                <p className="col-span-2">
                  <span className="font-semibold">Pickup Instruction:</span>{" "}
                  {selectedParcel.pickupInstruction}
                </p>
              </div>
            </div>

            {/* Receiver Info */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#0B3B36] mb-2">
                Receiver Information
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedParcel.receiverName}
                </p>
                <p>
                  <span className="font-semibold">Contact:</span>{" "}
                  {selectedParcel.receiverContact}
                </p>
                <p>
                  <span className="font-semibold">Service Center:</span>{" "}
                  {selectedParcel.receiverCenter}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedParcel.receiverAddress}
                </p>
                <p className="col-span-2">
                  <span className="font-semibold">Delivery Instruction:</span>{" "}
                  {selectedParcel.deliveryInstruction}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedParcel(null)}
                className="px-4 py-2 text-sm font-semibold rounded-md bg-[#CFEA68] text-[#0B3B36] hover:brightness-95 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
