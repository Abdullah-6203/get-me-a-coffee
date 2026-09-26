"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDB";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
  var instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID,
    key_secret: process.env.KEY_SECRET
  });

  let options = {
    amount: Number.parseInt(amount) * 100,
    currency: "INR",
  }
  let x = await instance.orders.create(options);

  //Create a payment object that shows a pending payment

  await Payment.create({
    order_ID: x.id,
    amount: amount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  })

  return x
};

export const fetchuser = async (username) => {
  await connectDb();
  const user = await User.findOne({ Username: username }).lean();
  return user ? JSON.parse(JSON.stringify(user)) : null;
};

export const fetchpayments = async (username) => {
  await connectDb();
  const payments = await Payment.find({ to_user: username })
    .sort({ amount: -1 })
    .lean();
  return JSON.parse(JSON.stringify(payments));
};