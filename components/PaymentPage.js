
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Script from "next/script";
import { initiate, fetchuser, fetchpayments } from "@/actions/useractions";
import { useState } from "react";
// REMOVE: import Razorpay from "razorpay";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";

const PaymentPage = ({ username }) => {
  // const { data: session } = useSession();

  const [paymentform, setpaymentform] = useState({});
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setpayments] = useState([]);
  const searchParams = useSearchParams();

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform);
    let orderID = a.id;

    var options = {
      key: currentUser.razorpayid,
      amount: amount,
      currency: "INR",
      name: "Get Me A Coffee",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderID,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentform.name || "",
        email: "",
        contact: "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options); // <-- use the global, not the import
    rzp1.open();
  };

  const getData = async () => {
    const u = await fetchuser(username);
    const dbpayments = await fetchpayments(username);
    return { user: u, payments: dbpayments };
  };

  useEffect(() => {
    getData().then(({ user, payments }) => {
      setcurrentUser(user);
      setpayments(payments);
    });
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast.success("Thanks for the contribution!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, []);

  const handleChange = (e) => {
    setpaymentform({
      ...paymentform,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />

      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="text-[#44210d] w-full relative">
      <img
        className="object-cover w-full h-48 sm:h-64 md:h-80 lg:h-100"
        src={
        currentUser?.coverPic
          ? currentUser.coverPic.startsWith("http")
          ? currentUser.coverPic
          : `/${currentUser.coverPic}`
          : "/77f738bf86188c93746c3a91c80ee32b.jpg"
        }
        alt=""
      />
      <div className="pfp absolute -bottom-10 sm:-bottom-12 md:-bottom-17 left-1/2 -translate-x-1/2">
        <img
        width={150}
        className="w-20 sm:w-28 md:w-[150px] h-auto rounded-2xl border-4 border-red-900"
        src={
          currentUser?.profilePic
          ? currentUser.profilePic.startsWith("http")
            ? currentUser.profilePic
            : `/${currentUser.profilePic}`
          : "/wallpaper-black.gif"
        }
        alt=""
        />
      </div>
      </div>

      <div className="info flex justify-center items-center flex-col mt-14 sm:mt-16 md:mt-20 mb-10 px-4">
      <span className="text-xl sm:text-2xl font-medium text-center break-words max-w-full">
        @{username}
      </span>
      <div className="font-light text-center">
        Let&apos;s Help {username} Grow
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-light text-center mt-2">
        <span>
        {payments.filter((p) => p.done === true).length} Payments Received
        </span>
        <span className="font-bold text-2xl">·</span>
        <span>
        ₹
        {payments
          .filter((p) => p.done === true)
          .reduce((a, b) => a + b.amount, 0)}{" "}
        Raised So far
        </span>
      </div>

      <div className="payment flex flex-col lg:flex-row gap-4 w-full max-w-6xl mt-8 md:mt-10">
        {/* Show list of all the supporters as a leaderboard */}

        <div className="supporters w-full lg:w-1/2 min-w-0 bg-[#bea6a0] p-3 sm:p-4 text-[#44210d] rounded-2xl">
        <h2 className="text-xl text-center font-bold">Top 10 Supporters</h2>
        <ul className="mx-1 sm:mx-4 mt-4">
          {payments.filter((p) => p.done === true).length === 0 ? (
          <li className="my-2 font-medium text-center">
            No payments yet
          </li>
          ) : (
          payments
            .filter((p) => p.done === true)
            .map((p, i) => {
            return (
              <li key={i} className="my-2 font-medium flex flex-wrap items-start gap-2 break-words">
              <img
                src="/user_icon-icons.com_57997.png"
                className="bg-[#bea6a0] p-1 rounded-full shrink-0"
                width={20}
                alt=""
              />
              <span className="min-w-0 flex-1 break-words">
                {p.name || "Anonymous"} Donated{" "}
                <span className="font-bold">₹{p.amount}</span>{" "}
                {(p.message && (
                <>with a message &quot;{p.message}&quot;</>
                )) ||
                "with lots of love"}
              </span>
              </li>
            );
            })
          )}
        </ul>
        </div>

        <div className="makePayment w-full lg:w-1/2 min-w-0 bg-[#bea6a0] p-3 sm:p-4 text-[#44210d] rounded-2xl">
        <h2 className="text-xl text-center font-bold">Make a Payment</h2>
        <div className="flex flex-col gap-3 mt-4 mb-2">
          <input
          onChange={handleChange}
          value={paymentform.amount || ""}
          name="amount"
          type="number"
          placeholder="Amount"
          className="w-full min-w-0 p-2 rounded-2xl border-2 border-[#44210d] focus:outline-none focus:border-[#9e7761]"
          />
          <input
          onChange={handleChange}
          value={paymentform.name || ""}
          name="name"
          type="text"
          placeholder="Name"
          className="w-full min-w-0 p-2 rounded-2xl border-2 border-[#44210d] focus:outline-none focus:border-[#9e7761]"
          />
          <textarea
          onChange={handleChange}
          value={paymentform.message || ""}
          name="message"
          placeholder="Message (Optional)"
          className="w-full min-w-0 p-2 rounded-2xl border-2 border-[#44210d] focus:outline-none focus:border-[#9e7761]"
          ></textarea>
          <button
          type="button"
          onClick={() => {
            pay(paymentform.amount);
          }}
          className="w-full bg-[#5f3b26] hover:bg-[#9e7761] text-[#e5c5b4] text-lg p-2 rounded-2xl hover:cursor-pointer"
          >
          Pay
          </button>
        </div>

        {/* Choose from these amounts */}
        <span className="m-3 text-xl">Or</span>
        <div className="def-amt-btns flex flex-wrap gap-2 sm:gap-4 mt-2">
          <button
          className="flex-1 min-w-[90px] bg-[#5f3b26] hover:bg-[#9e7761] text-[#e5c5b4] text-base sm:text-lg p-2 rounded-2xl hover:cursor-pointer"
          onClick={() => {
            pay(50);
          }}
          >
          Pay ₹50
          </button>
          <button
          className="flex-1 min-w-[90px] bg-[#5f3b26] hover:bg-[#9e7761] text-[#e5c5b4] text-base sm:text-lg p-2 rounded-2xl hover:cursor-pointer"
          onClick={() => {
            pay(100);
          }}
          >
          Pay ₹100
          </button>
          <button
          className="flex-1 min-w-[90px] bg-[#5f3b26] hover:bg-[#9e7761] text-[#e5c5b4] text-base sm:text-lg p-2 rounded-2xl hover:cursor-pointer"
          onClick={() => {
            pay(200);
          }}
          >
          Pay ₹200
          </button>
        </div>
        </div>
      </div>
      </div>
    </>
    );
};

export default PaymentPage;
