"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Dashboard = () => {
  const router = useRouter();
  const [form, setform] = useState({});
  const { data: session, status, update } = useSession();

  const getData = async (username) => {
    const u = await fetchuser(username);
    return u;
  };

  useEffect(() => {
    if (status === "loading") return; // wait, session not resolved yet
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated" && session?.user?.name) {
      getData(session.user.name).then((data) => {
        if (data) setform(data);
      });
    }
  }, [status, session, router]);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

 

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.name) {
        toast.error("Session not ready yet, please try again in a moment.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
        return;
    }

    const formData = new FormData(e.target);
    const result = await updateProfile(formData, session.user.name);

    if (result?.error) {
        toast.error(result.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    } else {
        await update();
        toast.success("Profile Updated Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    }
};

  // Don't render the form at all until session status is known,
  // avoids any flash of unguarded state before redirect/fetch happens
  if (status === "loading") {
    return (
      <div className="container mx-auto py-5 px-6 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // redirect is already in-flight via useEffect
  }

  return (
    <>
      

      <div className="container mx-auto py-5 px-6 ">
        <h1 className="text-center my-5 text-3xl font-bold">
          Welcome to your Dashboard
        </h1>

        <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 text-[#44210d]"
            >
              Name
            </label>
            <input
              value={form.name || ""}
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              className="block w-full p-2 bg-[#b5907b] rounded-2xl text-[#44210d] border-[#692d0a] focus:ring-[#44210d] focus:border-[#44210d]"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 text-[#44210d]"
            >
              Email
            </label>
            <input
              value={form.email || ""}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="block w-full p-2 bg-[#b5907b] rounded-2xl text-[#44210d] border-[#692d0a] focus:ring-[#44210d] focus:border-[#44210d]"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 text-[#44210d]"
            >
              Username
            </label>
            <input
              value={form.Username || ""}
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              className="block w-full p-2 bg-[#b5907b] rounded-2xl text-[#44210d] border-[#692d0a] focus:ring-[#44210d] focus:border-[#44210d]"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="profilepic"
              className="block mb-2 text-sm font-medium text-gray-900 text-[#44210d]"
            >
              Profile Picture
            </label>
            <input
              value={form.profilepic || ""}
              onChange={handleChange}
              type="text"
              name="profilepic"
              id="profilepic"
              className="block w-full p-2 bg-[#b5907b] rounded-2xl text-[#44210d] border-[#692d0a] focus:ring-[#44210d] focus:border-[#44210d]"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="coverpic"
              className="block mb-2 text-sm font-medium text-gray-900 text-[#44210d]"
            >
              Cover Picture
            </label>
            <input
              value={form.coverpic || ""}
              onChange={handleChange}
              type="text"
              name="coverpic"
              id="coverpic"
              className="block w-full p-2 bg-[#b5907b] rounded-2xl text-[#44210d] border-[#692d0a] focus:ring-[#44210d] focus:border-[#44210d]"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="razorpayid"
              className="block mb-2 text-sm font-medium text-gray-900 text-[#44210d]"
            >
              Razorpay Id
            </label>
            <input
              value={form.razorpayid || ""}
              onChange={handleChange}
              type="text"
              name="razorpayid"
              id="razorpayid"
              className="block w-full p-2 bg-[#b5907b] rounded-2xl text-[#44210d] border-[#692d0a] focus:ring-[#44210d] focus:border-[#44210d]"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="razorpaysecret"
              className="block mb-2 text-sm font-medium text-gray-900 text-[#44210d]"
            >
              Razorpay Secret
            </label>
            <input
              value={form.razorpaysecret || ""}
              onChange={handleChange}
              type="text"
              name="razorpaysecret"
              id="razorpaysecret"
              className="block w-full p-2 bg-[#b5907b] rounded-2xl text-[#44210d] border-[#692d0a] focus:ring-[#44210d] focus:border-[#44210d]"
            />
          </div>

          <div className="my-6">
            <button
              type="submit"
              className="block w-full p-2 text-[#c7855f] text-xl bg-[#3e1c08] hover:text-[#ddc5b7] rounded-2xl hover:bg-[#94694f] hover:cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;