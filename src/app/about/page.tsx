const values = [
    "Simple routines",
    "Real progress tracking",
    "Balanced nutrition",
    "Community motivation",
  ];
  
  export default function AboutPage() {
    return (
      <main className="min-h-screen bg-white font-sans">
        {/* Hero — real gym photo + colored gradient overlay */}
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
  
        {/* Main content */}
        <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>
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
            {/* Col 1 */}
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: "0.75rem" }}>
                About DineshSehgalFit – Your Partner in Fitness Transformation
              </h3>
              <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#333", marginBottom: "1rem", lineHeight: 1.5 }}>
                Personal Training India | Online Fitness Coaching | Fat Loss &amp; Muscle Building Plans
              </p>
              <p style={{ fontSize: "0.9rem", color: "#444", lineHeight: 1.8, margin: 0 }}>
                At <strong>DineshSehgalFit</strong>, we help busy professionals, working parents, and fitness
                beginners achieve <strong>fast, sustainable results</strong> through{" "}
                <strong>personalized training and nutrition plans</strong>. Founded by certified fitness
                coach <strong>Sameksh Raut</strong>, our mission is simple: help you{" "}
                <strong>lose fat, build lean muscle</strong>, and feel confident — without extreme diets
                or spending hours in the gym.
              </p>
            </div>
  
            {/* Col 2 */}
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
                OUR VISION
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#444", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                At <strong>DineshSehgalFit</strong>, our vision is to become the most trusted{" "}
                <strong>personal training and online fitness coaching brand in India</strong> — empowering
                people worldwide to <strong>transform their bodies and upgrade their lives</strong> with{" "}
                <em>science-backed fitness and nutrition strategies</em>. We aim to make{" "}
                <strong>healthy living simple, sustainable, and enjoyable</strong>.
              </p>
              <hr style={{ border: "none", borderTop: "1px solid #ddd", marginBottom: "1.5rem" }} />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111", marginBottom: "0.75rem" }}>
                Our Mission
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#444", lineHeight: 1.8, margin: 0 }}>
                To provide <strong>affordable, results-driven fitness programs</strong> that fit into real
                life — whether you're a beginner or an experienced athlete. We combine expert coaching
                with <strong>flexible plans, accountability check-ins</strong>, and a supportive community
                so every member can stay consistent and see real progress.
              </p>
            </div>
  
            {/* Col 3 */}
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111", marginBottom: "0.75rem" }}>
                Our Goal
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#444", lineHeight: 1.8, marginBottom: "1.75rem" }}>
                To deliver life-changing fitness transformations by combining{" "}
                <strong>science-backed training, simple nutrition, and consistent support</strong>,
                helping every client achieve visible, sustainable results.
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
  
        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="wa-float"
          aria-label="Chat on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" fill="white">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.736 5.476 2.027 7.785L0 32l8.455-2.01A15.938 15.938 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.784-1.858l-.486-.29-5.02 1.194 1.227-4.892-.317-.502A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.778c-.398-.199-2.354-1.162-2.72-1.295-.365-.133-.631-.199-.897.2-.266.398-1.03 1.295-1.263 1.561-.232.266-.465.299-.863.1-.398-.2-1.681-.62-3.203-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.2-.232.266-.398.398-.664.133-.266.067-.498-.033-.697-.1-.2-.897-2.162-1.229-2.96-.323-.778-.652-.672-.897-.684l-.764-.013c-.266 0-.698.1-1.063.498-.365.398-1.396 1.362-1.396 3.322s1.43 3.854 1.629 4.12c.2.266 2.813 4.295 6.815 6.024.953.411 1.696.657 2.276.841.956.304 1.827.261 2.516.158.767-.114 2.354-.962 2.687-1.892.333-.93.333-1.727.233-1.892-.1-.166-.365-.266-.763-.465z" />
          </svg>
        </a>
  
        <style>{`
          .wa-float {
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
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .wa-float:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 22px rgba(0,0,0,0.3);
          }
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
            .smf-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 600px) {
            .smf-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </main>
    );
  }