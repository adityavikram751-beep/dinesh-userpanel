"use client";

import { useEffect, useState } from "react";

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
        fontFamily:
          "'Georgia', serif",
      }}
    >
      {/* ================= WHATSAPP FLOAT ================= */}

      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="white"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.736 5.476 2.027 7.785L0 32l8.455-2.01A15.938 15.938 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.784-1.858l-.486-.29-5.02 1.194 1.227-4.892-.317-.502A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.778c-.398-.199-2.354-1.162-2.72-1.295-.365-.133-.631-.199-.897.2-.266.398-1.03 1.295-1.263 1.561-.232.266-.465.299-.863.1-.398-.2-1.681-.62-3.203-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.2-.232.266-.398.398-.664.133-.266.067-.498-.033-.697-.1-.2-.897-2.162-1.229-2.96-.323-.778-.652-.672-.897-.684l-.764-.013c-.266 0-.698.1-.1063.498-.365.398-1.396 1.362-1.396 3.322s1.43 3.854 1.629 4.12c.2.266 2.813 4.295 6.815 6.024.953.411 1.696.657 2.276.841.956.304 1.827.261 2.516.158.767-.114 2.354-.962 2.687-1.892.333-.93.333-1.727.233-1.892-.1-.166-.365-.266-.763-.465z" />
        </svg>
      </a>

      {/* ================= STYLES ================= */}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .whatsapp-float {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 999;
          width: 56px;
          height: 56px;
          background: #25d366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.22);
        }

        /* ================= LAYOUT ================= */

        .blog-layout {
          display: grid;
          grid-template-columns: 1fr 0.75fr;
          gap: 2rem;
          max-width: 1150px;
          margin: 0 auto;
          padding: 1rem 2rem 5rem;
          align-items: start;
        }

        /* ================= RIGHT IMAGES ================= */

        .blog-images {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: sticky;
          top: 2rem;
        }

        /* IMAGE SMALL */

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

        /* ================= LEFT ARTICLES ================= */

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

        /* ================= RESPONSIVE ================= */

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
          padding:
            "3rem 1rem 2.5rem",
        }}
      >
        <h1
          style={{
            fontSize:
              "clamp(2.5rem, 7vw, 4rem)",

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

                    color:
                      "#2a2a2a",

                    marginBottom:
                      "0.8rem",

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

                {post.content
                  ?.length > 350 && (
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
                src={
                  post.blogImage
                }
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