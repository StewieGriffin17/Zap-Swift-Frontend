import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { CreditCard, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      "::placeholder": { color: "#9ca3af" },
      fontFamily: "'Inter', system-ui, sans-serif",
      letterSpacing: "0.025em",
    },
    invalid: {
      color: "#ef4444",
    },
  },
  hidePostalCode: true,
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams();
  const { user } = useAuth();

  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [touched, setTouched] = useState({});

  // Billing state
  const [billingName, setBillingName] = useState("");
  const [billingLine1, setBillingLine1] = useState("");
  const [billingLine2, setBillingLine2] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingPostcode, setBillingPostcode] = useState("");

  const navigate = useNavigate()

  const { data: parcelInfo = {}, isLoading } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const amount = parcelInfo?.cost || 0;
  const amountInCents = amount * 100;

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const getFieldError = (field, value) => {
    if (!touched[field]) return "";
    if (!value) return "This field is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!stripe || !elements) return;

    // Mark all fields as touched
    setTouched({
      billingName: true,
      billingLine1: true,
      billingCity: true,
      billingPostcode: true,
    });

    // Validate required fields
    if (!billingName || !billingLine1 || !billingCity || !billingPostcode) {
      setError("Please fill in all required billing fields.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);

    try {
      const { error: methodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
          billing_details: {
            name: billingName,
            address: {
              line1: billingLine1,
              line2: billingLine2 || undefined,
              city: billingCity,
              postal_code: billingPostcode,
            },
          },
        });

      if (methodError) {
        setError(methodError.message);
        setIsProcessing(false);
        return;
      }

      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: billingName,
            address: {
              line1: billingLine1,
              line2: billingLine2 || undefined,
              city: billingCity,
              postal_code: billingPostcode,
            },
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        try {
          const paymentData = {
            parcelId,
            email: user.email,
            amount,
            transactionId: result.paymentIntent.id,
            paymentMethod: result.paymentIntent.payment_method_types,
          };

          await axiosSecure.post("/payments", paymentData);
        } catch (paymentSaveError) {
          console.error("Failed to save payment:", paymentSaveError);
        }

        setSuccessMessage("Payment completed successfully!");
        await Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            html: `<strong>Transaction ID: </strong> <code>${result.paymentIntent.id}</code>`,
            confirmButtonText: 'Go to My Parcels'
        })

        navigate('/dashboard/myParcels')

        elements.getElement(CardElement).clear();
        setBillingName("");
        setBillingLine1("");
        setBillingLine2("");
        setBillingCity("");
        setBillingPostcode("");
        setTouched({});
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#CFEA68] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#03373D] to-[#0B3B36] p-6 sm:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-6 h-6" />
            <h2 className="text-2xl sm:text-3xl font-bold">Secure Payment</h2>
          </div>
          <p className="text-gray-200 text-sm">
            Parcel ID: <span className="font-semibold">{parcelId}</span>
          </p>
        </div>

        {/* Payment Summary Card */}
        <div className="bg-gradient-to-r from-[#F6FAEF] to-[#E8F5E9] p-4 sm:p-6 border-b">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Parcel Title:</span>
              <span className="font-semibold text-gray-900 text-right">
                {parcelInfo.title || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Receiver:</span>
              <span className="font-semibold text-gray-900 text-right">
                {parcelInfo.receiverName || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Service Center:</span>
              <span className="font-semibold text-gray-900 text-right">
                {parcelInfo.receiverCenter || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-300">
              <span className="text-base font-bold text-gray-900">
                Amount Due:
              </span>
              <span className="text-2xl font-bold text-[#0B3B36]">
                ৳{amount}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Success Message */}
          {successMessage && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-sm font-medium text-green-800">
                {successMessage}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {/* Billing Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#CFEA68] flex items-center justify-center text-[#0B3B36] font-bold text-sm">
                1
              </div>
              Billing Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full rounded-lg border ${
                  getFieldError("billingName", billingName)
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-[#0B3B36] focus:ring-[#0B3B36]"
                } px-4 py-3 text-sm outline-none focus:ring-2 transition-colors`}
                type="text"
                placeholder="John Doe"
                value={billingName}
                onChange={(e) => setBillingName(e.target.value)}
                onBlur={() => handleBlur("billingName")}
              />
              {getFieldError("billingName", billingName) && (
                <p className="text-xs text-red-600 mt-1">
                  {getFieldError("billingName", billingName)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full rounded-lg border ${
                  getFieldError("billingLine1", billingLine1)
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-[#0B3B36] focus:ring-[#0B3B36]"
                } px-4 py-3 text-sm outline-none focus:ring-2 transition-colors`}
                type="text"
                placeholder="123 Main Street"
                value={billingLine1}
                onChange={(e) => setBillingLine1(e.target.value)}
                onBlur={() => handleBlur("billingLine1")}
              />
              {getFieldError("billingLine1", billingLine1) && (
                <p className="text-xs text-red-600 mt-1">
                  {getFieldError("billingLine1", billingLine1)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 2{" "}
                <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 focus:border-[#0B3B36] focus:ring-[#0B3B36] px-4 py-3 text-sm outline-none focus:ring-2 transition-colors"
                type="text"
                placeholder="Apartment, Suite, Floor"
                value={billingLine2}
                onChange={(e) => setBillingLine2(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full rounded-lg border ${
                    getFieldError("billingCity", billingCity)
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#0B3B36] focus:ring-[#0B3B36]"
                  } px-4 py-3 text-sm outline-none focus:ring-2 transition-colors`}
                  type="text"
                  placeholder="Dhaka"
                  value={billingCity}
                  onChange={(e) => setBillingCity(e.target.value)}
                  onBlur={() => handleBlur("billingCity")}
                />
                {getFieldError("billingCity", billingCity) && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("billingCity", billingCity)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full rounded-lg border ${
                    getFieldError("billingPostcode", billingPostcode)
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#0B3B36] focus:ring-[#0B3B36]"
                  } px-4 py-3 text-sm outline-none focus:ring-2 transition-colors`}
                  type="text"
                  placeholder="1200"
                  value={billingPostcode}
                  onChange={(e) => setBillingPostcode(e.target.value)}
                  onBlur={() => handleBlur("billingPostcode")}
                />
                {getFieldError("billingPostcode", billingPostcode) && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("billingPostcode", billingPostcode)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Card Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#CFEA68] flex items-center justify-center text-[#0B3B36] font-bold text-sm">
                2
              </div>
              Card Details
            </h3>

            <div className="relative">
              <div className="absolute top-3 right-3 z-10">
                <CreditCard className="w-5 h-5 text-gray-400" />
              </div>
              <div className="p-4 border-2 border-gray-300 rounded-lg bg-white hover:border-[#0B3B36] transition-colors">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className={`w-full py-4 text-base font-bold rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              isProcessing
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#CFEA68] text-[#0B3B36] hover:brightness-95 hover:shadow-xl hover:-translate-y-0.5"
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Pay ৳{amount}
              </>
            )}
          </button>

          {/* Security Notice */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <Lock className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600 leading-relaxed">
              Your payment is secured with 256-bit SSL encryption. We never
              store your card details. All transactions are processed securely
              through Stripe.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
