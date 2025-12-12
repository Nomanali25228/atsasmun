import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function ContactUs() {
  return (
    <div id="contact" className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div data-aos="fade-up" className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-wide">
        CONTACT US
        </h2>
        <p className="text-gray-500 text-base md:text-lg mt-2">
        We are here to help
        </p>
        <div className="w-12 md:w-24 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>
      </div>

        {/* Contact Grid */}
        <div className="grid mt-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Address */}
          <div className="relative text-center">
            <div className="flex justify-center items-center mb-4">
              <FaMapMarkerAlt className="text-blue-500 text-5xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              ADDRESS
            </h3>
            <a
            target="blank"
              href="https://www.google.com/maps/dir//42+Hennerton+Way,+High+Wycombe+HP13+7UE,+UK/@51.624744,-0.725527,1899m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x487661a45dd605d9:0xc19b70789701c53f!2m2!1d-0.7203776!2d51.6247444!3e0?hl=en&entry=ttu&g_ep=EgoyMDI1MDIxOC4wIKXMDSoASAFQAw%3D%3D"
              className="text-blue-600 hover:underline"
            >


            42 Hennerton Way,High Wycombe, HP13 7UE,United Kingdom
           
            </a>
            <hr className="mt-4 w-3/4 mx-auto border-gray-300" />
          </div>

          {/* Phone */}
          <div className="relative text-center">
            <div className="flex justify-center items-center mb-4">
              <FaPhoneAlt className="text-blue-500 text-5xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">PHONE</h3>
            <a
              href="tel:+447498072531"
              className="text-blue-600 hover:underline"
              target="blank"

            >
              +447498072531
            </a>
            <hr className="mt-10 w-3/4 mx-auto border-gray-300" />
          </div>

          {/* Email */}
          <div className="relative text-center">
            <div className="flex justify-center items-center mb-4">
              <FaEnvelope className="text-blue-500 text-5xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">EMAIL</h3>
            <a
              href="mailto:info@atsasmun.com"
              className="text-blue-600 hover:underline"
              target="blank"

            >
              info@atsasmun.com
            </a>
            <hr className="mt-10 w-3/4 mx-auto border-gray-300" />
          </div>

          {/* Facebook */}
          <div className="relative text-center">
            <div className="flex justify-center items-center mb-4">
              <FaFacebookF className="text-blue-500 text-5xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              FACEBOOK
            </h3>
            <a
              href="https://www.facebook.com/share/189wEJeHZ5/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              facebook.com/atsasmun
            </a>
            <hr className="mt-10 w-3/4 mx-auto border-gray-300" />
          </div>

          {/* Instagram */}
          <div className="relative text-center">
            <div className="flex justify-center items-center mb-4">
              <FaInstagram className="text-blue-500 text-5xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              INSTAGRAM
            </h3>
            <a
              href="https://www.instagram.com/atsasmun/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              instagram.com/atsasmun
            </a>
            <hr className="mt-10 w-3/4 mx-auto border-gray-300" />
          </div>

          {/* WhatsApp */}
          <div className="relative text-center">
            <div className="flex justify-center items-center mb-4">
              <FaWhatsapp className="text-blue-500 text-5xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              WHATSAPP
            </h3>
            <a
              href="https://wa.me/+447498072531"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
             +447498072531
            </a>
            <hr className="mt-10 w-3/4 mx-auto border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
