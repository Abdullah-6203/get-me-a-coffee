"use client";
import React from "react";
import Script from "next/script";
import { initiate } from "@/actions/useractions";
import { useState } from "react";
// REMOVE: import Razorpay from "razorpay";
import { useSession } from "next-auth/react";

const PaymentPage = ({ username }) => {
  const [paymentform, setpaymentform] = useState({});

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform);
    let orderID = a.id;

    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount,
      currency: "INR",
      name: "Get Me A Coffee",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderID,
      callback_url: `${process.env.URL}/api/razorpay`,
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

  const handleChange = (e) => {
    setpaymentform({
      ...paymentform,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <button id="rzp-button1">Pay</button>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="text-[#44210d] w-full relative">
        <img
          className="object-cover w-full h-100 "
          src="/77f738bf86188c93746c3a91c80ee32b.jpg"
          alt=""
        />
        <div className="pfp absolute -bottom-17 right-[45.5%] ">
          <img
            width={150}
            className="rounded-2xl border-4 border-red-900"
            src="/wallpaper-black.gif"
            alt=""
          />
        </div>
      </div>
      <div className="info flex justify-center items-center flex-col my-20 ">
        <span className="text-2xl font-medium">@{username}</span>
        <div className="font-light">
          Creating Graphic Designs For Coffee Shops
        </div>
        <div className="flex items-center justify-center gap-2 font-light">
          <span>9,102 Members</span>
          <span className="font-bold text-2xl">·</span>
          <span>82 Posts</span>
          <span className="font-bold text-2xl">·</span>
          <span>$15,290/release</span>
        </div>

        <div className="payment flex gap-3 w-[80%] mt-10">
          {/* Show list of all the supporters as a leaderboard */}

          <div className="supporters w-1/2 bg-[#bea6a0] p-3 text-[#44210d] rounded-2xl">
            <h2 className="text-xl text-center font-bold">Supporters</h2>
            <ul className="mx-4 mt-4">
              <li className="my-2 font-medium flex gap-2">
                <img
                  src="/user_icon-icons.com_57997.png"
                  className="bg-[#bea6a0] p-1 rounded-full"
                  width={20}
                  alt=""
                />{" "}
                Abdullah Donated <span className="font-bold">$20</span> with a
                message &quot;I Support you bro. Lots of Love&quot;
              </li>
              <li className="my-2 font-medium flex gap-2">
                <img
                  src="/user_icon-icons.com_57997.png"
                  className="bg-[#bea6a0] p-1 rounded-full"
                  width={20}
                  alt=""
                />{" "}
                Abdullah Donated <span className="font-bold">$20</span> with a
                message &quot;I Support you bro. Lots of Love&quot;
              </li>
              <li className="my-2 font-medium flex gap-2">
                <img
                  src="/user_icon-icons.com_57997.png"
                  className="bg-[#bea6a0] p-1 rounded-full"
                  width={20}
                  alt=""
                />{" "}
                Abdullah Donated <span className="font-bold">$20</span> with a
                message &quot;I Support you bro. Lots of Love&quot;
              </li>
            </ul>
          </div>
          <div className="makePayment w-1/2 bg-[#bea6a0] p-4 text-[#44210d] rounded-2xl">
            <h2 className="text-xl text-center font-bold">Make a Payment</h2>
            <form className="flex flex-col gap-3 mt-4 mb-2">
              <input
                onChange={handleChange}
                value={paymentform.amount || ""}
                name="amount"
                type="number"
                placeholder="Amount"
                className="p-2 rounded-2xl border-2 border-[#44210d] focus:outline-none focus:border-[#9e7761]"
              />
              <input
                onChange={handleChange}
                value={paymentform.name || ""}
                name="name"
                type="text"
                placeholder="Name"
                className="p-2 rounded-2xl border-2 border-[#44210d] focus:outline-none focus:border-[#9e7761]"
              />
              <textarea
                onChange={handleChange}
                value={paymentform.message || ""}
                name="message"
                placeholder="Message (Optional)"
                className="p-2 rounded-2xl border-2 border-[#44210d] focus:outline-none focus:border-[#9e7761]"
              ></textarea>
              <button className="bg-[#5f3b26] hover:bg-[#9e7761] text-[#e5c5b4] text-lg p-2 rounded-2xl hover:cursor-pointer">
                Pay
              </button>
            </form>
            {/* Choose from these amounts */}
            <span className="m-3 text-xl">Or</span>
            <div className="def-amt-btns flex gap-4 mt-2">
              <button
                className="bg-[#5f3b26] hover:bg-[#9e7761] text-[#e5c5b4] text-lg p-2 rounded-2xl hover:cursor-pointer"
                onClick={() => {
                  pay(5000);
                }}
              >
                Pay ₹50
              </button>
              <button
                className="bg-[#5f3b26] hover:bg-[#9e7761] text-[#e5c5b4] text-lg p-2 rounded-2xl hover:cursor-pointer"
                onClick={() => {
                  pay(10000);
                }}
              >
                Pay ₹100
              </button>
              <button
                className="bg-[#5f3b26] hover:bg-[#9e7761] text-[#e5c5b4] text-lg p-2 rounded-2xl hover:cursor-pointer"
                onClick={() => {
                  pay(20000);
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
