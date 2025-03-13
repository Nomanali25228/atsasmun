import localFont from "next/font/local";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "./Context/ContextPage";

// Define fonts with localFont
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata configuration
export const metadata = {
  title: "Atsas Model United Nations",
  description:
    "Atsas MUN is an international platform where participants experience the truest simulation of the United Nations. We aim to provide an immersive and adventurous experience for our delegates. Join us now for your futurem of diplomacy.",
    other: {
      "facebook-domain-verification": "mml3ldefvlr0c2k565t53zaohs",
  }
};

// RootLayout Component
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-color-mode="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider>
          <NextTopLoader /> {/* Top loader for navigation transitions */}
          <Toaster /> {/* Hot Toast notifications */}
          <ToastContainer /> {/* Toastify container */}
          {children} {/* Render children components */}
        </ContextProvider>
      </body>
    </html>
  );
}
