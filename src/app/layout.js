import localFont from "next/font/local";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "./Context/ContextPage";
import Script from "next/script";
import GTM from "./(component)/GTM"; // Import GTM component

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
    "Atsas MUN is an international platform where participants experience the truest simulation of the United Nations. Join us now for your future in diplomacy.",
};

// RootLayout Component
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Google Tag Manager - Head */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=GTM-KJ9N2CBP'+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KJ9N2CBP');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KJ9N2CBP"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <ContextProvider>
          <NextTopLoader /> {/* Top loader for navigation transitions */}
          <Toaster /> {/* Hot Toast notifications */}
          <ToastContainer /> {/* Toastify notifications */}
          <GTM /> {/* Google Tag Manager */}
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
