/* eslint-disable react/prop-types */
// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./checkoutfrom.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CheckoutForm = ({ camp, refetch, setModalOpen }) => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    getPaymentIntent();
  }, [camp]);

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post(`/create-payment-intent`, {
        campId: camp?._id,
        fees: camp?.campDetails.fees,
      });
      setClientSecret(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(clientSecret);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm Payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: camp?.participantName,
          email: camp?.participantEmail,
        },
      },
    });
    console.log(paymentIntent);
    // set database payment info
    if (paymentIntent.status === "succeeded") {
      try {
        // after successfully pement change payment and confirmation status
        await axiosSecure.patch(
          `${import.meta.env.VITE_API_URL}/pending-status/${camp._id}`
        );

        // set payment data in server side database
        await axiosSecure.post("/payment-success", {
          campName: camp?.campDetails.name,
          campFees: camp?.campDetails.fees,
          paymentStatus: camp?.paymentStatus,
          confirmationStatus: camp?.confirmationStatus,
          transactionId: paymentIntent?.id,
        });
        toast.success("Payment successfully");
        refetch();
      } catch (error) {
        console.error(error);
      } finally {
        // setProcessing(false);
        setModalOpen(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "20px",
              color: "#00897B",
              "::placeholder": {
                color: "#00897B",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="px-4 py-2 bg-teal-600 text-white font-bold rounded-md"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
