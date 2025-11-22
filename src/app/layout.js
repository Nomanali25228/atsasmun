import localFont from "next/font/local";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",

  other: {
    "facebook-domain-verification": "mml3zdfqldefvlr0c2k565t53zaohs",
  },
};

// RootLayout Component
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-color-mode="dark">
      <head>
        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Preload Custom Fonts */}
        <link
          rel="preload"
          href="/fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GeistMonoVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />

        {/* ✅ Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2290065558081192');
              fbq('track', 'PageView');
            `,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2290065558081192&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel */}
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ContextProvider>
          <NextTopLoader />
          <Toaster />
          <ToastContainer />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
