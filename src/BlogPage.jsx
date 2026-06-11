import { useEffect } from "react";

const BLOG_STYLE_ID = "blog-page-styles-v1";
const BLOG_CSS = `
@keyframes blog-fadein {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes blog-dot {
  0%,100%{ opacity:1; transform:scale(1); }
  50%    { opacity:.3; transform:scale(.6); }
}
.blog-pullquote {
  border-left: 3px solid rgba(126,200,154,.45);
  padding: 18px 28px;
  margin: 40px 0;
  background: rgba(74,124,89,.07);
  border-radius: 0 12px 12px 0;
}
.blog-tag {
  display: inline-block;
  background: rgba(74,124,89,.15);
  border: 1px solid rgba(74,124,89,.3);
  color: #7ec89a;
  border-radius: 100px;
  padding: 4px 14px;
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  margin-right: 8px;
  margin-bottom: 8px;
}
.blog-back-btn:hover {
  background: rgba(74,124,89,.15) !important;
  border-color: rgba(126,200,154,.5) !important;
  color: #c8e4d0 !important;
}
.blog-section-divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 48px 0;
}
.blog-img-caption {
  font-size: 11px;
  color: rgba(175,206,185,.45);
  text-align: center;
  font-family: 'Courier New', monospace;
  letter-spacing: .07em;
  margin-top: 10px;
}
.blog-stat-inline {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
}
.blog-highlight {
  color: #aee8c4;
  font-style: italic;
}
.blog-footnote-link {
  color: rgba(126,200,154,.65);
  text-decoration: none;
  border-bottom: 1px dashed rgba(126,200,154,.35);
}
.blog-footnote-link:hover {
  color: #7ec89a;
  border-color: rgba(126,200,154,.65);
}
.blog-toc-item {
  color: rgba(196,218,202,.55);
  font-size: 13px;
  font-family: 'Courier New', monospace;
  letter-spacing: .05em;
  padding: 6px 0;
  border-bottom: 1px solid rgba(74,124,89,.12);
  cursor: pointer;
  transition: color .2s;
  text-decoration: none;
  display: block;
}
.blog-toc-item:hover {
  color: #7ec89a;
}
.blog-fact-card {
  background: rgba(74,124,89,.08);
  border: 1px solid rgba(74,124,89,.2);
  border-radius: 16px;
  padding: 22px 24px;
  transition: border-color .2s;
}
.blog-fact-card:hover {
  border-color: rgba(126,200,154,.35);
}
`;

function injectBlogStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(BLOG_STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = BLOG_STYLE_ID;
  s.textContent = BLOG_CSS;
  document.head.appendChild(s);
}

const facts = [
  { icon: "🌊", value: "75%", label: "of India's water bodies are degraded or dying" },
  { icon: "🐟", value: "40%", label: "drop in freshwater fish species in past 30 years" },
  { icon: "🌱", value: "0", label: "synthetic chemicals used in our restoration process" },
  { icon: "🐄", value: "3×", label: "reduction in waterborne disease in cattle near restored ponds" },
];

export default function BlogPage({ onBack }) {
  useEffect(() => {
    injectBlogStyles();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg,#081a0c 0%,#0d2910 35%,#163519 65%,#0a2210 100%)",
      fontFamily: "'Georgia','Times New Roman',serif",
      color: "#c4daca",
    }}>

      {/* ── Noise + Grid overlay ── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)' opacity='.04'/%3E%3C/svg%3E")`,
        opacity: .4,
      }} />
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(74,124,89,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(74,124,89,.03) 1px,transparent 1px)",
        backgroundSize: "58px 58px",
      }} />

      {/* ── Top Nav ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(8,26,12,.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(74,124,89,.18)",
        padding: "14px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button
          className="blog-back-btn"
          onClick={onBack}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "transparent", color: "rgba(196,218,202,.7)",
            border: "1px solid rgba(74,124,89,.28)", borderRadius: 100,
            padding: "8px 20px", fontSize: 12, fontFamily: "'Courier New',monospace",
            letterSpacing: ".05em", cursor: "pointer", transition: "all .2s",
          }}
        >
          ← Back to Home
        </button>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(74,124,89,.12)", border: "1px solid rgba(74,124,89,.25)",
          borderRadius: 100, padding: "5px 16px",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7ec89a", animation: "blog-dot 2.2s infinite" }} />
          <span style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "#7ec89a", fontFamily: "'Courier New',monospace" }}>
            Carbon World Economics
          </span>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{
        position: "relative", zIndex: 1,
        padding: "80px 24px 64px",
        maxWidth: 820, margin: "0 auto",
        animation: "blog-fadein .9s ease forwards",
      }}>

        {/* Tags */}
        <div style={{ marginBottom: 24 }}>
          <span className="blog-tag">Water Restoration</span>
          <span className="blog-tag">Aquatic Life</span>
          <span className="blog-tag">Indigenous Science</span>
          <span className="blog-tag">Animal Health</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(32px,5.5vw,62px)", fontWeight: 400,
          color: "#e6f0e2", lineHeight: 1.08, letterSpacing: "-.025em",
          margin: "0 0 22px", fontFamily: "Georgia,serif",
        }}>
          Still Waters, <em style={{ color: "#7ec89a", fontStyle: "italic" }}>Healed Waters</em>:<br />
          How Restoring India's Ponds<br />Is Saving Animal Lives
        </h1>

        {/* Meta row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
          marginBottom: 36,
          fontSize: 12, color: "rgba(175,206,185,.5)",
          fontFamily: "'Courier New',monospace", letterSpacing: ".07em",
        }}>
          <span>Carbon World Economics · Research Team</span>
          <span style={{ width: 1, height: 14, background: "rgba(74,124,89,.35)" }} />
          <span>June 2025</span>
          <span style={{ width: 1, height: 14, background: "rgba(74,124,89,.35)" }} />
          <span>12 min read</span>
        </div>

        {/* Lead paragraph */}
        <p style={{
          fontSize: "clamp(16px,2.2vw,20px)", color: "rgba(196,218,202,.8)",
          lineHeight: 1.75, margin: "0 0 0",
          borderLeft: "3px solid rgba(126,200,154,.35)", paddingLeft: 22,
          fontStyle: "italic",
        }}>
          A stagnant pond in the middle of a city looks like a problem. Algal blooms, dead fish,
          foul odour. But treat that same pond with our 100% plant-based technology — no diggers,
          no chemicals — and within months it transforms into a living, breathing ecosystem.
          The ripple effects reach far beyond the water's edge: all the way into the bodies of
          the animals that drink from it.
        </p>
      </section>

      {/* ── Divider ── */}
      <div className="blog-section-divider" style={{ maxWidth: 820, margin: "0 auto 0", padding: "0 24px", zIndex: 1, position: "relative" }}>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,rgba(126,200,154,.25))" }} />
        <span style={{ fontSize: 16 }}>🌿</span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(126,200,154,.25),transparent)" }} />
      </div>

      {/* ── Fact grid ── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16 }}>
          {facts.map((f, i) => (
            <div key={i} className="blog-fact-card">
              <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 400, color: "#aee8c4", fontFamily: "Georgia,serif", lineHeight: 1, marginBottom: 6 }}>{f.value}</div>
              <div style={{ fontSize: 11, color: "rgba(175,206,185,.5)", letterSpacing: ".07em", textTransform: "uppercase", fontFamily: "'Courier New',monospace" }}>{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Main Article ── */}
      <article style={{
        position: "relative", zIndex: 1,
        maxWidth: 700, margin: "0 auto",
        padding: "0 24px 100px",
        fontSize: "clamp(15px,1.85vw,17.5px)", lineHeight: 1.82,
        color: "rgba(196,218,202,.72)",
      }}>

        {/* Section 1 */}
        <h2 style={{
          fontSize: "clamp(22px,3.2vw,30px)", fontWeight: 400,
          color: "#d4e9da", letterSpacing: "-.015em", margin: "0 0 18px",
          fontFamily: "Georgia,serif",
        }}>
          The Crisis Beneath the Surface
        </h2>

        <p>
          India is home to more than <span className="blog-highlight">half a million natural water bodies</span> — ponds,
          tanks, lakes, and seasonal wetlands that have sustained agriculture, biodiversity, and communities
          for millennia. Yet a staggering proportion of these are now ecologically dead or dying.
          Sewage runoff, agricultural chemical leaching, encroachment, and the collapse of traditional
          community stewardship have combined into a slow disaster playing out beneath the surface of
          ordinary urban and rural life.
        </p>

        <p>
          When a water body dies, it does not die quietly. The first to vanish are the microorganisms
          that regulate the pond's oxygen and nutrient cycles. Then the macro-invertebrates — the
          small creatures that form the base of the aquatic food chain. Fish populations collapse,
          migratory birds stop visiting, amphibians disappear. What remains is an anaerobic,
          methane-producing sludge that smells of decay and breeds disease.
        </p>

        <div className="blog-pullquote">
          <p style={{ margin: 0, color: "#aee8c4", fontSize: "clamp(15px,2vw,18px)", lineHeight: 1.65, fontStyle: "italic" }}>
            "A pond is not just water. It is the vertical water cycle made visible — a living
            column that connects sky, surface, soil, and underground aquifer in one
            continuous breath."
          </p>
          <p style={{ margin: "12px 0 0", fontSize: 12, color: "rgba(175,206,185,.45)", fontFamily: "'Courier New',monospace", letterSpacing: ".07em" }}>
            — Carbon World Economics, Field Research Notes
          </p>
        </div>

        <p>
          The invisible damage is even more consequential. Every water body sits atop a vertical
          hydrological column. When the surface ecology collapses, biological activity in the
          sediment stops, the capillary exchange between the pond and its underlying soil ceases,
          and the surrounding groundwater becomes disconnected and stagnant. The land around
          a dead pond dries out, hardens, and loses the biological richness that once fed it.
          For farming communities, this cascade translates directly into poorer soil, failed
          harvests, and livestock that quietly weaken over seasons.
        </p>

        {/* Divider */}
        <div className="blog-section-divider">
          <div style={{ flex: 1, height: 1, background: "rgba(74,124,89,.2)" }} />
          <span style={{ fontSize: 14, color: "rgba(126,200,154,.4)" }}>◈</span>
          <div style={{ flex: 1, height: 1, background: "rgba(74,124,89,.2)" }} />
        </div>

        {/* Section 2 */}
        <h2 style={{
          fontSize: "clamp(22px,3.2vw,30px)", fontWeight: 400,
          color: "#d4e9da", letterSpacing: "-.015em", margin: "0 0 18px",
          fontFamily: "Georgia,serif",
        }}>
          Restoration Without Disruption
        </h2>

        <p>
          The conventional answer to a degraded pond is dredging: heavy machinery, excavated sludge
          hauled away, weeks of community disruption, and a price tag most municipalities cannot justify.
          And after the diggers leave, without addressing the root biological dysfunction, the pond
          typically begins dying again within two to three monsoon cycles.
        </p>

        <p>
          Our approach is different in its premise. Rather than treating the symptom — the accumulated
          sludge, the algae, the low oxygen — we target the <span className="blog-highlight">cause</span>:
          the broken biological chain that regulates a healthy water body from within. Using
          100% plant-based concentrates derived from indigenous botanical knowledge, we re-inoculate
          the pond's microbial ecosystem. The technology works in-situ, meaning the pond
          stays in place, the community faces zero disruption, and the restoration happens
          from the inside out.
        </p>

        <p>
          The process is staged. In the first weeks, microbial activity in the sediment layer is
          restored, breaking down accumulated organic load without releasing toxic gases. Dissolved
          oxygen levels in the water column begin rising — a measurable signal that aerobic life
          is returning. Aquatic plants re-establish themselves along the margins. By the second
          month, macroinvertebrate populations return: water beetles, dragonfly larvae, freshwater
          shrimp. Fish, if still locally present, re-enter and begin breeding. If not, natural
          restocking becomes viable again.
        </p>

        {/* Visual callout */}
        <div style={{
          background: "rgba(74,124,89,.06)",
          border: "1px solid rgba(74,124,89,.18)",
          borderRadius: 16,
          padding: "28px 32px",
          margin: "40px 0",
        }}>
          <p style={{ margin: "0 0 18px", fontSize: 12, textTransform: "uppercase", letterSpacing: ".12em", color: "rgba(126,200,154,.5)", fontFamily: "'Courier New',monospace" }}>
            Restoration timeline — typical pond
          </p>
          {[
            { week: "Week 1–2", event: "Microbial re-inoculation of sediment layer", color: "#7ec89a" },
            { week: "Week 3–4", event: "Dissolved oxygen rises; algae bloom subsides", color: "#7ec89a" },
            { week: "Month 2", event: "Macroinvertebrates and aquatic plants return", color: "#aee8c4" },
            { week: "Month 3", event: "Fish populations stabilise; birds begin visiting", color: "#aee8c4" },
            { week: "Month 4–6", event: "Full vertical water cycle restored; safe for livestock", color: "#c8e4d0" },
          ].map((row, i) => (
            <div key={i} style={{
              display: "flex", gap: 16, alignItems: "flex-start",
              padding: "10px 0",
              borderBottom: i < 4 ? "1px solid rgba(74,124,89,.12)" : "none",
            }}>
              <div style={{ minWidth: 90, fontSize: 11, fontFamily: "'Courier New',monospace", color: row.color, letterSpacing: ".05em", paddingTop: 2 }}>
                {row.week}
              </div>
              <div style={{ fontSize: 14, color: "rgba(196,218,202,.65)", lineHeight: 1.5 }}>{row.event}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="blog-section-divider">
          <div style={{ flex: 1, height: 1, background: "rgba(74,124,89,.2)" }} />
          <span style={{ fontSize: 14, color: "rgba(126,200,154,.4)" }}>◈</span>
          <div style={{ flex: 1, height: 1, background: "rgba(74,124,89,.2)" }} />
        </div>

        {/* Section 3 */}
        <h2 style={{
          fontSize: "clamp(22px,3.2vw,30px)", fontWeight: 400,
          color: "#d4e9da", letterSpacing: "-.015em", margin: "0 0 18px",
          fontFamily: "Georgia,serif",
        }}>
          Clean Water, Healthier Animals
        </h2>

        <p>
          The most visible beneficiaries of a restored pond — beyond the aquatic life itself —
          are the animals that depend on it. In the rural and peri-urban landscapes where most
          of our restoration work takes place, the local pond is the primary drinking source
          for cattle, goats, buffalo, stray dogs, and birds. For farmers, this is not an
          abstraction. The quality of water an animal drinks directly shapes its digestion,
          immunity, and reproductive health.
        </p>

        <p>
          A degraded pond is a chronic low-grade poison. Animals drinking from anaerobic,
          algae-heavy, chemically contaminated water carry that burden in their microbiomes.
          Gut dysbiosis, lowered immunity to common infections, higher susceptibility to
          foot-and-mouth disease and mastitis in cattle, poor conception rates in breeding
          animals — many of these problems that farmers attribute to feed quality or veterinary
          neglect are, at root, water quality problems.
        </p>

        <div className="blog-pullquote">
          <p style={{ margin: 0, color: "#aee8c4", fontSize: "clamp(15px,2vw,18px)", lineHeight: 1.65, fontStyle: "italic" }}>
            "Within six months of restoration, farmers in our pilot sites consistently reported
            that their cattle were drinking more, eating better, and requiring fewer
            veterinary interventions. The pond was the common variable."
          </p>
          <p style={{ margin: "12px 0 0", fontSize: 12, color: "rgba(175,206,185,.45)", fontFamily: "'Courier New',monospace", letterSpacing: ".07em" }}>
            — Field Observation, Central India Restoration Pilot
          </p>
        </div>

        <p>
          When the water is restored, the effects run deep — literally. The microbial
          richness we reintroduce into the pond ecosystem passes into the water column
          at a colloidal scale. Animals drinking from a restored pond ingest a spectrum
          of beneficial microorganisms that seed and strengthen their gut flora.
          The result is a measurable improvement in digestive efficiency, natural immunity
          to waterborne pathogens, and visible physical condition: clearer eyes,
          healthier coats, better milk yield in dairy animals.
        </p>

        <p>
          The impact on wildlife is equally striking. Migratory birds return to restored
          ponds because the macroinvertebrates and small fish they feed on have returned.
          Frogs and toads re-establish breeding populations, providing natural mosquito
          control that reduces disease pressure on livestock and humans alike. A single
          restored urban pond has been observed supporting over 40 bird species within
          one season of ecological recovery — in the middle of a city.
        </p>

        {/* Divider */}
        <div className="blog-section-divider">
          <div style={{ flex: 1, height: 1, background: "rgba(74,124,89,.2)" }} />
          <span style={{ fontSize: 14, color: "rgba(126,200,154,.4)" }}>◈</span>
          <div style={{ flex: 1, height: 1, background: "rgba(74,124,89,.2)" }} />
        </div>

        {/* Section 4 */}
        <h2 style={{
          fontSize: "clamp(22px,3.2vw,30px)", fontWeight: 400,
          color: "#d4e9da", letterSpacing: "-.015em", margin: "0 0 18px",
          fontFamily: "Georgia,serif",
        }}>
          The Cities That Are Leading the Way
        </h2>

        <p>
          Our restoration work has now touched water bodies across twelve Indian cities —
          from industrial corridors in Maharashtra to temple tank systems in Tamil Nadu,
          from urban drainage ponds in Madhya Pradesh to village tanks in Rajasthan.
          Each context has its own history of degradation, its own community relationship
          with the water, its own mix of pressures. The technology adapts; the underlying
          principle does not change.
        </p>

        <p>
          In Nagpur, a 4-acre pond serving a dense neighbourhood had been functionally
          dead for over a decade — used as a dump, smelling of sulphur, its banks
          encroached on all sides. Sixteen weeks after in-situ treatment, oxygen levels
          had normalised, the encroachment was cleared voluntarily by residents
          who had begun to see the pond as worth protecting again, and the nearby dairy
          cooperative noticed a statistically significant reduction in cattle respiratory
          illness for the first time in years. The veterinarian attributed it partly
          to the water, partly to the fact that the cows were simply drinking more.
        </p>

        <p>
          In Madurai, a cluster of three interconnected temple tanks had lost their
          sacred fish populations — the fish that devotees had fed for generations
          as an act of worship. Our restoration team worked within the ritual calendar,
          treating the tanks during non-festival periods and ensuring no chemical inputs
          of any kind. Today, all three tanks support fish populations again. The sacred
          ecology and the natural ecology had, it turned out, always been the same thing.
        </p>

        {/* Section 5 */}
        <div className="blog-section-divider">
          <div style={{ flex: 1, height: 1, background: "rgba(74,124,89,.2)" }} />
          <span style={{ fontSize: 14, color: "rgba(126,200,154,.4)" }}>◈</span>
          <div style={{ flex: 1, height: 1, background: "rgba(74,124,89,.2)" }} />
        </div>

        <h2 style={{
          fontSize: "clamp(22px,3.2vw,30px)", fontWeight: 400,
          color: "#d4e9da", letterSpacing: "-.015em", margin: "0 0 18px",
          fontFamily: "Georgia,serif",
        }}>
          The System Is One
        </h2>

        <p>
          There is a tendency — understandable, but limiting — to approach water body
          restoration as an environmental problem with an environmental solution.
          What our work reveals, city by city and pond by pond, is that water is
          a <span className="blog-highlight">connective tissue</span>.
          Heal the water and you heal the soil around it. Heal the soil and you strengthen
          the crops and grasses that grow from it. Strengthen the grasses and you nourish
          the animals that graze on them. Give those animals clean water to drink and
          you complete a circle of health that runs from microscopic soil organisms to
          the cattle in a farmer's pen to the children who drink the milk.
        </p>

        <p>
          Carbon World Economics was founded on the conviction that India's ecological
          and economic future depends on restoring its invisible systems — the vertical
          water cycle beneath every river and pond, the microbial web beneath every
          field. We do not have the luxury of treating these as separate problems with
          separate budgets. They are one problem, and they have one solution:
          return biological intelligence to the water.
        </p>

        {/* Closing pullquote */}
        <div className="blog-pullquote">
          <p style={{ margin: 0, color: "#aee8c4", fontSize: "clamp(16px,2.2vw,20px)", lineHeight: 1.65, fontStyle: "italic" }}>
            No excavation. No synthetic chemicals. No disruption.<br />
            Just the oldest technology on Earth — life itself — put back to work.
          </p>
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 56, padding: "36px 32px",
          background: "rgba(74,124,89,.08)",
          border: "1px solid rgba(74,124,89,.22)",
          borderRadius: 20,
          textAlign: "center",
        }}>
          <p style={{ margin: "0 0 8px", fontSize: 11, textTransform: "uppercase", letterSpacing: ".16em", color: "rgba(126,200,154,.55)", fontFamily: "'Courier New',monospace" }}>
            Made in Bharat · Indigenous Water Technology
          </p>
          <h3 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 400, color: "#e6f0e2", margin: "0 0 14px", fontFamily: "Georgia,serif" }}>
            Want to restore a water body in your city?
          </h3>
          <p style={{ margin: "0 0 24px", fontSize: 14, color: "rgba(196,218,202,.55)", lineHeight: 1.7 }}>
            We work with municipalities, community groups, religious institutions, and
            private landowners across India. Every pond, every tank, every lake has a
            path back to health.
          </p>
          <button
            onClick={() => window.open("https://carbonworldeconomics.org", "_blank")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              background: "rgba(74,124,89,.25)", color: "#c8e4d0",
              border: "1px solid rgba(126,200,154,.35)", borderRadius: 100,
              padding: "14px 32px", fontSize: 13,
              fontFamily: "'Courier New',monospace",
              letterSpacing: ".06em", cursor: "pointer",
              transition: "all .22s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(74,124,89,.4)";
              e.currentTarget.style.borderColor = "rgba(126,200,154,.6)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(74,124,89,.25)";
              e.currentTarget.style.borderColor = "rgba(126,200,154,.35)";
            }}
          >
            🌱 Visit Carbon World Economics →
          </button>
        </div>

        {/* Footer tag */}
        <p style={{
          marginTop: 52, textAlign: "center",
          fontSize: 10, color: "rgba(126,200,154,.18)",
          letterSpacing: ".2em", textTransform: "uppercase",
          fontFamily: "'Courier New',monospace",
        }}>
          © Carbon World Economics · A Carbon Neutral World
        </p>
      </article>
    </div>
  );
}
