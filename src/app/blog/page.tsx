"use client";

import { useEffect, useState } from "react";

// ================= WHATSAPP FUNCTION =================

const WHATSAPP_NUMBER = "918175022207";

function getWhatsappUrl() {
  const message = `Hi DineshSehgal! 👋

I want to know more about your fitness programs.

Please share:
✅ Pricing
✅ Workout Plans
✅ Diet Plans
✅ Coaching Details

Thank you 🙌`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  // ================= GET BLOGS =================

  useEffect(() => {
    fetch(
      "https://dinesh-sagel-backend.onrender.com/api/blogs/blogs"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setPosts(
          data?.blogs ||
          data?.data ||
          data
        );
      })
      .catch((err) =>
        console.log(err)
      );
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#d9cfb0",
        fontFamily: "'Georgia', serif",
      }}
    >

      {/* ================= WHATSAPP FLOAT ================= */}

      <a
        href={getWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50"
      >
        <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_15px_45px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-105">

          {/* ICON */}

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

      {/* ================= STYLES ================= */}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .blog-layout {
          display: grid;
          grid-template-columns: 1fr 0.75fr;
          gap: 2rem;
          max-width: 1150px;
          margin: 0 auto;
          padding: 1rem 2rem 5rem;
          align-items: start;
        }

        .blog-images {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: sticky;
          top: 2rem;
        }

        .blog-img {
          width: 100%;
          max-width: 420px;
          height: auto;
          object-fit: contain;
          border-radius: 10px;
          display: block;
          background: #eee;
          margin: 0 auto;
        }

        .blog-article {
          margin-bottom: 2.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        .blog-content {
          font-size: 0.96rem;
          color: #444;
          line-height: 1.85;
          margin-bottom: 0.85rem;

          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;

          overflow: hidden;
        }

        .read-more-btn {
          color: #3b7ec2;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          margin-top: 0.3rem;
        }

        @media (max-width: 1024px) {
          .blog-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .blog-images {
            position: static;
            align-items: center;
          }
        }

        @media (max-width: 768px) {
          .blog-layout {
            padding: 1rem 1rem 4rem;
          }

          .blog-title {
            font-size: 1.25rem !important;
          }

          .blog-content {
            font-size: 0.92rem !important;
            line-height: 1.7 !important;
          }

          .blog-img {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .blog-layout {
            padding: 1rem 0.85rem 4rem;
          }
        }
      `}</style>

      {/* ================= TITLE ================= */}

      <div
        style={{
          textAlign: "center",
          padding: "3rem 1rem 2.5rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 4rem)",
            fontWeight: 900,
            color: "#b8394a",
            margin: 0,
          }}
        >
          Blogs
        </h1>
      </div>

      {/* ================= MAIN LAYOUT ================= */}

      <div className="blog-layout">

        {/* ================= LEFT CONTENT ================= */}

        <div>
          {posts.map(
            (
              post: any,
              i: number
            ) => (
              <article
                key={i}
                className="blog-article"
              >

                {/* TITLE */}

                <h2
                  className="blog-title"
                  style={{
                    fontSize:
                      "clamp(1.1rem, 2.5vw, 1.55rem)",
                    fontWeight: 700,
                    color: "#2a2a2a",
                    marginBottom: "0.8rem",
                    lineHeight: 1.4,
                  }}
                >
                  {post.title}
                </h2>

                {/* CONTENT */}

                <p className="blog-content">
                  {post.content}
                </p>

                {/* READ MORE */}

                {post.content?.length > 350 && (
                  <a
                    href="#"
                    className="read-more-btn"
                  >
                    read more
                  </a>
                )}
              </article>
            )
          )}
        </div>

        {/* ================= RIGHT IMAGES ================= */}

        <div className="blog-images">
          {posts.map(
            (
              post: any,
              i: number
            ) => (
              <img
                key={i}
                src={post.blogImage}
                alt={post.title}
                className="blog-img"
                loading="lazy"
              />
            )
          )}
        </div>
      </div>
    </main>
  );
}