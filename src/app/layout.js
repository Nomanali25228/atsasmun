import localFont from "next/font/local";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "./Context/ContextPage";
import Script from "next/script"; // Import Next.js Script

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
};

// RootLayout Component
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-color-mode="dark">
      <head>
        {/* Google Tag Manager - Head */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P3HW53NP');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager - Body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P3HW53NP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

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
