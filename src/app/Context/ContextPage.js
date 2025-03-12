"use client"
import React, { createContext,  useEffect,  useState } from 'react';
 const ContextPage = createContext();
export const ContextProvider = ({children}) => {
  const [imgfor,setImgfor] = useState(null)
const [amounts,setAmounts] = useState(0)
  const [check,setCheck] = useState("")
  useEffect(() => {
    if (amounts !== 0) { // Prevent saving 0 if it's not intentional
      localStorage.setItem('amounts', amounts);
    }
  }, [amounts]);
  useEffect(() => {
    const storedAmount = localStorage.getItem('amounts');
    if (storedAmount) {
      setAmounts(Number(storedAmount)); // Set state to stored value
    }
  }, []);
  return (
    <ContextPage.Provider value={{check,setCheck,imgfor,setImgfor,amounts,setAmounts}}>
      {children}
    </ContextPage.Provider>
  );
};
export default ContextPage;