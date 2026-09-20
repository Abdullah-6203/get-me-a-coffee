import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GetMeACoffee - A Website For Coffee Lovers",
  description:
    "This website is a crowdfunding platform for coffee lovers to support their favorite coffee shops and baristas.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      
      <body className="min-h-screen flex flex-col">
      <SessionWrapper>
        <Navbar />
        <div className="min-h-[85vh] bg-[#f7edeb]">
          {children}
        </div>
        <Footer />
      </SessionWrapper>
      </body>
      
    </html>
  );
}
