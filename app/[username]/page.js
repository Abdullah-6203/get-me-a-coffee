/* eslint-disable @next/next/no-img-element */
import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import connectDb from "@/db/connectDB";
import User from "@/models/User";

const Username = async ({ params }) => {
  const { username } = await params;

  // look the user up in MongoDB
  await connectDb();
  const user = await User.findOne({ Username: username }).lean();

  // no such user -> 404 page
  if (!user) {
    notFound();
  }

  // user exists -> convert to a plain object and open their page
  const currentUser = JSON.parse(JSON.stringify(user));

  return <PaymentPage username={username} currentUser={currentUser} />;
};

export default Username;