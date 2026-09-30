import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDB";
import User from "@/models/User";

export const POST = async (req) => {
  await connectDb();
  let body = await req.formData();
  body = Object.fromEntries(body);

  // check if razorpay order ID is present on the server
  let p = await Payment.findOne({ order_ID: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ Username: p.to_user });
  if (!user || !user.razorpaysecret) {
    return NextResponse.json({ error: "Recipient not configured for payments" }, { status: 400 });
  }
  const secret = user.razorpaysecret;

  // verify the payment
  let xx = validatePaymentVerification(
    { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
    body.razorpay_signature,
    secret
  );

  if (xx) {
    const updatedPayment = await Payment.findOneAndUpdate(
      { order_ID: body.razorpay_order_id },
      { done: true },
      { new: true }
    );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`,
      303
    );
  } else {
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }
};