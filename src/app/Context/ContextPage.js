"use client"
import React, { createContext,  useEffect,  useState } from 'react';
 const ContextPage = createContext();
export const ContextProvider = ({children}) => {
  const [imgfor,setImgfor] = useState(null)
const [amounts,setAmounts] = useState(0)
  const [check,setCheck] = useState("")
  const [refresh,setRefresh] = useState(false)

  // 1 dubai dates/////////////////////////////////////
  const [dubaidates,setDubaidates] = useState({
    startdate: "Coming Soon",
    enddate:"",
    month:"",
    year:""
  })

  // 2 istanbul dates/////////////////////////////////////
   const [istanbuldates,setIstanbuldates] = useState({
    startdate: "29 October",
    enddate:"1",
    month:"November",
    year:"2026"
  })

   // 3 Saudia  dates/////////////////////////////////////
   const [saudidates,setSaudidates] = useState({
    startdate: "Coming Soon",
    enddate:"",
    month:"",
    year:""
  })

  // 4 New York dates/////////////////////////////////////
    const [newyorkdates,setNewyorkdates] = useState({ 
    startdate: "Coming Soon",
    enddate:"",
    month:"",
    year:""
  })

   // 5 London dates/////////////////////////////////////
    const [londondates,setLondondates] = useState({
    startdate: "Coming Soon",
    enddate:"",
    month:"",
    year:""
  })

    // 6 Baku dates/////////////////////////////////////
  const [bakudates,setBakudates] = useState({
    startdate: "Coming Soon",
    enddate:"",
    month:"",
    year:""
  })

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
    <ContextPage.Provider value={{check,setCheck,imgfor,setImgfor,amounts,setAmounts,refresh,setRefresh,dubaidates,setDubaidates,istanbuldates,setIstanbuldates ,saudidates,setSaudidates,newyorkdates,setNewyorkdates,londondates,setLondondates,bakudates,setBakudates}}>
      {children}
    </ContextPage.Provider>
  );
};
export default ContextPage;