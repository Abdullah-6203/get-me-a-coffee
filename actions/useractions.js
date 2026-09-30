"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDB";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();

  const user = await User.findOne({ Username: to_username });
  if (!user || !user.razorpayid || !user.razorpaysecret) {
    throw new Error("This creator hasn't set up payments yet.");
  }

  const instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: user.razorpaysecret,
  });

  const options = {
    amount: Number.parseInt(amount) * 100,
    currency: "INR",
  };
  const x = await instance.orders.create(options);

  await Payment.create({
    order_ID: x.id,
    amount: amount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });

  return x;
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

export const updateProfile = async (data, oldusername) => {
  await connectDb();
  const ndata = Object.fromEntries(data);

  try {
    if (oldusername !== ndata.username) {
      const existing = await User.findOne({ Username: ndata.username });
      if (existing) {
        return { error: "Username already exists" };
      }
    }

    const result = await User.updateOne(
      { email: ndata.email },
      {
        $set: {
          name: ndata.name,
          Username: ndata.username,
          profilePic: ndata.profilepic,
          coverPic: ndata.coverpic,
          razorpayid: ndata.razorpayid,
          razorpaysecret: ndata.razorpaysecret,
        },
      }
    );

    if (result.matchedCount === 0) {
      return { error: "User not found — could not update" };
    }

    return { success: true };
  } catch (err) {
    console.error("updateProfile error:", err);
    return { error: err.message || "Something went wrong" };
  }
};
