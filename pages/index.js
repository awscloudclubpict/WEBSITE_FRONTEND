import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import SignUpStudent from "../sections/sign-up-student"; // Default landing page
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  // Default landing page is now student signup
  return <SignUpStudent />;
}
