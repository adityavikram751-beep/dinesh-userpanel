// src/app/contact/page.tsx

"use client";

import { useEffect, useState } from "react";

interface ContactData {
  email?: string;
  Address?: string;
  phone?: number;
}

// ================= WHATSAPP FUNCTION =================

const WHATSAPP_NUMBER = "918175022207";

function getWhatsappUrl() {
  const message = `Hi DineshSehgal! 👋

I want to contact you regarding fitness coaching.

Please share:
✅ Pricing
✅ Workout Plans
✅ Diet Plans
✅ Personal Training Details

Thank you 🙌`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

export default function ContactPage() {

  const [contactData, setContactData] =
    useState<ContactData>({
      email: "contact@example.com",
      Address: "123 Main Street, City, State 12345",
      phone: 1234567890,
    });

  // ================= API CALL =================

  useEffect(() => {

    const fetchContact = async () => {

      try {

        const response = await fetch(
          "https://dinesh-sagel-backend.onrender.com/api/contactUs"
        );

        const data = await response.json();

        console.log("API DATA => ", data);

        if (Array.isArray(data) && data.length > 0) {

          setContactData({
            email: data[0]?.email,
            Address: data[0]?.Address,
            phone: data[0]?.phone,
          });

        }

      } catch (error) {

        console.log(error);

      }

    };

    fetchContact();

  }, []);

  return (
    <main className="bg-[#f5f1e8] min-h-screen">

      {/* ================= STYLES ================= */}

      <style>{`

        .contact-wrap{
          max-width:1100px;
          margin:0 auto;
          padding:40px 18px 70px;
        }

        .contact-grid{
          display:grid;
          grid-template-columns:0.92fr 1.08fr;
          gap:24px;
          align-items:stretch;
        }

        .left-box{
          background:#ffffff;
          border-radius:26px;
          padding:36px;
          box-shadow:0 10px 30px rgba(0,0,0,0.06);
        }

        .title{
          font-size:36px;
          font-weight:900;
          color:#111827;
          line-height:1.2;
        }

        .line{
          width:70px;
          height:5px;
          border-radius:999px;
          background:#14b8a6;
          margin-top:14px;
        }

        .info{
          margin-top:34px;
          display:flex;
          flex-direction:column;
          gap:28px;
        }

        .info-item{
          display:flex;
          gap:16px;
          align-items:flex-start;
        }

        .icon{
          width:56px;
          height:56px;
          border-radius:16px;
          background:#14b8a6;
          display:flex;
          align-items:center;
          justify-content:center;
          color:white;
          font-size:24px;
          flex-shrink:0;
        }

        .label{
          font-size:11px;
          font-weight:900;
          letter-spacing:.22em;
          text-transform:uppercase;
          color:#14b8a6;
          margin-bottom:6px;
        }

        .text{
          font-size:20px;
          font-weight:800;
          line-height:1.5;
          color:#111827;
          word-break:break-word;
        }

        .map{
          overflow:hidden;
          border-radius:26px;
          box-shadow:0 10px 30px rgba(0,0,0,0.06);
          min-height:500px;
          background:white;
        }

        .map iframe{
          width:100%;
          height:100%;
          border:none;
        }

        @media(max-width:950px){

          .contact-grid{
            grid-template-columns:1fr;
          }

          .map{
            min-height:360px;
          }

          .left-box{
            padding:28px 24px;
          }

          .title{
            font-size:30px;
          }

          .text{
            font-size:18px;
          }
        }

        @media(max-width:640px){

          .contact-wrap{
            padding:24px 14px 55px;
          }

          .left-box{
            border-radius:20px;
            padding:22px 18px;
          }

          .map{
            border-radius:20px;
            min-height:260px;
          }

          .title{
            font-size:26px;
          }

          .text{
            font-size:16px;
          }

          .icon{
            width:48px;
            height:48px;
            border-radius:14px;
            font-size:20px;
          }
        }

      `}</style>

      {/* ================= HERO ================= */}

      <section className="page-hero px-5 py-20 text-white sm:px-8 lg:px-10">

        <div className="mx-auto max-w-7xl text-center">

          <h1 className="text-4xl font-black sm:text-5xl">
            Contact Us
          </h1>

        </div>

      </section>

      {/* ================= CONTACT ================= */}

      <div className="contact-wrap">

        <div className="contact-grid">

          {/* ================= LEFT ================= */}

          <div className="left-box">

            <h2 className="title">
              Contact Info
            </h2>

            <div className="line" />

            <div className="info">

              {/* ADDRESS */}

              <div className="info-item">

                <div className="icon">
                  📍
                </div>

                <div>

                  <div className="label">
                    Address
                  </div>

                  <div className="text">
                    {contactData?.Address}
                  </div>

                </div>

              </div>

              {/* PHONE */}

              <div className="info-item">

                <div className="icon">
                  📞
                </div>

                <div>

                  <div className="label">
                    Contact
                  </div>

                  <div className="text">
                    +91 {contactData?.phone}
                  </div>

                </div>

              </div>

              {/* EMAIL */}

              <div className="info-item">

                <div className="icon">
                  ✉️
                </div>

                <div>

                  <div className="label">
                    Email
                  </div>

                  <div className="text">
                    {contactData?.email}
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ================= MAP ================= */}

          <div className="map">

            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                contactData?.Address || ""
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              loading="lazy"
            />

          </div>

        </div>

      </div>

      {/* ================= WHATSAPP BUTTON ================= */}

      <a
        href={getWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50"
      >

        <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_15px_45px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-105">

          {/* WHATSAPP ICON */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="white"
            className="h-9 w-9"
          >
            <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.57.75 5.08 2.16 7.23L3 29l5.93-2.1A12.93 12.93 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.13 0-4.22-.57-6.04-1.65l-.43-.25-3.52 1.25 1.15-3.62-.28-.45A10.58 10.58 0 015.33 16c0-5.89 4.79-10.68 10.68-10.68 2.85 0 5.52 1.11 7.54 3.13A10.59 10.59 0 0126.68 16c0 5.89-4.79 10.67-10.67 10.67zm5.86-7.94c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.84-1.59-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.64 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.39 4.75.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.61-.09 1.89-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
          </svg>

        </div>

      </a>

    </main>
  );
}