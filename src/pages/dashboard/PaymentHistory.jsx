import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    data: payments = [],
  } = useQuery({
    queryKey: ["payments", user.email],
    enabled: !!user?.email,
    queryFn: async () => {
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        return res.data;
    },
  });

  // helper: format date nicely
  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#CFEA68] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading payment history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0B3B36]">
            Payment History
          </h2>
          <p className="text-sm text-gray-600">
            All completed payments under{" "}
            <span className="font-medium text-[#0B3B36]">
              {user?.email || "—"}
            </span>
          </p>
        </div>

        <div className="text-sm text-gray-700 bg-[#F6FAEF] border border-[#CFEA68]/60 rounded-lg px-4 py-2 inline-block">
          Total Payments:{" "}
          <span className="font-semibold text-[#0B3B36]">
            {payments.length}
          </span>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500 text-sm bg-gray-50">
          No payments found yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-100 rounded-lg overflow-hidden">
            <thead className="bg-[#F6FAEF] text-[#0B3B36] uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 border-b">Transaction ID</th>
                <th className="px-4 py-3 border-b">Parcel ID</th>
                <th className="px-4 py-3 border-b">Method</th>
                <th className="px-4 py-3 border-b">Amount</th>
                <th className="px-4 py-3 border-b">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pmt) => (
                <tr
                  key={pmt._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 border-b align-top">
                    <div className="font-mono text-[11px] leading-4 text-gray-800 break-all">
                      {pmt.transactionId || "—"}
                    </div>
                  </td>

                  <td className="px-4 py-3 border-b align-top">
                    <div className="font-mono text-[11px] leading-4 text-gray-700 break-all">
                      {pmt.parcelId || "—"}
                    </div>
                  </td>

                  <td className="px-4 py-3 border-b align-top">
                    {/* paymentMethod could be "card" or an array like ["card"] based on your example */}
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium bg-[#CFEA68] text-[#0B3B36]">
                      {Array.isArray(pmt.paymentMethod)
                        ? pmt.paymentMethod[0] || "—"
                        : pmt.paymentMethod || "—"}
                    </span>
                  </td>

                  <td className="px-4 py-3 border-b align-top text-gray-800 font-semibold">
                    ৳{pmt.amount ?? 0}
                  </td>

                  <td className="px-4 py-3 border-b align-top text-gray-700 text-xs">
                    {formatDate(pmt.paidISO || pmt.paidAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
