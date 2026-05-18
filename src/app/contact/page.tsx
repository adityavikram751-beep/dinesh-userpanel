// src/app/contact/page.tsx

"use client";

import { useEffect, useState } from "react";

interface ContactData {
  email?: string;
  Address?: string;
  phone?: number;
}

export default function ContactPage() {
  const [contactData, setContactData] =
    useState<ContactData>({
      // STATIC DEFAULT DATA
      email: "contact@example.com",
      Address: "123 Main Street, City, State 12345",
      phone: 1234567890,
    });

  // API CALL
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(
          "https://dinesh-sagel-backend.onrender.com/api/contactUs"
        );

        const data = await response.json();

        console.log("API DATA => ", data);

        // ARRAY FIRST ITEM
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

        /* WHATSAPP */

        .wa-float{
          position:fixed;
          right:18px;
          bottom:18px;
          width:60px;
          height:60px;
          border-radius:50%;
          background:#25D366;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 10px 25px rgba(37,211,102,.35);
          z-index:999;
          transition:.25s ease;
          text-decoration:none;
        }

        .wa-float:hover{
          transform:scale(1.08);
        }

        .wa-icon{
          width:34px;
          height:34px;
        }

        /* TABLET */

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

        /* MOBILE */

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

          .wa-float{
            width:54px;
            height:54px;
            right:14px;
            bottom:14px;
          }

          .wa-icon{
            width:30px;
            height:30px;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="page-hero px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-black sm:text-5xl">
            Contact Us
          </h1>
        </div>
      </section>

      {/* CONTACT */}
      <div className="contact-wrap">

        <div className="contact-grid">

          {/* LEFT */}
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

          {/* MAP */}
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

      {/* WHATSAPP FLOAT */}
      <a
        href={`https://wa.me/${contactData?.phone}`}
        target="_blank"
        className="wa-float"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          className="wa-icon"
        >
          <path d="M19.11 17.2c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.12-.41-2.13-1.31-.79-.7-1.32-1.57-1.48-1.84-.15-.27-.02-.42.11-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.21-.51-.43-.44-.6-.45h-.51c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.21s.95 2.55 1.08 2.72c.14.18 1.87 2.86 4.54 4.01.64.28 1.14.44 1.53.56.64.2 1.22.17 1.68.1.51-.08 1.58-.65 1.8-1.27.22-.63.22-1.17.15-1.28-.06-.11-.24-.18-.51-.31z" />
          <path d="M16.01 3C8.84 3 3 8.82 3 16c0 2.3.6 4.54 1.75 6.5L3 29l6.67-1.72A12.94 12.94 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.05 0-4.06-.55-5.82-1.6l-.42-.25-3.96 1.02 1.06-3.86-.27-.44A10.65 10.65 0 015.33 16c0-5.88 4.79-10.67 10.68-10.67 2.85 0 5.53 1.11 7.55 3.13A10.6 10.6 0 0126.68 16c0 5.88-4.79 10.67-10.67 10.67z" />
        </svg>
      </a>
    </main>
  );
}