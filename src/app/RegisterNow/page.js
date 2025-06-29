'use client';
import Image from 'next/image';
import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background
import { useContext, useEffect, useState } from 'react';
import Footer from '../(component)/footer/Footer';
import ScrollToTop from '../(component)/Scrolltotop/ScrollToTop';
import 'react-phone-number-input/style.css'; // Ensure you are importing the style correctly
import st from "@/app/public/img/register.webp"; // Ensure the path is correct
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import RegisterNav from '../(component)/register nav/RegisterNav';
import ReactFlagsSelect from "react-flags-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles
import Whatsapp from '../(component)/whatsapp/Whatsapp';
import ContextPage from '../Context/ContextPage';
import istan from '@/app/public/img/istun.jpg';
import istan1 from '@/app/public/img/Azerbaijan.jpeg';
import istan2 from '@/app/public/img/paris.jpeg';
import istan3 from '@/app/public/img/bgUSA.jpg';
import istan4 from '@/app/public/img/riyadhcity.jpg';
import istan5 from '@/app/public/img/dubia.jpg';
import Loader from '../component/loader/Loader';
import next from 'next';

const countryNames = {
  AF: "Afghanistan",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo (Democratic Republic)",
  CK: "Cook Islands",
  CR: "Costa Rica",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  CW: "Curaçao",
  CI: "Côte d'Ivoire",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran",
  IQ: "Iraq",
  IE: "Ireland",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Macedonia",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "India",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia (Federated States of)",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  KP: "North Korea",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  RE: "Réunion",
  BL: "Saint Barthélemy",
  KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin",
  PM: "Saint Pierre and Miquelon",
  VC: "Saint Vincent and the Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome and Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SX: "Sint Maarten",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  SS: "South Sudan",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard and Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: " Saudi Arabia",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "UKraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States of America",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VI: "U.S. Virgin Islands",
  VE: "Venezuela",
  VN: "Viet Nam",
  WF: "Wallis and Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe"
};

export default function Home() {
  const totalSteps = 6; // Total steps in the form
  const stepTexts = ["Please enter your contact information", "Please enter your regional information", "Nearly finished - just a few more questions", "We are almost done...", "You may submit the registration form now"]; // Step texts
  const [step, setStep] = useState(1); // Current step
  const [submitted, setSubmitted] = useState(false); // Submission status
  const [phone, setPhone] = useState('');
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedResidency, setSelectedResidency] = useState("");
  const [selectedRepresenting, setSelectedRepresenting] = useState("");
  const [imgchange, setImgchange] = useState(st)
  const calculateProgress = () => Math.min((step / totalSteps) * 100, 100); // Ensure max 100%
  
  const handleNextStep = () => {
    if (validateForm(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else if (step === totalSteps) {
        setSubmitted(true); // Mark form as submitted
      }

    }

  };
  const { check, setCheck } = useContext(ContextPage)
  const [institution, setInstitution] = useState("");
  const [disability, setDisability] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [shirtSize, setShirtSize] = useState("");
  const [destination, setDestination] = useState(check);
  const [foodPreference, setFoodPreference] = useState("");
  const [heardAboutUs, setHeardAboutUs] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [toggle, setToggle] = useState(false); // State for toggle (checkbox)
  const [no, setNo] = useState(true)
  const [no1, setNo1] = useState(true)
  const [no2, setNo2] = useState(true)
  const [no3, setNo3] = useState(true)
  const [no4, setNo4] = useState(true)
  const [no5, setNo5] = useState(true)

  const [searchTerm, setSearchTerm] = useState(""); // Search inside the dropdown

  const filteredCountries = Object.keys(countryNames).filter((code) =>
    countryNames[code].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // istan from '@/app/public/img/istun.jpg';
  // import istan1 from '@/app/public/img/kulua.jpg';
  // import istan2 from '@/app/public/img/paris.jpeg';
  // import istan3 from '@/app/public/img/USA.jpg';
  // import istan4 from '@/app/public/img/geneva.jpg';
  // import istan5 from '@/app/public/img/dubia.jpg';
  const [change, setChange] = useState({})
  const [loader, setLoader] = useState(false)
  const [attachment, setAttachment] = useState(istan);
  const [chnageApi, setChangeApi] = useState("")

  useEffect(() => {
    if (destination == "Istanbul, Turkey") {
      setChange({
        from: '11th',
        to: '14th',
        th: 'September,2025',

      })

      console.log(change["from"]); // "7th"

    }
    else if (destination == "Dubai, UAE") {

      setChange({
        from: '2nd ',
        to: '5th',
        th: 'October , 2025'

      })

    } else if (destination == "Baku, Azerbaijan") {

      setChange({
        from: '06th ',
        to: '09th',
        th: 'November, 2025'

      })

    } else if (destination == "New York, USA") {

      setChange({
        from: '12th ',
        to: '15th',
        th: 'February, 2026'

      })

    } else if (destination == "Riyadh, Saudi Arabia") {

      setChange({
        from: '16th ',
        to: '19th',
        th: 'october, 2025'

      })
    }
    else if (destination == "London, UK") {
      setImgchange(istan2)
      setChange({
        from: '20th ',
        to: '24th',
        th: 'November, 2025'

      })

    }
  }, [destination])


  useEffect(() => {
    if (check == "Istanbul, Turkey") {

      setNo1(false)
      setNo2(false)
      setNo3(false)
      setNo4(false)
      setNo5(false)
      setImgchange(istan)

      console.log(change["from"]); // "7th"

    }
    else if (check == "Dubai, UAE") {
      setNo(false)
      setNo2(false)
      setNo3(false)
      setNo4(false)
      setNo5(false)
      setImgchange(istan5)


    } else if (check == "Baku, Azerbaijan") {
      setNo1(false)
      setNo(false)
      setNo3(false)
      setNo4(false)
      setNo5(false)
      setImgchange(istan1)


    } else if (check == "New York, USA") {
      setNo1(false)
      setNo2(false)
      setNo(false)
      setNo4(false)
      setNo5(false)
      setImgchange(istan3)


    } else if (check == "Riyadh, Saudi Arabia") {
      setNo1(false)
      setNo2(false)
      setNo3(false)
      setNo(false)
      setNo5(false)
      setImgchange(istan4)

    }
    else if (check == "London, UK") {
      setNo1(false)
      setNo2(false)
      setNo3(false)
      setNo4(false)
      setNo(false)
      setImgchange(istan2)


    }
  }, [check, setCheck])

  useEffect(() => {
    if (destination == "Istanbul, Turkey") {
      setChangeApi("firstnames")
      setImgchange(istan)

    }
    else if (destination == "Dubai, UAE") {
      setChangeApi("secondenames")


      setImgchange(istan5)


    } else if (destination == "Baku, Azerbaijan") {
      setChangeApi("thirdnames")

      setImgchange(istan1)


    } else if (destination == "New York, USA") {
      setChangeApi("fournames")

      setImgchange(istan3)


    } else if (destination == "Riyadh, Saudi Arabia") {
      setChangeApi("fivenames")

      setImgchange(istan4)

    }
    else if (destination == "London, UK") {
      setChangeApi("fivthnames")

      setImgchange(istan2)


    }
  }, [destination, setDestination])


  // const [loading, setLoading] = useState(false); // State for loading

  const handleBackStep = () => {
    if (step > 1 && !submitted) {
      setStep(step - 1);
    }
  };

  // strapi fuction//////////////////////////////////////////////////////////////////////////////////////////////

  const [formData, setFormData] = useState({
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Email: '',
    ReEnterEmail: '',
    PhoneNumber: '',
    Gender: '',
    DateBirth: '',
    Nationality: '',
    Residency: '',
    Address: '',
    City: '',
    ProvinceState: '',
    PostelCode: '0000',
    NameOfTheInstitutionYouAttend: '',
    AnyDisabilities: '',
    HowDidYouGetToKnowAboutUs: '',
    WereYouProvidedWithAnyReferralCode: '',
    DoYouHaveAFoodpreference: '',
    WhatIsYourShirtSize: '',
    WhichUNCommitteeDoYouPreferForTheEvent: '',
    WhichCountryDoYouWantToRepresent: '',
    HaveYouAttendSimilarInternationalProgramsBefore: '',
    WhatExcitesYouTheMostAboutJoiningOurProgram: '',
    AnyThingElseThatYouWantToShare: '',
    Destinations: check == "" ? "" : check,
  });




  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "") {
      alert("fill all the field")
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    // Check if all required fields are filled
    if (
      !formData.FirstName ||
      !formData.LastName ||
      !formData.Email ||
      !formData.ReEnterEmail ||
      !formData.Gender ||
      !formData.DateBirth ||
      !formData.PhoneNumber ||
      !formData.Destinations
    ) {
      toast.info('Please fill out all required fields.');
      return false;
    }

    // Check if emails match
    if (formData.Email !== formData.ReEnterEmail) {
      toast.info('Emails do not match.');
      return false;
    }

    // Validate Date of Birth
    const today = new Date();
    const enteredDate = new Date(formData.DateBirth);

    // Check if the date is valid
    if (isNaN(enteredDate)) {
      toast.info('Please enter a valid birth date.');
      return false;
    }

    // Check if the date is in the future
    if (enteredDate > today) {
      toast.info('Birth date cannot be in the future.');
      return false;
    }

    // Check if the age is within a valid range (18 to 120 years)
    var age = today.getFullYear() - enteredDate.getFullYear();
    var monthDiff = today.getMonth() - enteredDate.getMonth();
    var dayDiff = today.getDate() - enteredDate.getDate();

    // Adjust age if the current date is before the birthday this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age < 7) {
      toast.info('You must be at least 7 years old to register.');
      return false;
    }
    if (age > 90) {
      toast.info('Please enter a realistic birth date.');
      return false;
    }

    return true; // All validations passed
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    const customerResponse = await fetch("/api1/get-or-create-customer", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.Email }),
    });

    if (!customerResponse.ok) {
      const errorData = await customerResponse.json();
      throw new Error(`Customer creation failed: ${errorData.error || "Unknown error"}`);
      console.log("error");
        setLoader(false)

    }

    const { customerId } = await customerResponse.json();

    if (!customerId) {
      throw new Error("Customer ID not returned from Stripe API.");
      console.log("error");
        setLoader(false)

    }



    console.log('Form data:', formData);  // Log form data to check if it's correct

    if (!validateForm()) return;
    try {
      const response = await axios.post(`https://atsas-backend.onrender.com/api/${chnageApi}`, {
        data: {
          ...formData,
          customerId: customerId
        }

      });

      if (response.status === 200) {
        alert('Form submitted successfully!');

        setFormData({
          FirstName: '',
          MiddleName: '',
          LastName: '',
          Email: '',
          ReEnterEmail: '',
          PhoneNumber: '',
          Gender: '',
          DateBirth: '',
          Nationality: '',
          Residency: '',
          Address: '',
          City: '',
          ProvinceState: '',
          PostelCode: '',
          NameOfTheInstitutionYouAttend: '',
          AnyDisabilities: '',
          HowDidYouGetToKnowAboutUs: '',
          WereYouProvidedWithAnyReferralCode: '',
          DoYouHaveAFoodpreference: '',
          WhatIsYourShirtSize: '',
          WhichUNCommitteeDoYouPreferForTheEvent: '',
          WhichCountryDoYouWantToRepresent: '',
          HaveYouAttendSimilarInternationalProgramsBefore: '',
          WhatExcitesYouTheMostAboutJoiningOurProgram: '',
          AnyThingElseThatYouWantToShare: '',
          Destinations: check == "" ? "" : check,
        });
        setSelectedNationality(""); // Reset nationality selection
        setSelectedResidency(""); // Reset residency selection
        setSelectedRepresenting(""); // Reset representing country selection

      }
      console.log("response of First Name Api++++: ", response.data.data.id);
      localStorage.setItem("userEmail", formData.Email);
      localStorage.setItem("customerId", customerId);
      var id = response.data.data.id
      
        if (destination == "Istanbul, Turkey") {
          var g = "IstanbulContact"
          ha34(e, id, g)
        } else if (destination == "Dubai, UAE") {
          var g = "DubaiContact"
          ha34(e, id, g)
        } else if (destination == "Baku, Azerbaijan") {
          var g = "AzerbaijanContact"
          ha34(e, id, g)
        } else if (destination == "New York, USA") {
          var g = "USAContact"
          ha34(e, id, g)
        } else if (destination == "Riyadh, Saudi Arabia") {
          var g = "SaudiContact"
          ha34(e, id, g)
        }
        else if (destination == "London, UK") {
          var g = "UKContact"
          ha34(e, id, g)



      } 
     
    } catch (error) {
      // console.error('Submission error:', error);
      if (error.response && error.response.data) {
        // alert(`Error submitting form: ${error.response.data.error.message}`);
        console.log(alert);
setLoader(false)
      } else {
        toast.error('An unknown error occurred. Please try again.');
        if (step < totalSteps) {
          setStep(step);

        } 
        setLoader(false)

      }
    }


  };
  const ha34 = async (event, id, g) => {
    event.preventDefault();
    // setLoading(true);

    try {
      const response = await fetch(`/api1/${g}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, destination, id, }),

      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const data = await response.json();
      console.log('Email sent successfully:', data);
      cronjob(event, name, email, id)
      setName('');
      setEmail('');
      console.log(data);

      // Top par scroll kare
      




    } catch (error) {
      console.error(error);
      setLoader(false)
      toast.error('Error sending message. Please try again.');
      if (step > 1 && !submitted) {
        setStep(5);
      }
    } finally {
    }

  };
  const cronjob = async (event, name, email, id) => {
    console.log("cronjob",id, name, email);
    
    event.preventDefault();
  
    try {
      const response = await axios.post(`https://atsas-backend.onrender.com/api/notifications`, {
        data: {
          Email: email,
          FirstName: name,
          Idname: id,
          Destinations: destination,
        },
      });
  
      if (response.status === 200) {
        
      setLoading(false);

        console.log("ok");
      }
      if (step < totalSteps) {
        setStep(step + 1);}
        else if (step === totalSteps) {
          setSubmitted(true); // Mark the form as submitted
        }
        window.scrollTo({
          top: 0,
          behavior: "smooth", // Smooth scrolling effect
        });
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error submitting form:', error.response.data.error?.message || error.response.data);
        toast.error(`Error: ${error.response.data.error?.message || 'Something went wrong'}`);
        setLoading(false);
        if (step > 1 && !submitted) {
          setStep(5);
        }
      } else {
        toast.error('An unknown error occurred. Please try again.');
        setLoading(false);
        if (step > 1 && !submitted) {
          setStep(5);
        }
      }
  
    } 
    setLoader(false)
  };
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Easing for the animation
      once: true, // Whether animation should happen only once
    });
  }, []);

  // open email ///////////////////////////////////////////////


  // const openEmailClient = () => {
  //   window.open('https://mail.google.com/', '_blank');
  // };

  const smoothScrollToTop = () => {
    const scrollStep = -window.scrollY / 50; // Adjust 50 for slower/faster scrolling
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval); // Stop scrolling when top is reached
      }
    }, 10); // Adjust 10ms interval for smoother effect
  };






  return (
    <div>
      {/* Navbar */}

      <RegisterNav />


      {/* Hero Section */}
      <header
        className="relative bg-cover  bg-center h-[20%] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#040618] bg-opacity-50 z-0"></div>

        {/* Hero Content */}
        <div className="relative lg:w-[80%] md:w-[85%] sm:w-[90%] w-[90%]  py-32 z-10">

          <div data-aos="fade-right" className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Registrations for Atsas International MUN
            </h2>
          </div>
          <div >
            <div data-aos="fade-up" className="w-full max-w-7xl bg-gradient-to-b from-blue-100 to-pink-100 shadow-xl rounded-xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Mobile Text Section */}
                <div className="w-full h-52 relative block lg:hidden ">
                  <Image
                    src={imgchange}
                    alt="Istanbul International MUN"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl lg:rounded-none lg:rounded-l-xl"
                  />

                  {/* Semi-Transparent Blurred Box */}
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[60%] md:w-[50%]  backdrop-blur-sm  bg-black bg-opacity-50 rounded-lg p-4 text-white text-center">
                  <div className=' relative z-10'>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                      Atsas International MUN
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg mt-2">
                      {destination === "" ? "" : "at"} {check === "" ? destination : check}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg mt-1">
                      {destination === "" ? "" : "from "} {change.from}{destination === "" ? "" : " to "} {change.to}
                      <sup>{destination === "" ? "" : "th "}</sup> {change.th}
                    </p>
                    </div>
                  </div>
                </div>





                {/* Desktop Image Section */}
                <div className="hidden lg:block lg:w-1/3 relative">
                  <Image
                    src={imgchange}
                    alt="Istanbul International MUN"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl lg:rounded-none lg:rounded-l-xl"
                  />
                  <div className="absolute   inset-0 bg-black bg-opacity-50 text-white p-4 sm:p-6 md:p-8">
                    <div className='bg-[#0000003b] mt-60 backdrop-blur-sm py-2 rounded-lg'>

                      <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center leading-tight">
                        Atsas International MUN
                      </h2>
                      <div className='flex justify-center font-semibold items-center'>
                        <p className="text-sm sm:text-base mt-2 ">{destination == "" ? "" : "at"} {check == "" ? destination : check}</p>
                      </div>
                      <div className='flex justify-center items-center'>
                        <p className="text-sm sm:text-base font-semibold mt-1">
                          {destination === "" ? "" : "from "} {change.from}   {destination === "" ? "" : "to "} {change.to}{} {change.th}

                        </p>
                      </div>

                    </div>
                  </div>
                </div>
                {/* Form Section */}
                <div className="lg:w-2/3 px-4 sm:px-6 md:px-12 py-6 sm:py-12 bg-gradient-to-br from-gray-50 to-white">
                  {/* Progress Bar */}
                  <div
                    className="bg-gradient-to-r from-purple-700 to-blue-600 h-2 rounded transition-all duration-700 ease-in-out"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>

                  {submitted ? (
                    <div className="text-center py-12 sm:py-20">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Thank You for Submitting!
                      </h2>
                      <p className="text-base sm:text-lg text-gray-600 mt-4">
                        We have received your information successfully.
                      </p>
                    </div>
                  ) : (

                    <>
                      <h2 className="text-xl sm:text-2xl md:text-3xl mt-6 font-bold text-center text-gray-800 mb-8">
                        {stepTexts[step - 1]}
                      </h2>

                      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">

                        {/* Dynamic Inputs */}
                        {step === 1 && (
                          <div className="space-y-8">
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  First name <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text" name="FirstName" value={formData.FirstName} onChange={(e) => {
                                    setName(e.target.value);
                                    handleChange(e);
                                  }}

                                  className="mt-2 w-full border-2 outline-none border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-200 hover:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" placeholder="Alan"

                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Middle name
                                </label>
                                <input
                                  type="text" name="MiddleName" value={formData.MiddleName} onChange={handleChange}
                                  className="mt-2 w-full border-2 outline-none border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-200 hover:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" placeholder="Benjamin" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Last name <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text" name="LastName" value={formData.LastName} onChange={handleChange}
                                  className="mt-2 w-full border-2 outline-none border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-200 hover:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" placeholder="Walker"
                                />
                              </div>
                            </div>

                            {/* Email Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Email address <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="email" name="Email" value={formData.Email} onChange={(e) => {
                                    setEmail(e.target.value);
                                    handleChange(e);
                                  }}

                                  className="mt-2 w-full border-2 outline-none border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-200 hover:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" placeholder="alan@abc.com"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Re-enter email address <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="email" name="ReEnterEmail" value={formData.ReEnterEmail} onChange={handleChange}
                                  className="mt-2 w-full border-2 outline-none border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-200 hover:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" placeholder="alan@abc.com"
                                />
                              </div>
                            </div>

                            {/* Phone and Other Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              {/* Phone Number */}
                              <div>
                                <label className="block text-sm font-medium mb-1  text-gray-700" htmlFor="phone">
                                  Phone number <span className="text-red-500">*</span>
                                </label>


                                <PhoneInput
                                  international
                                  country="PK"
                                  value={phone}
                                  onChange={(value) => {
                                    setPhone(value); // Updates the phone state
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      PhoneNumber: value, // Updates formData.PhoneNumber
                                    }));
                                  }}
                                  placeholder="Enter phone number"
                                  className="mt-2 w-full border-2 outline-none border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-200 hover:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                  required
                                />
                              </div>

                              <div>

                                <label className="block  text-sm font-medium text-gray-700">
                                  Gender <span className="text-red-500">*</span>
                                </label>
                                <select
                                  name="Gender"
                                  value={formData.Gender}
                                  onChange={handleChange}
                                  required
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                >
                                  <option value="" disabled hidden>
                                    Select Gender
                                  </option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                </select>

                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>

                                <label className="block text-sm font-medium text-gray-700">
                                  Date of birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                  name="DateBirth" value={formData.DateBirth} onChange={handleChange}
                                  type="date"
                                  className="mt-2 w-full border-2 outline-none border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-200 hover:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" placeholder="Alan"
                                />
                              </div>
                              <div>
                                <label className="block  text-sm font-medium text-gray-700">
                                  Select Destination <span className="text-red-500">*</span>
                                </label>
                                <select
                                  name="Destinations"
                                  value={destination}
                                  onChange={(e) => {
                                    const newdestination = check == "" ? e.target.value : check;
                                    setDestination(newdestination); // Update local shirtSize state
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      Destinations: newdestination, // Update formData
                                    }));
                                  }}
                                  required
                                  className=" mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                >
                                  <option value="" disabled hidden>
                                    Select Destination
                                  </option>
                                  {no && <option value="Istanbul, Turkey">Istanbul, Turkey</option>}
                                  {no1 && <option value="Dubai, UAE">Dubai, UAE</option>}
                                  {no2 && <option value="Baku, Azerbaijan">Baku, Azerbaijan</option>}
                                  {no3 && <option value="New York, USA">New York, USA</option>}
                                  {no4 && <option value="Riyadh, Saudi Arabia">Riyadh, Saudi Arabia</option>}
                                  {no5 && <option value="London, UK">London, UK</option>}

                                </select>
                              </div>
                            </div>


                            {/* Submit Button */}
                            <div className="flex justify-center">

                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                              <button
                                type="button"
                                className="w-full cursor-not-allowed sm:w-auto px-6 py-3 rounded-lg text-white font-semibold bg-gray-500 hover:bg-gray-600 transition duration-300"
                                disabled={step === 1} // Step 1 par button disabled rahega
                                onClick={() => {
                                  // Top par scroll kare
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // Smooth scrolling effect
                                  });
                                  handleBackStep(); // Aapka existing function call
                                }}
                              >
                                ← Back
                              </button>

                              <button
                                className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300"
                                onClick={() => {
                                  // Top par scroll kare
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // Smooth scrolling effect
                                  });
                                  handleNextStep(); // Aapka existing function call
                                }}
                              >
                                {"Next →"}
                              </button>

                            </div>
                          </div>
                        )}
                        {step === 2 && (
                          <div className="space-y-8">
                            {/* Nationality and Residency Fields */}
                            <div className="grid relative  z-10 grid-cols-1 md:grid-cols-2 ">
                              <div>
                                {/* Phone Number */}

                                <div className="relative z-10 mb-4">
                                  <label className="block text-lg font-medium text-gray-700" htmlFor="phone">
                                    Nationality <span className="text-red-500">*</span>
                                  </label>

                                  <ReactFlagsSelect
                                    selected={selectedNationality}
                                    onSelect={(code) => {
                                      const countryName = countryNames[code];
                                      setSelectedNationality(code);
                                      setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        Nationality: countryName,
                                      }));
                                    }}
                                    className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-1 px-1 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                    searchable
                                    searchPlaceholder="Search for a country..."
                                    customLabels={countryNames}
                                    countries={filteredCountries}
                                  />
                                </div>
                              </div>
                              <div className=" mb-4">
                                <label className="block text-lg font-medium text-gray-700" htmlFor="residency">
                                  Residency <span className="text-red-500">*</span>
                                </label>
                                <ReactFlagsSelect
                                  selected={selectedResidency}
                                  onSelect={(code) => {
                                    const countryName = countryNames[code];
                                    setSelectedResidency(code);
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      Residency: countryName,
                                    }));
                                  }}
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-1 px-1 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                  searchable
                                  searchPlaceholder="Search for a country..."
                                  customLabels={countryNames}
                                  countries={filteredCountries}
                                />
                              </div>
                            </div>

                            {/* Address Field */}

                            <div>
                              <label className="block  text-lg font-medium text-gray-700">Address</label>
                              <input
                                type="text" name="Address" value={formData.Address} onChange={handleChange}
                                className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                placeholder="1747 Stuart Street"
                              />
                            </div>






                            {/* City, Province/State, and Postal Code Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              <div>
                                <label className="block text-lg font-medium text-gray-700">
                                  City <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text" name="City" value={formData.City} onChange={handleChange}
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                  placeholder="Faisalabad"
                                />
                              </div>
                              <div>
                                <label className="block text-lg font-medium text-gray-700">Province/State</label>
                                <input
                                  type="text" name="ProvinceState" value={formData.ProvinceState} onChange={handleChange}
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                  placeholder="Punjab"
                                />
                              </div>
                              <div>
                                <label className="block text-lg font-medium text-gray-700">Postal/Zip Code</label>
                                <input
                                  type="text" name="PostelCode" value={formData.PostelCode} onChange={handleChange}
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                  placeholder="38000"
                                />
                              </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-center space-x-8 mt-10">

                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                              <button
                                type="button"
                                className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold bg-gray-500 hover:bg-gray-600 transition duration-300"
                                disabled={step === 1} // Step 1 par button disabled rahega
                                onClick={() => {
                                  // Top par scroll kare
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // Smooth scrolling effect
                                  });
                                  handleBackStep(); // Aapka existing function call
                                }}
                              >
                                ← Back
                              </button>

                              <button

                                className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300"
                                onClick={() => {
                                  // Top par scroll kare
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // Smooth scrolling effect
                                  });
                                  handleNextStep(); // Aapka existing function call
                                }}                              // type="submit"
                              >
                                {"Next →"}
                              </button>
                            </div>
                          </div>
                        )}
                        {step === 3 && (
                          <div className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                              {/* Institution Name */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Name of Institution
                                </label>
                                <input
                                  type="text"
                                  name="NameOfTheInstitutionYouAttend"
                                  value={institution} // Use `institution` as the main value
                                  onChange={(e) => {
                                    const newValue = e.target.value;
                                    setInstitution(newValue); // Update `institution` state
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      NameOfTheInstitutionYouAttend: newValue, // Update `formData.NameOfTheInstitutionYouAttend`
                                    }));
                                  }}
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                  placeholder="Westview Academy"
                                />

                              </div>
                              {/* Disability */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Any Disabilities?
                                </label>
                                <input
                                  type="text"
                                  name="AnyDisabilities"
                                  value={disability} // Use `disability` as the value
                                  onChange={(e) => {
                                    const newValue = e.target.value;
                                    setDisability(newValue); // Updates the `disability` state
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      AnyDisabilities: newValue, // Updates `formData.AnyDisabilities`
                                    }));
                                  }}
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                  placeholder="Specify any assistance needed"
                                />

                              </div>
                              {/* Referral Code */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Referral Code (Optional)
                                </label>
                                <input
                                  type="text"
                                  name="WereYouProvidedWithAnyReferralCode"
                                  value={referralCode} // Use `referralCode` as the main value
                                  onChange={(e) => {
                                    const newValue = e.target.value;
                                    setReferralCode(newValue); // Update `referralCode` state
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      WereYouProvidedWithAnyReferralCode: newValue, // Update `formData.WereYouProvidedWithAnyReferralCode`
                                    }));
                                  }}
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                  placeholder="Enter code"
                                />

                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                              {/* Shirt Size */}
                              {/* Shirt Size Dropdown */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Shirt Size
                                </label>
                                <select
                                  name="WhatIsYourShirtSize"
                                  value={shirtSize}
                                  onChange={(e) => {
                                    const newSize = e.target.value;
                                    setShirtSize(newSize); // Update local shirtSize state
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      WhatIsYourShirtSize: newSize, // Update formData
                                    }));
                                  }}
                                  required
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                >
                                  <option value="" disabled hidden>
                                    Select Shirt Size
                                  </option>
                                  <option value="Small">Small</option>
                                  <option value="Medium">Medium</option>
                                  <option value="Large">Large</option>
                                  <option value="X-Large">X-Large</option>
                                </select>
                              </div>
                              {/* Food Preference */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Food Preference
                                </label>
                                <select
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                  required
                                  value={foodPreference}
                                  onChange={(e) => {
                                    const newPreference = e.target.value;
                                    setFoodPreference(newPreference);
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      DoYouHaveAFoodpreference: newPreference,
                                    }));
                                  }}
                                  name="DoYouHaveAFoodpreference"
                                >
                                  <option value="" disabled hidden>
                                    Select Food Preference
                                  </option>
                                  <option value="Vegetarian">Vegetarian</option>
                                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                                  <option value="Vegan">Vegan</option>
                                </select>
                              </div>

                              {/* Heard About Us */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  How Did You Hear About Us?
                                </label>
                                <input
                                  type="text"
                                  name="HowDidYouGetToKnowAboutUs"
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                  placeholder="Instagram"
                                  value={heardAboutUs} // Set the main value
                                  onChange={(e) => {
                                    const newValue = e.target.value;
                                    setHeardAboutUs(newValue); // Update `heardAboutUs` state
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      HowDidYouGetToKnowAboutUs: newValue, // Update `formData.HowDidYouGetToKnowAboutUs`
                                    }));
                                  }}
                                />

                              </div>
                            </div>
                            {/* Buttons */}
                            <div className="flex justify-center space-x-8">

                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                              <button
                                type="button"
                                className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold bg-gray-500 hover:bg-gray-600 transition duration-300"
                                disabled={step === 1} // Step 1 par button disabled rahega
                                onClick={() => {
                                  // Top par scroll kare
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // Smooth scrolling effect
                                  });
                                  handleBackStep(); // Aapka existing function call
                                }}
                              >
                                ← Back
                              </button>

                              <button

                                className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300"
                                onClick={() => {
                                  // Top par scroll kare
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // Smooth scrolling effect
                                  });
                                  handleNextStep(); // Aapka existing function call
                                }}                              // type="submit"
                              >
                                {"Next →"}
                              </button>
                            </div>
                          </div>
                        )}

                        {step === 4 && (
                          <div className="space-y-8">
                            <div className="grid h-48  grid-cols-1 md:grid-cols-2 gap-1">
                              {/* UN Committee Field */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Which UN committee do you prefer for the event? <span className="text-red-500">*</span>
                                </label>
                                <select
                                  name="WhichUNCommitteeDoYouPreferForTheEvent"
                                  required
                                  value={formData.WhichUNCommitteeDoYouPreferForTheEvent}
                                  onChange={handleChange}
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                >
                                  <option value="" disabled hidden>
                                    Select UN Committee
                                  </option>
                                  <option value="UNSC">UNSC</option>
                                  <option value="WHO">WHO</option>
                                  <option value="UNESCO">UNESCO</option>
                                </select>
                              </div>


                              {/* Country Field */}

                              {/* Attended Similar Programs Field */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 ">
                                  Have you attended similar international program(s)before?<span className="text-red-500">*</span>
                                </label>
                                <select
                                  name="HaveYouAttendSimilarInternationalProgramsBefore"
                                  required
                                  value={formData.HaveYouAttendSimilarInternationalProgramsBefore}
                                  onChange={handleChange}
                                  className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                >
                                  <option value="" disabled hidden>
                                    Select an option
                                  </option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>

                            </div>
                            <div className="  relative z-10">
                              <label className="block lg:mt-[-70px] mt-[10px] text-sm font-medium text-gray-700" htmlFor="phone">
                                Which country do you want to represent?<span className="text-red-500">*</span>
                              </label>

                              <ReactFlagsSelect

                                selected={selectedRepresenting}
                                onSelect={(code) => {
                                  const countryName = countryNames[code];
                                  setSelectedRepresenting(code);
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    WhichCountryDoYouWantToRepresent: countryName
                                  }));
                                }}
                                className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-1 px-1 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                searchable
                                searchPlaceholder="Search for a country..."
                                customLabels={countryNames}
                                countries={filteredCountries}
                              />

                            </div>

                            <div className="flex py-10 flex-col sm:flex-row sm:justify-between gap-4">
                              <button
                                type="button"
                                className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold bg-gray-500 hover:bg-gray-600 transition duration-300"
                                disabled={step === 1} // Step 1 par button disabled rahega
                                onClick={() => {
                                  // Top par scroll kare
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // Smooth scrolling effect
                                  });
                                  handleBackStep(); // Aapka existing function call
                                }}
                              >
                                ← Back
                              </button>

                              <button

                                className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300"
                                onClick={() => {
                                  // Top par scroll kare
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // Smooth scrolling effect
                                  });
                                  handleNextStep(); // Aapka existing function call
                                }}                              // type="submit"
                              >
                                {"Next →"}
                              </button>
                            </div>
                          </div>
                        )}
                        {step === 5 && (
                          <div className="space-y-8">

                            <div className="mb-4">
                              <label htmlFor="excitement" className="block text-gray-700 mb-2 text-sm">
                                What excites you the most about joining our program?
                              </label>
                              <textarea
                                type="text" name="WhatExcitesYouTheMostAboutJoiningOurProgram" value={formData.WhatExcitesYouTheMostAboutJoiningOurProgram} onChange={handleChange}
                                id="excitement"
                                className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                placeholder="Optional (Your response will help us gauge your interest and enable us to allocate seats deservedly)"
                              ></textarea>
                            </div>

                            <div className="mb-6">
                              <label htmlFor="extra" className="block text-gray-700 mb-2 text-sm">
                                Anything else that you want to share?
                              </label>
                              <textarea
                                id="extra"
                                type="text" name="AnyThingElseThatYouWantToShare" value={formData.AnyThingElseThatYouWantToShare} onChange={handleChange}
                                className="mt-2 w-full border-2 border-gray-200 rounded-lg shadow-md py-3 px-4 bg-white text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                placeholder="Optional (Emergency contacts/Health conditions/Concerns)"
                              ></textarea>
                            </div>

                            <div className="flex justify-center space-x-4">

                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                              <button
                                type="button"
                                className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold bg-gray-500 hover:bg-gray-600 transition duration-300"
                                disabled={step === 1} // Step 1 par button disabled rahega
                                onClick={() => {
                                  // Top par scroll kare
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // Smooth scrolling effect
                                  });
                                  handleBackStep(); // Aapka existing function call
                                }}
                              >
                                ← Back
                              </button>

                              {loader && <div

                                className="w-full sm:w-auto px-6 py-3 cursor-not-allowed rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300"
                              >

                                <div className=" gap-4 w-full flex items-center justify-center">
                                  <p>waite...</p>
                                  <div
                                    className="w-8 h-8 border-2 border-transparent text-blue-700 text-4xl animate-spin flex items-center justify-center border-t-blue-500 rounded-full"
                                  >
                                    <div
                                      className="w-6 h-6 border-2 border-transparent text-red-700 text-4xl animate-spin flex items-center justify-center border-t-red-500 rounded-full"
                                    ></div>
                                  </div>
                                </div>


                              </div>}
                              {!loader && <button

                                type="submit"
                                className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300"
                              >
                                {"Submit →"}
                              </button>}
                            </div>
                          </div>


                        )}
                      </form>
                      {step === 6 && (
                        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-pink-100 text-center px-6 sm:px-10 md:px-16 lg:px-20">

                          <div className="text-2xl bg-[#366fda] bg-clip-text text-transparent sm:text-3xl md:text-4xl font-semibold mb-6">
                            {/* {openemailloader && (
                              <button
                                disabled
                                className="w-full flex justify-center items-center text-[20px] px-3 py-1 rounded-lg text-white  cursor-not-allowed bg-blue-600 hover:bg-blue-700 transition duration-300"
                              >
                                  <p className='mr-4'>waite.. </p> 
                                <div className="w-7 h-7 border-2 border-transparent text-blue-700 text-4xl animate-spin flex items-center justify-center border-t-blue-500 rounded-full">
                                  <div className="w-5 h-5 border-2 border-transparent text-red-700 text-4xl animate-spin flex items-center justify-center border-t-red-500 rounded-full"></div>
                                </div>
                              </button>
                            )}
                            {!openemailloader && (
                              <button
                                onClick={openEmailClient}
                                className="w-full text-[20px] px-3 py-1 rounded-lg text-white  bg-blue-600 hover:bg-blue-700 transition duration-300"
                              >
                                Open Email
                              </button>
                            )} */}

                            <p>Open Email</p>

                          </div>
                          <p className="text-gray-800 text-lg sm:text-xl mb-4">
                            Thank you for registering for Atsas International Mun , {formData.FirstName}.  We have sent an email to you
                            <span className="font-semibold "> {formData.Email}</span>.
                          </p>

                          <p className="text-blue-500 text-base sm:text-lg mb-10">
                            Please follow our Instagram account to{' '}
                            <span className="text-red-500">have a chance to win our exclusive merchandise</span> and stay updated with Atsas International MUN.
                          </p>

                          {/* Instagram Follow Button */}
                          <a
                            href="https://www.instagram.com/atsasmun/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center mb-16"
                          >
                            <FaInstagram
                              size={60}
                              className="text-pink-600 mb-2 sm:mb-3 sm:text-5xl lg:text-6xl"
                            />
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                              @atsasmun
                            </span>
                            <span className="text-xs text-gray-500 sm:text-sm">
                              Tap above to follow
                            </span>
                          </a>

                          {/* Contact Info */}
                          <div className="flex flex-wrap items-center justify-center space-x-4 sm:space-x-10 mb-8">
                            <a
                              href="https://wa.me/+447487302322"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-red-600 text-sm sm:text-base"
                            >
                              <FaWhatsapp size={20} className="mr-2 sm:text-lg" />
                              +447487302322
                            </a>
                            <a
                              href="mailto:info@atsasmun.com"
                              className="flex items-center text-blue-600 text-sm sm:text-base"
                            >
                              <FaEnvelope size={20} className="mr-2 sm:text-lg" />
                              info@atsasmun.com
                            </a>
                          </div>

                          {/* Footer Text */}
                          <p className="text-gray-600 text-xs sm:text-sm mt-4">
                            Want to register a delegation/team? Contact us at{' '}
                            <a
                              href="mailto:info@atsasmun.com"
                              className="text-blue-500 hover:underline"
                            >
                              info@atsasmun.com
                            </a>
                            . View our{' '}
                            <a href="/Privac" className="text-blue-500 hover:underline">
                              Privacy Policy
                            </a>
                            .
                          </p>
                        </div>


                      )}

                      {/* Navigation Buttons */}


                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Footer />
      <ScrollToTop />
      <Whatsapp />

    </div>
  );
}
