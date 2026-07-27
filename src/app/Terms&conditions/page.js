'use client';
import Image from 'next/image';
import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background
import logo from '@/app/public/img/logo-1.png'; // Logo
import Link from 'next/link';
import { AiOutlineDown, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Footer from '../(component)/footer/Footer';
import ScrollToTop from '../(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '../(component)/whatsapp/Whatsapp';
import Navbar from '../(component)/navbar/Navbar';


export default function Home() {

  return (
    <div>
      {/* Navbar */}
     <Navbar />
      {/* Hero Section */}
      <header
        className="relative bg-cover  bg-center min-h-screen flex items-center justify-center "
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute  inset-0 bg-[#060713] bg-opacity-80"></div>

        {/* Hero Content */}

        <div className=' pb-10 relative  z-10 w-screen'>

          <div className="  min-h-screen py-12">
            <div className="text-center mt-24 mb-8">
              <h1 className="text-3xl  md:text-4xl font-extrabold text-gray-100 uppercase">
                Atsas MUN Terms & Conditions
              </h1>
            </div>
            <div className="max-w-5xl mx-4 lg:mx-auto rounded-lg p-6" style={{ background: '#1B1E3D', border: '1px solid rgba(245,241,232,0.14)', color: '#F5F1E8' }}>
              <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
              <p className="mb-4">
                These terms and conditions {`("Agreement")`} apply to all delegates
                {`("Participants")`} who attend AtsasMUN activities {`("Events")`}. These
                events are planned and administered by Atsas Creation International,
                which is registered in the UK. UK laws and jurisdiction shall govern
                any legal disputes.
              </p>
              <p className="mb-4">
                This website{`'`}s content is meant for a broad audience and might not be
                applicable in every location. Despite its best efforts to guarantee
                the content{`'`}s timeliness and correctness, Atsas Creation International
                maintains the right to amend or change material at any moment without
                giving notice.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">Eligibility</h3>
              <ol className="list-decimal list-inside mb-4">
                <li>
                  To attend AtsasMUN Events, participants must be 16 years of age or
                  older at the time of registration.
                </li>
                <li>
                  The official website, <Link href="/RegisterNow" className="text-blue-500 underline">atsasmun.com/register</Link>, is where registration must be finished.
                </li>
                <li>
                  Since AtsasMUN is not liable for inaccurate information submitted,
                  participants must supply correct and comprehensive information,
                  including any dietary or special access requirements.
                </li>
                <li>
                  AtsasMUN is not responsible for any decisions or actions made by
                  public agencies or governments, including those pertaining to
                  attendance limitations or visa denials.
                </li>
                <li>
                  While in the host city, delegates are in charge of their personal
                  security and safety.
                </li>
              </ol>


              <h3 className="text-xl font-semibold mt-6 mb-2">
                Registration Deadlines
              </h3>
              <ul className="list-disc list-inside mb-4">
                <li>
                  Registrations are only accepted through the official AtsasMUN
                  website.
                </li>
                <li>
                  Participants must complete all required information, including
                  committee and country preferences, during registration.
                </li>
                <li>
                  Allocations are based on availability, committee capacity, and
                  vacancy of the chosen preferences.
                </li>
                <li>
                  Participants can choose from Basic (Non-Accommodation) or Full
                  Experience (Accommodation) packages.
                </li>
                <li>
                  Registration takes place in three phases: Early Bird, Regular, and
                  Late Registration, each with varying fees. Deadlines will not be
                  extended.
                </li>
                <li>
                  Registration is considered final upon payment. Missing any step
                  during the registration process will result in automatic
                  disqualification and service being denied on the day of the event.
                </li>
              </ul>
              {/* Additional Sections */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Committee Allocation Policy
                </h2>
                <p>
                  AtsasMUN does not guarantee the availability of preferred countries
                  and encourages participants to select alternatives if necessary.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    All intellectual property rights related to the AtsasMUN website,
                    content, graphics, and materials are owned by or licensed to
                    Atsas Creation International. Participants may not:
                  </li>
                  <li>
                    Reproduce, distribute, or use any content for commercial or
                    public purposes without written permission.
                  </li>
                  <li>
                    Use AtsasMUN content on other websites without authorization.
                  </li>
                  <li>
                    Print or copy materials for purposes other than personal
                    reference.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Payments</h2>
                <ul className="list-disc list-inside mb-4">
                  <li>Payments must be made through the official AtsasMUN website.</li>
                  <li>
                    AtsasMUN will not acknowledge payments made to unauthorized
                    individuals claiming to represent the organization.
                  </li>
                  <li>
                    Accepted payment methods include credit/debit cards and
                    international wire transfers.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Visa Support</h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    If a legitimate request is received at least 60 days prior to the
                    start of the event, Visa Support Letters will be issued within 14
                    days.
                  </li>
                  <li>
                    While they can help, visa support letters do not ensure that a
                    visa will be granted.
                  </li>
                  <li>
                    Delegates are in charge of obtaining their own visas; in the event
                    that a visa is refused, costs are not refundable.
                  </li>
                  <li>
                    While AtsasMUN can help with visa-related inquiries, it is unable
                    to influence decisions made by embassies or consulates.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    Subject to the following restrictions, delegates who have made
                    their full payment may ask for a credit voucher or transfer their
                    participation to another AtsasMUN location:
                  </li>
                  <li>
                    Requests have to be submitted sixty days prior to the start of the
                    event.
                  </li>
                  <li>
                    Credit coupons or transfers are only good for AtsasMUN activities.
                  </li>
                  <li>
                    Delegates who only paid an installment will not be eligible for
                    credit vouchers or transfers; the installment will be kept as a
                    cancellation charge.
                  </li>
                  <li>All payments are non-refundable.</li>
                </ul>
              </section>
              {/* Credit Voucher or Transfer Conditions */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Credit Voucher or Transfer Conditions
                </h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    Requests for credit vouchers or transfers must be submitted via
                    email.
                  </li>
                  <li>
                    Cancellation fees apply as follows:
                    <ul className="list-disc pl-5 ml-12 mt-2">
                      <li>
                        45 days before the event: 30% cancellation
                        fee; the remaining amount will be issued as a credit voucher.
                      </li>
                      <li>
                        30 days before the event: 50% cancellation
                        fee; the remaining amount will be issued as a credit voucher.
                      </li>
                      <li>
                        15 days before the event: 70% cancellation
                        fee; the remaining amount will be issued as a credit voucher.
                      </li>
                      <li>
                        Less than 15 days before the event: 100%
                        cancellation fee.
                      </li>
                    </ul>
                  </li>
                </ul>
              </section>

              {/* Jurisdiction and Applicable Law */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Jurisdiction and Applicable Law
                </h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    For payments processed in the United Kingdom, UK laws apply, and
                    UK courts have exclusive jurisdiction over related disputes.
                  </li>
                  <li>
                    For payments processed outside the UK, the applicable jurisdiction
                    will depend on the payment’s location. Participants must agree to
                    these terms as a condition of participation.
                  </li>
                </ul>
              </section>

              {/* Code of Conduct */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Code of Conduct</h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    Participants must ensure all information provided during
                    registration is accurate. False information will result in
                    disqualification and potential legal action.
                  </li>
                  <li>
                    All submitted materials must be original; plagiarism will result
                    in disqualification.
                  </li>
                  <li>
                    Participants must obey the host country’s laws and are personally
                    responsible for any damages or violations.
                  </li>
                  <li>
                    AtsasMUN is not liable for participant misconduct; individuals
                    will bear sole responsibility for their actions.
                  </li>
                  <li>
                    Participants must adhere to the Code of Conduct outlined in the
                    Conference Handbook.
                  </li>
                </ul>
              </section>

              <p>
                These Terms and Conditions ensure a seamless and professional
                experience for all participants and uphold the integrity of AtsasMUN
                events.
              </p>
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
