// app/components/GTM.tsx
"use client";

import { useEffect } from "react";
import TagManager from "react-gtm-module";

const GTM_ID = "GTM-KJ9N2CBP"; // Replace with your actual GTM ID

const GTM = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      TagManager.initialize({ gtmId: GTM_ID });
    }
  }, []);

  return null;
};

export default GTM;
