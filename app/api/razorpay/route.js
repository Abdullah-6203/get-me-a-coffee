import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDB";


export const POST = async (req) => {
    await connectDb();
    let body = await req.formData();
    body = Object.fromEntries(body);

    //check if razorpayOrder ID preent on the server

    let p = await Payment.findOne({ order_ID: body.razorpay_order_id });
    if(!p){
        return NextResponse.json({error: "Payment not found"}, {status: 404});
    }

    //verify the payment
    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, process.env.KEY_SECRET);

    //updating payment

    if(xx){
        const updatedPayment = await Payment.findOneAndUpdate({order_ID: body.razorpay_order_id}, {done: true}, {new: true});
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`,
            303
          );
    }
    else{
        return NextResponse.json({error: "Payment verification failed"}, {status: 400});
    }
}