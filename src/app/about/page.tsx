const values = [
  "Simple routines",
  "Real progress tracking",
  "Balanced nutrition",
  "Community motivation",
];

// ================= WHATSAPP FUNCTION =================

const WHATSAPP_NUMBER = "918175022207";

function getWhatsappUrl() {
  const message = `Hi DineshSehgal! 👋

I want to start my fitness transformation journey.

Please guide me about:
✅ Available Plans
✅ Pricing
✅ Diet Plan
✅ Workout Details

Thank you 🙌`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans">

      {/* Hero Section */}

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "240px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(220,38,38,0.82) 0%, rgba(234,120,30,0.78) 45%, rgba(163,177,20,0.72) 100%)",
          }}
        />

        <h1
          style={{
            position: "relative",
            zIndex: 1,
            color: "#fff",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 800,
            letterSpacing: "0.02em",
            textShadow: "0 2px 20px rgba(0,0,0,0.25)",
            margin: 0,
            textAlign: "center",
            padding: "0 1rem",
          }}
        >
          About Us
        </h1>
      </section>

      {/* Main Content */}

      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "3rem 1.5rem 4rem",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
            fontWeight: 700,
            color: "#222",
            marginBottom: "2.5rem",
          }}
        >
          About us
        </h2>

        <div className="smf-grid">

          {/* Column 1 */}

          <div>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 800,
                color: "#111",
                lineHeight: 1.35,
                marginBottom: "0.75rem",
              }}
            >
              About DineshSehgalFit – Your Partner in Fitness Transformation
            </h3>

            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#333",
                marginBottom: "1rem",
                lineHeight: 1.5,
              }}
            >
              Personal Training India | Online Fitness Coaching | Fat Loss &
              Muscle Building Plans
            </p>

            <p
              style={{
                fontSize: "0.9rem",
                color: "#444",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              At <strong>DineshSehgalFit</strong>, we help busy professionals,
              working parents, and fitness beginners achieve{" "}
              <strong>fast, sustainable results</strong> through{" "}
              <strong>personalized training and nutrition plans</strong>.
              Founded by certified fitness coach{" "}
              <strong>Sameksh Raut</strong>, our mission is simple: help you{" "}
              <strong>lose fat, build lean muscle</strong>, and feel confident —
              without extreme diets or spending hours in the gym.
            </p>
          </div>

          {/* Column 2 */}

          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#111",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.75rem",
              }}
            >
              OUR VISION
            </h3>

            <p
              style={{
                fontSize: "0.9rem",
                color: "#444",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
              }}
            >
              At <strong>DineshSehgalFit</strong>, our vision is to become the
              most trusted personal training and online fitness coaching brand
              in India.
            </p>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #ddd",
                marginBottom: "1.5rem",
              }}
            />

            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#111",
                marginBottom: "0.75rem",
              }}
            >
              Our Mission
            </h3>

            <p
              style={{
                fontSize: "0.9rem",
                color: "#444",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              To provide affordable, results-driven fitness programs that fit
              into real life.
            </p>
          </div>

          {/* Column 3 */}

          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#111",
                marginBottom: "0.75rem",
              }}
            >
              Our Goal
            </h3>

            <p
              style={{
                fontSize: "0.9rem",
                color: "#444",
                lineHeight: 1.8,
                marginBottom: "1.75rem",
              }}
            >
              To deliver life-changing fitness transformations by combining
              science-backed training, simple nutrition, and consistent support.
            </p>

            <div className="smf-values">
              {values.map((v) => (
                <div
                  key={v}
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "0.75rem 1rem",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    color: "#222",
                    background: "#fff",
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHATSAPP BUTTON ================= */}

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

      {/* Styles */}

      <style>{`
        .smf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          align-items: start;
        }

        .smf-values {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        @media (max-width: 900px) {
          .smf-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .smf-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}