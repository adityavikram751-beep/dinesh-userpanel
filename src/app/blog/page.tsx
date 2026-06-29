"use client";

import { useEffect, useState } from "react";

type BlogPost = {
  title: string;
  content?: string;
  blogImage?: string;
};

type BlogApiResponse =
  | BlogPost[]
  | {
      blogs?: BlogPost[];
      data?: BlogPost[];
    };

// ================= WHATSAPP FUNCTION =================

const WHATSAPP_NUMBER = "918585986111";

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
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  // ================= GET BLOGS =================

  useEffect(() => {
    fetch(
      "https://api.dineshsehgal.com/api/blogs/blogs"
    )
      .then((res) => res.json())
      .then((data: BlogApiResponse) => {
        console.log(data);

        const nextPosts = Array.isArray(data) ? data : data.blogs || data.data || [];

        setPosts(nextPosts);
        // Initialize all as collapsed
        const initExpanded: Record<number, boolean> = {};
        nextPosts.forEach((_, i) => (initExpanded[i] = false));
        setExpanded(initExpanded);
      })
      .catch((err) => console.log(err));
  }, []);

  // ================= TOGGLE READ MORE =================

  const toggleReadMore = (index: number) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
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

        .blog-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 1rem 2rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .blog-card {
          background: #111;
          border-radius: 16px;
          border: 1px solid rgba(52, 211, 153, 0.12);
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          border-color: rgba(230, 212, 204);
          box-shadow: 0 8px 40px rgba(230, 212, 204);
        }

        .blog-card-image {
          width: 100%;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 1rem 0 1rem;
        }

        .blog-card-image img {
          width: 100%;
          max-height: 220px;
          object-fit: contain;
          border-radius: 12px;
          background: #141414;
          border: 2px solid rgba(52, 211, 153, 0.15);   /* stronger border */
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }

        .blog-card-image img:hover {
          transform: scale(1.01);
          border-color: rgba(230, 212, 204);
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.12);
        }

        .blog-card-body {
          padding: 1.25rem 1.5rem 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .blog-card-title {
          font-size: clamp(1.1rem, 2.2vw, 1.5rem);
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.4;
          margin-bottom: 0.6rem;
        }

        .blog-card-content {
          font-size: 0.96rem;
          color: #94a3b8;
          line-height: 1.85;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.3s ease;
          max-height: 130px; /* ~5 lines */
        }

        .blog-card-content.expanded {
          max-height: 3000px; /* huge so it expands fully */
        }

        .blog-card-footer {
          margin-top: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .read-more-btn {
          background: none;
          border: none;
          color: #34d399;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          padding: 0.2rem 0;
          transition: color 0.25s, transform 0.25s;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: 'Georgia', serif;
        }

        .read-more-btn:hover {
          color: #6ee7b7;
          transform: translateX(4px);
        }

        .read-more-btn .arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .read-more-btn.expanded .arrow {
          transform: rotate(180deg);
        }

        /* ====== RESPONSIVE ====== */

        @media (min-width: 768px) {
          .blog-card {
            flex-direction: row;
            align-items: stretch;
          }

          .blog-card-image {
            flex: 0 0 35%;
            max-width: 35%;
            padding: 1.25rem 0 1.25rem 1.25rem;
            align-items: center;
            justify-content: center;
          }

          .blog-card-image img {
            max-height: 240px;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
          }

          .blog-card-body {
            flex: 1;
            padding: 1.5rem 1.75rem 1.75rem 1.5rem;
            justify-content: center;
          }

          .blog-card-content {
            max-height: 140px;
          }
          .blog-card-content.expanded {
            max-height: 3000px;
          }
        }

        @media (max-width: 767px) {
          .blog-container {
            padding: 0 1rem 4rem;
            gap: 2rem;
          }

          .blog-card-image {
            padding: 0.75rem 0.75rem 0 0.75rem;
          }

          /* 🔥 BIGGER IMAGE ON MOBILE */
          .blog-card-image img {
            max-height: 260px;
            width: 100%;
            object-fit: contain;
            border-width: 2px;
          }

          .blog-card-body {
            padding: 1rem 1.25rem 1.25rem;
          }

          .blog-card-content {
            font-size: 0.92rem;
            line-height: 1.7;
            max-height: 110px;
          }
          .blog-card-content.expanded {
            max-height: 3000px;
          }

          .blog-card-title {
            font-size: 1.15rem;
          }
        }

        @media (max-width: 480px) {
          .blog-container {
            padding: 0 0.75rem 3.5rem;
            gap: 1.5rem;
          }

          .blog-card-body {
            padding: 0.85rem 1rem 1.1rem;
          }

          /* 🔥 EVEN BIGGER ON VERY SMALL SCREENS */
          .blog-card-image img {
            max-height: 220px;
          }

          .blog-card-content {
            font-size: 0.88rem;
            max-height: 100px;
          }
          .blog-card-content.expanded {
            max-height: 3000px;
          }

          .page-header {
            padding: 2rem 0.75rem 1.75rem;
          }
          .page-title {
            font-size: 2rem;
          }
        }

        @media (min-width: 1024px) {
          .blog-card-image {
            flex: 0 0 32%;
            max-width: 32%;
          }
          .blog-card-image img {
            max-height: 280px;
          }
          .blog-card-content {
            max-height: 150px;
          }
          .blog-card-content.expanded {
            max-height: 3000px;
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
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-300 backdrop-blur-sm mb-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Latest Updates
        </div>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 4rem)",
            fontWeight: 900,
            margin: 0,
          }}
        >
          <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
            Blogs
          </span>
        </h1>
        <p
          style={{
            color: "#64748b",
            fontSize: "1rem",
            marginTop: "0.5rem",
          }}
        >
          Fitness tips, guides, and transformation stories
        </p>
      </div>

      {/* ================= BLOG LIST ================= */}

      <div className="blog-container">
        {posts.map((post: BlogPost, index: number) => {
          const isExpanded = expanded[index] || false;
          const showReadMore = (post.content?.length ?? 0) > 350;

          return (
            <article key={index} className="blog-card">
              {/* Image */}
              <div className="blog-card-image">
                {post.blogImage ? (
                  <img
                    src={post.blogImage}
                    alt={post.title}
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "140px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#475569",
                      fontSize: "0.9rem",
                      background: "#181818",
                      borderRadius: "12px",
                      border: "2px solid rgba(52,211,153,0.1)",
                    }}
                  >
                    📷 No image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="blog-card-body">
                <h2 className="blog-card-title">{post.title}</h2>

                <div
                  className={`blog-card-content ${
                    isExpanded ? "expanded" : ""
                  }`}
                >
                  {post.content}
                </div>

                <div className="blog-card-footer">
                  {showReadMore && (
                    <button
                      className={`read-more-btn ${
                        isExpanded ? "expanded" : ""
                      }`}
                      onClick={() => toggleReadMore(index)}
                    >
                      {isExpanded ? "read less" : "read more"}
                      <span className="arrow">→</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}