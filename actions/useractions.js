"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDB";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
  var instance = new Razorpay({
    key_id: process.env.KEY_ID,
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
