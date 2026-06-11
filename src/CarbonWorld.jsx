import { useState } from "react";

const focusAreas = [
  {
    id: "cities",
    icon: "🏙️",
    title: "Ecological Smart Cities",
    challenge:
      "Urban waterways choked by sediment, foul odour, algal blooms, and spiralling maintenance budgets.",
    solution:
      "Restore clean lakes, drains and rivers in-situ. Eliminate air, water and soil pollution with zero capital investment — and bring greenery back to every life form in the city.",
  },
  {
    id: "agriculture",
    icon: "🌾",
    title: "Agriculture & Animal Husbandry",
    challenge:
      "Crops battered by pests, disease and unpredictable weather, forcing farmers into a cycle of chemical inputs that degrade soil vitality year after year.",
    solution:
      "Make ponds and borewells perennial. Enable chemical-free farming using only treated pond water, raising soil organic carbon above 1 % and achieving zero mortality in aquaculture.",
  },
  {
    id: "water",
    icon: "💧",
    title: "Water Scarcity & Sewage",
    challenge:
      "Over-extraction, inequitable distribution, rapid urban growth and pollution are pushing water tables to critical lows while untreated sewage overwhelms ageing infrastructure.",
    solution:
      "Treat sewage at source, reduce operational costs through optimised in-situ systems and restore water bodies as reliable aquifer recharge points — no excavation required.",
  },
  {
    id: "aquaculture",
    icon: "🐟",
    title: "Aquaculture",
    challenge:
      "Water quality degradation, disease outbreaks, high feed costs and climate stress drive high mortality and financial loss across fish-farming operations.",
    solution:
      "Maintain dissolved oxygen at 4–5 mg/L, ammonia below 0.50, and pH 7–9. Eliminate sludge, enable year-round breeding and restore natural aquatic food chains — completely chemical-free.",
  },
  {
    id: "disaster",
    icon: "🌿",
    title: "Ecological Rejuvenation & Disaster Mitigation",
    challenge:
      "Climate change is compressing the window between drought and flood, eroding soil health and unravelling ecosystems that once buffered communities from extreme weather.",
    solution:
      "Revive perennial water bodies to recharge groundwater, stabilise flood flows, and rebuild self-sustaining ecosystems that make communities resilient without altering their way of life.",
  },
];

const problems12 = [
  "Foul Smell",
  "Sludge / Effluent",
  "Salinity",
  "Mosquitoes",
  "Algal Blooms",
  "Viscosity & Turbidity",
  "Depleted Aqua Life",
  "Weeds",
  "Carbon Sequestration",
  "Aquifer Recharge",
  "Flood Mitigation",
  "Drought Mitigation",
];

const advantages = [
  {
    icon: "⚡",
    title: "Only In-Situ Solution Worldwide",
    desc: "Works in existing conditions — no excavation, no relocation.",
  },
  {
    icon: "♻️",
    title: "Comprehensive Waste Management",
    desc: "Consumes sewage, effluents, algal blooms and weeds in all forms.",
  },
  {
    icon: "🦟",
    title: "Mosquito Eradication",
    desc: "Natural elimination of mosquito breeding grounds.",
  },
  {
    icon: "🌍",
    title: "Carbon Sequestration",
    desc: "Turns water bodies into carbon sinks for net-zero goals.",
  },
  {
    icon: "🌊",
    title: "Flood Control",
    desc: "Stops overflow and provides effective flood management.",
  },
  {
    icon: "💰",
    title: "Zero Capital Investment",
    desc: "Fully operational-expenditure model — no upfront cost.",
  },
];

const faqs = [
  {
    q: "What problems of a water body does the technology solve?",
    a: "All five basic problems — foul smell, algal blooms, weeds, sludge and mosquitoes — are solved in in-situ conditions.",
  },
  {
    q: "What are the additional benefits of a treated water body?",
    a: "A treated water body can consume sewage, recharge aquifers, mitigate air pollution and eventually serve as a drinking water source.",
  },
  {
    q: "How is the solution applied?",
    a: "Dilute 1 ml of the plant-based potion in 10 litres of bore-well water and pour it into the water body. Dosage frequency depends on the size of the body and the rate of incoming contamination.",
  },
  {
    q: "Is it a one-time treatment?",
    a: "No — like any living system, continuous care is needed because contamination cannot be fully quantified or controlled in advance.",
  },
  {
    q: "Can it perform desalination?",
    a: "Yes. Salt is consumed within the aquatic ecology, but a pond or lake is required to run the process.",
  },
  {
    q: "What are the site prerequisites?",
    a: "The bed must be unlined, the surface open to air and sunlight, minimum area 10,000 sq. ft., and water depth at least 5 ft (not required for flowing bodies like rivers or drains).",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`faq-item ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <div className="faq-q">
        <span>{q}</span>
        <span className="faq-chevron">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

export default function CarbonWorld() {
  const [activeArea, setActiveArea] = useState("cities");
  const active = focusAreas.find((f) => f.id === activeArea);

  return (
    <>
      <style>{`
        /* ── Tokens ── */
        :root {
          --ink:       #0d1f12;
          --leaf:      #1a6b35;
          --moss:      #2e8b57;
          --sprout:    #5bbf6e;
          --water:     #1e5b8a;
          --mist:      #e8f4ec;
          --fog:       #f2f8f4;
          --white:     #ffffff;
          --sand:      #f7f3ec;
          --accent:    #c8e63d;   /* single bold accent — lime-yellow from nature */
          --text-sub:  #4a6150;
          --radius:    12px;
          --shadow:    0 4px 24px rgba(0,0,0,0.08);
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cw-page {
          color: var(--ink);
          background: var(--white);
          line-height: 1.65;
          font-size: 16px;
        }

        /* ── HERO ── */
        .cw-hero {
          background: var(--leaf);
          color: var(--white);
          padding: 80px 48px 72px;
          position: relative;
          overflow: hidden;
        }
        .cw-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q45 20 30 35 Q15 20 30 5Z' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E") repeat;
          pointer-events: none;
        }
        .cw-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }
        .cw-eyebrow {
          display: inline-block;
          background: var(--accent);
          color: var(--ink);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 999px;
          margin-bottom: 24px;
        }
        .cw-hero h1 {
          font-size: clamp(2rem, 5vw, 3.4rem);
          font-weight: 800;
          line-height: 1.15;
          max-width: 680px;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }
        .cw-hero h1 em {
          font-style: normal;
          color: var(--accent);
        }
        .cw-hero p {
          font-size: 1.1rem;
          max-width: 580px;
          opacity: 0.88;
          margin-bottom: 36px;
        }
        .cw-hero-stats {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }
        .cw-stat {
          display: flex;
          flex-direction: column;
        }
        .cw-stat strong {
          font-size: 2rem;
          font-weight: 900;
          color: var(--accent);
          line-height: 1;
        }
        .cw-stat span {
          font-size: 0.78rem;
          opacity: 0.75;
          margin-top: 4px;
        }

        /* ── SECTION WRAPPER ── */
        .cw-section {
          padding: 72px 48px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .cw-section-alt {
          background: var(--fog);
        }
        .cw-section-alt .cw-section {
          background: transparent;
        }
        .cw-section-water {
          background: var(--water);
          color: var(--white);
        }
        .cw-section-water .cw-section { background: transparent; }

        .cw-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--moss);
          margin-bottom: 10px;
        }
        .cw-section-water .cw-label { color: var(--accent); }

        h2.cw-h2 {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .cw-section-water h2.cw-h2 { color: var(--white); }

        .cw-lead {
          font-size: 1.05rem;
          color: var(--text-sub);
          max-width: 640px;
          margin-bottom: 48px;
        }
        .cw-section-water .cw-lead { color: rgba(255,255,255,0.8); }

        /* ── ABOUT ── */
        .cw-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 700px) { .cw-about-grid { grid-template-columns: 1fr; } }
        .cw-about-text p {
          color: var(--text-sub);
          margin-bottom: 16px;
          font-size: 0.97rem;
        }
        .cw-about-callout {
          background: var(--leaf);
          color: var(--white);
          border-radius: var(--radius);
          padding: 32px;
        }
        .cw-about-callout h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--accent);
        }
        .cw-about-callout p {
          font-size: 0.92rem;
          opacity: 0.88;
          line-height: 1.7;
        }

        /* ── PROBLEMS GRID ── */
        .cw-problems-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
        }
        .cw-prob-chip {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          padding: 14px 16px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--white);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cw-prob-chip::before {
          content: '✓';
          color: var(--accent);
          font-weight: 900;
          flex-shrink: 0;
        }

        /* ── FOCUS AREAS ── */
        .cw-focus-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
        }
        @media (max-width: 700px) { .cw-focus-layout { grid-template-columns: 1fr; } }
        .cw-focus-tabs {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cw-tab {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-sub);
          border: none;
          background: transparent;
          text-align: left;
          transition: background 0.18s, color 0.18s;
        }
        .cw-tab:hover { background: var(--mist); color: var(--leaf); }
        .cw-tab.active {
          background: var(--leaf);
          color: var(--white);
        }
        .cw-tab-icon { font-size: 1.1rem; }

        .cw-focus-panel {
          background: var(--white);
          border: 1px solid #d8ead2;
          border-radius: var(--radius);
          padding: 36px;
          box-shadow: var(--shadow);
        }
        .cw-focus-panel h3 {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 24px;
          color: var(--leaf);
        }
        .cw-focus-block { margin-bottom: 24px; }
        .cw-focus-block-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-sub);
          margin-bottom: 8px;
        }
        .cw-focus-block p {
          font-size: 0.95rem;
          color: var(--ink);
          line-height: 1.7;
        }
        .cw-challenge-box {
          background: #fff8f0;
          border-left: 3px solid #e8a040;
          padding: 14px 16px;
          border-radius: 0 8px 8px 0;
        }
        .cw-solution-box {
          background: var(--mist);
          border-left: 3px solid var(--moss);
          padding: 14px 16px;
          border-radius: 0 8px 8px 0;
        }

        /* ── ADVANTAGES ── */
        .cw-adv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .cw-adv-card {
          background: var(--white);
          border: 1px solid #d8ead2;
          border-radius: var(--radius);
          padding: 24px;
          box-shadow: var(--shadow);
        }
        .cw-adv-icon {
          font-size: 1.8rem;
          margin-bottom: 12px;
        }
        .cw-adv-card h4 {
          font-size: 0.97rem;
          font-weight: 700;
          margin-bottom: 6px;
          color: var(--leaf);
        }
        .cw-adv-card p {
          font-size: 0.88rem;
          color: var(--text-sub);
        }

        /* ── METRICS ── */
        .cw-metrics {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          margin-top: 40px;
        }
        .cw-metric {
          flex: 1;
          min-width: 180px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: var(--radius);
          padding: 28px 24px;
          text-align: center;
        }
        .cw-metric-val {
          font-size: 2.8rem;
          font-weight: 900;
          color: var(--accent);
          line-height: 1;
        }
        .cw-metric-label {
          font-size: 0.82rem;
          margin-top: 8px;
          opacity: 0.8;
        }

        /* ── FAQ ── */
        .cw-faq-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 780px;
        }
        .faq-item {
          border: 1px solid #d8ead2;
          border-radius: var(--radius);
          padding: 18px 22px;
          cursor: pointer;
          transition: box-shadow 0.18s;
          background: var(--white);
        }
        .faq-item:hover { box-shadow: var(--shadow); }
        .faq-item.open { border-color: var(--moss); }
        .faq-q {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          font-weight: 600;
          font-size: 0.96rem;
          color: var(--ink);
        }
        .faq-chevron {
          font-size: 1.3rem;
          color: var(--moss);
          flex-shrink: 0;
          font-weight: 400;
        }
        .faq-a {
          margin-top: 12px;
          font-size: 0.92rem;
          color: var(--text-sub);
          line-height: 1.7;
          padding-top: 12px;
          border-top: 1px solid #e6f0e8;
        }

        /* ── FOOTER BAND ── */
        .cw-footer {
          background: var(--ink);
          color: rgba(255,255,255,0.75);
          padding: 40px 48px;
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }
        .cw-footer strong { color: var(--white); }
        .cw-footer a { color: var(--accent); text-decoration: none; }
      `}</style>

      <div className="cw-page">

        {/* ── HERO ── */}
        <section className="cw-hero">
          <div className="cw-hero-inner">
            <span className="cw-eyebrow">Made in Bharat · Indigenous Technology</span>
            <h1>
              Healing Water to<br />
              <em>Restore Nature's Cycles</em>
            </h1>
            <p>
              Carbon World Economics develops a 100 % plant-based, chemical-free
              technology that revives inland water bodies in-situ — without excavation,
              relocation, or changes to how communities live.
            </p>
            <div className="cw-hero-stats">
              <div className="cw-stat">
                <strong>0%</strong>
                <span>Capex Required</span>
              </div>
              <div className="cw-stat">
                <strong>25%+</strong>
                <span>Cost Savings vs. Alternatives</span>
              </div>
              <div className="cw-stat">
                <strong>12</strong>
                <span>Water Body Problems Solved</span>
              </div>
              <div className="cw-stat">
                <strong>17</strong>
                <span>UN SDGs Addressed</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section>
          <div className="cw-section">
            <div className="cw-label">Who We Are</div>
            <h2 className="cw-h2">An indigenous answer to a global crisis</h2>
            <div className="cw-about-grid">
              <div className="cw-about-text">
                <p>
                  Carbon World Economics is an indigenous "Made in Bharat"
                  organisation whose mission is a Carbon Neutral World — free from
                  drought, sewage overflow, floods, air pollution, and synthetic
                  chemicals in the food chain.
                </p>
                <p>
                  The technology was derived from knowledge preserved in ancient
                  Indian texts and rural adages. The plant-based potion contains no
                  synthetic chemicals and no living organisms in any form, making it
                  safe for every ecosystem it enters.
                </p>
                <p>
                  The root cause of today's climate emergencies — wildfires, pandemics,
                  floods and droughts — is a broken water cycle caused by decades of
                  synthetic chemicals and plastics. Carbon World targets the invisible
                  vertical flow of water through soil beneath every inland water body,
                  the cycle modern technology has overlooked.
                </p>
              </div>
              <div className="cw-about-callout">
                <h3>The Core Insight</h3>
                <p>
                  In Indigenous Languages across the world there are no words like
                  "Conservation" or "Saving" — only "Healing and Caring." Everything
                  in nature is food for something else within an ecological food chain.
                  The Water Cycle is the key that unlocks the whole of ecology, and
                  it flows not just horizontally through rivers, but vertically through
                  the soil beneath every water body. That invisible vertical flow is
                  exactly what this technology restores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 12 PROBLEMS ── */}
        <div className="cw-section-water">
          <div className="cw-section">
            <div className="cw-label">Proven Outcomes</div>
            <h2 className="cw-h2">12 problems solved in every water body</h2>
            <p className="cw-lead">
              A single treatment protocol addresses every major challenge facing any
              inland water body — from odour to carbon sequestration.
            </p>
            <div className="cw-problems-grid">
              {problems12.map((p) => (
                <div key={p} className="cw-prob-chip">{p}</div>
              ))}
            </div>
            <div className="cw-metrics">
              <div className="cw-metric">
                <div className="cw-metric-val">0%</div>
                <div className="cw-metric-label">Capex Required</div>
              </div>
              <div className="cw-metric">
                <div className="cw-metric-val">25%</div>
                <div className="cw-metric-label">Cheaper Than Any Alternative</div>
              </div>
              <div className="cw-metric">
                <div className="cw-metric-val">100%</div>
                <div className="cw-metric-label">Ecological, Plant-Based Solution</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FOCUS AREAS ── */}
        <div className="cw-section-alt">
          <div className="cw-section">
            <div className="cw-label">Focus Areas</div>
            <h2 className="cw-h2">Where the technology works</h2>
            <p className="cw-lead">
              From urban waterways to remote farmland — select an area to see the
              challenge and how in-situ ecological restoration addresses it.
            </p>
            <div className="cw-focus-layout">
              <div className="cw-focus-tabs">
                {focusAreas.map((f) => (
                  <button
                    key={f.id}
                    className={`cw-tab ${activeArea === f.id ? "active" : ""}`}
                    onClick={() => setActiveArea(f.id)}
                  >
                    <span className="cw-tab-icon">{f.icon}</span>
                    {f.title}
                  </button>
                ))}
              </div>
              {active && (
                <div className="cw-focus-panel">
                  <h3>{active.icon} {active.title}</h3>
                  <div className="cw-focus-block">
                    <div className="cw-focus-block-label">Challenge</div>
                    <div className="cw-challenge-box">
                      <p>{active.challenge}</p>
                    </div>
                  </div>
                  <div className="cw-focus-block">
                    <div className="cw-focus-block-label">Solution</div>
                    <div className="cw-solution-box">
                      <p>{active.solution}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── ADVANTAGES ── */}
        <section>
          <div className="cw-section">
            <div className="cw-label">Advantages</div>
            <h2 className="cw-h2">Why nothing else compares</h2>
            <p className="cw-lead">
              Every advantage below is a direct consequence of working in-situ with
              nature's own chemistry rather than fighting it with synthetic inputs.
            </p>
            <div className="cw-adv-grid">
              {advantages.map((a) => (
                <div key={a.title} className="cw-adv-card">
                  <div className="cw-adv-icon">{a.icon}</div>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <div className="cw-section-alt">
          <div className="cw-section">
            <div className="cw-label">FAQ</div>
            <h2 className="cw-h2">Common questions</h2>
            <p className="cw-lead">
              Practical answers about how the technology works, what it requires,
              and what results to expect.
            </p>
            <div className="cw-faq-list">
              {faqs.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER BAND ── */}
        <footer className="cw-footer">
          <div>
            <strong>Carbon World Economics</strong>
            <br />© 2025 Carbon World Business · All Rights Reserved
          </div>
          <div>
            <a href="mailto:carbonworldeconomics@gmail.com">
              carbonworldeconomics@gmail.com
            </a>
            &nbsp;·&nbsp;
            <a href="tel:+919329771384">+91 93297 71384</a>
          </div>
          <div>
            <a href="https://carbonworldeconomics.org" target="_blank" rel="noreferrer">
              carbonworldeconomics.org ↗
            </a>
          </div>
        </footer>

      </div>
    </>
  );
}
