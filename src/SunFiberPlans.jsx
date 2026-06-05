import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TABS = ["Monthly", "Quarterly", "Half-Yearly", "Yearly"];

// Base prices (excl GST) per billing cycle, for Internet+OTT at 100 Mbps (hero price)
// You can replace these with your actual figures
const HERO_PRICES = {
  Monthly: { lite: 799, prime: 849, max: 1099 },
  Quarterly: { lite: 720, prime: 769, max: 989 },
  "Half-Yearly": { lite: 690, prime: 739, max: 949 },
  Yearly: { lite: 650, prime: 700, max: 900 },
};

// Multipliers relative to Monthly base price (for sub-plan speed rows)
const CYCLE_MULT = {
  Monthly: 1,
  Quarterly: 0.92,
  "Half-Yearly": 0.88,
  Yearly: 0.81,
};

const OTT_APPS = {
  lite: [
    "JioHotstar", "SonyLiv", "ZEE5", "Sun NXT", "Discovery+", "Lionsgate Play",
    "ShemarooMe", "FanCode", "Docubay", "Aha", "Hoichoi", "Planet Marathi",
    "Klikk", "Nammaflix", "Stage", "Koode", "Neestream", "Oho Gujarati",
    "Fauji", "EpicOn",
  ],
  prime: [
    "JioHotstar", "SonyLiv", "ZEE5", "Sun NXT", "Discovery+", "Lionsgate Play",
    "ShemarooMe", "FanCode", "Docubay", "Aha", "Hoichoi", "Planet Marathi",
    "Klikk", "Nammaflix", "Stage", "Koode", "Neestream", "Oho Gujarati",
    "Fauji", "EpicOn", "Zee5 Premium",
  ],
  max: [
    "JioHotstar", "SonyLiv", "ZEE5", "Prime Video", "Sun NXT", "Discovery+",
    "Lionsgate Play", "ShemarooMe", "FanCode", "Docubay", "Aha", "Hoichoi",
    "Planet Marathi", "Klikk", "Nammaflix", "Stage", "Koode", "Neestream",
    "Oho Gujarati", "Fauji", "EpicOn", "Zee5 Premium", "Manorama Max", "Tata Play",
  ],
};

// Speed rows for each sub-plan — raw monthly prices (CYCLE_MULT applied at render time)
const PLANS = [
  {
    id: "lite",
    tier: "SMARTLINK LITE",
    name: "Smartlink Lite",
    meta: "20 OTT Apps · 483 Live Channels (21 HD)",
    featured: false,
    ottCount: 20,
    subPlans: [
      {
        label: "Internet Only",
        speeds: [
          { speed: "50 Mbps", base: 499 },
          { speed: "100 Mbps", base: 599 },
          { speed: "200 Mbps", base: 899 },
        ],
      },
      {
        label: "Internet + OTT 20 Apps",
        hasOtt: true,
        speeds: [
          { speed: "100 Mbps", base: 800 },
          { speed: "150 Mbps", base: 900 },
          { speed: "200 Mbps", base: 1000 },
          { speed: "300 Mbps", base: 1500 },
        ],
      },
      {
        label: "Internet + IPTV",
        speeds: [
          { speed: "100 Mbps", base: 1000 },
          { speed: "200 Mbps", base: 1400 },
          { speed: "300 Mbps", base: 1800 },
        ],
      },
      {
        label: "Internet + OTT + IPTV 20 Apps",
        hasOtt: true,
        speeds: [
          { speed: "100 Mbps", base: 1100 },
          { speed: "200 Mbps", base: 1549 },
          { speed: "300 Mbps", base: 2099 },
        ],
      },
    ],
  },
  {
    id: "prime",
    tier: "SMARTLINK PRIME",
    name: "Smartlink Prime",
    meta: "21 OTT Apps · 491 Live Channels (59 HD)",
    featured: true,
    ottCount: 21,
    subPlans: [
      {
        label: "Internet Only",
        speeds: [
          { speed: "50 Mbps", base: 499 },
          { speed: "100 Mbps", base: 599 },
          { speed: "200 Mbps", base: 899 },
        ],
      },
      {
        label: "Internet + OTT 21 Apps",
        hasOtt: true,
        speeds: [
          { speed: "100 Mbps", base: 850 },
          { speed: "150 Mbps", base: 950 },
          { speed: "200 Mbps", base: 1050 },
          { speed: "300 Mbps", base: 1600 },
        ],
      },
      {
        label: "Internet + IPTV",
        speeds: [
          { speed: "100 Mbps", base: 1149 },
          { speed: "200 Mbps", base: 1299 },
          { speed: "300 Mbps", base: 1599 },
        ],
      },
      {
        label: "Internet + OTT + IPTV 21 Apps",
        hasOtt: true,
        speeds: [
          { speed: "100 Mbps", base: 1199 },
          { speed: "200 Mbps", base: 1399 },
          { speed: "300 Mbps", base: 1849 },
        ],
      },
    ],
  },
  {
    id: "max",
    tier: "SMARTLINK MAX",
    name: "Smartlink Max",
    meta: "24 OTT Apps · 506 Live Channels (74 HD)",
    featured: false,
    ottCount: 24,
    subPlans: [
      {
        label: "Internet Only",
        speeds: [
          { speed: "50 Mbps", base: 499 },
          { speed: "100 Mbps", base: 599 },
          { speed: "200 Mbps", base: 899 },
        ],
      },
      {
        label: "Internet + OTT 24 Apps",
        hasOtt: true,
        speeds: [
          { speed: "100 Mbps", base: 1100 },
          { speed: "150 Mbps", base: 1200 },
          { speed: "200 Mbps", base: 1300 },
          { speed: "300 Mbps", base: 1800 },
          { speed: "500 Mbps", base: 2800 },
          { speed: "1000 Mbps", base: 4300 },
        ],
      },
      {
        label: "Internet + IPTV",
        speeds: [
          { speed: "100 Mbps", base: 1399 },
          { speed: "200 Mbps", base: 1899 },
          { speed: "300 Mbps", base: 1999 },
        ],
      },
      {
        label: "Internet + OTT + IPTV 24 Apps",
        hasOtt: true,
        speeds: [
          { speed: "100 Mbps", base: 1449 },
          { speed: "200 Mbps", base: 1999 },
          { speed: "300 Mbps", base: 2199 },
        ],
      },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calcPrice(base, tab, gstOn) {
  const v = Math.round(base * CYCLE_MULT[tab] * (gstOn ? 1.18 : 1));
  return "₹" + v.toLocaleString("en-IN");
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({ on, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: 38, height: 22,
        background: on ? "#f97316" : "#d0d0d0",
        borderRadius: 11,
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div style={{
        width: 17, height: 17,
        background: "#fff",
        borderRadius: "50%",
        position: "absolute",
        top: 2.5,
        left: on ? 19 : 2,
        transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </div>
  );
}

// ─── OTT Modal ────────────────────────────────────────────────────────────────

function OttModal({ planId, onClose }) {
  const apps = OTT_APPS[planId] || [];
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "1.5rem",
          maxWidth: 480,
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>
            Included OTT Apps ({apps.length})
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontSize: 20, color: "#888", lineHeight: 1,
            }}
          >×</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {apps.map((app) => (
            <span
              key={app}
              style={{
                background: "#fff7ed", border: "0.5px solid #fed7aa",
                borderRadius: 8, padding: "5px 12px",
                fontSize: 13, color: "#c2440a", fontWeight: 500,
              }}
            >
              {app}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "#aaa", marginTop: "1rem" }}>
          App availability subject to change. Verify with provider.
        </p>
      </div>
    </div>
  );
}

// ─── Shared header (tabs + GST toggle) ───────────────────────────────────────

function PlanHeader({ activeTab, setActiveTab, gstOn, setGstOn, showBack, onBack }) {
  return (
    <div>
      {showBack && (
        <button
          onClick={onBack}
          style={{
            background: "transparent", border: "none",
            color: "#f97316", fontSize: 14, fontWeight: 600,
            cursor: "pointer", display: "flex", alignItems: "center",
            gap: 6, marginBottom: "1.25rem", padding: 0,
          }}
        >
          ← Back to Plans
        </button>
      )}

      <h1 style={{
        textAlign: "center", fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 800,
        background: "linear-gradient(135deg,#f97316,#fb923c)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text", marginBottom: "1rem",
      }}>
        Sun Fiber Plans
      </h1>

      {/* Feature badges */}
      <div style={{
        display: "flex", justifyContent: "center", gap: "0.75rem",
        flexWrap: "wrap", marginBottom: "1.5rem",
      }}>
        {[
          { icon: "📶", text: "Free WiFi Router" },
          { icon: "∞", text: "No Data Limit" },
          { icon: "🕐", text: "24×7 Support" },
        ].map(({ icon, text }) => (
          <div key={text} style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 13, color: "#555",
            background: "#f5f5f5", padding: "6px 14px",
            borderRadius: 20, border: "0.5px solid #e0e0e0",
          }}>
            <span>{icon}</span> {text}
          </div>
        ))}
      </div>

      {/* Billing tabs */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem", paddingTop: "0.5rem" }}>
        <div style={{
          display: "flex",
          border: "0.5px solid #e0e0e0",
          borderRadius: 28,
          background: "#f5f5f5",
          overflow: "visible",
        }}>
          {TABS.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 20px",
                  fontSize: 14, fontWeight: 500,
                  cursor: "pointer",
                  color: active ? "#fff" : "#555",
                  background: active ? "#f97316" : "transparent",
                  border: "none",
                  borderRadius: active ? 26 : 0,
                  transition: "all 0.2s",
                  position: "relative",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
                {tab === "Yearly" && (
                  <span style={{
                    position: "absolute", top: -13, right: 0,
                    background: "#ef4444", color: "#fff",
                    fontSize: 10, padding: "2px 7px",
                    borderRadius: 10, fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}>
                    Save 16%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* GST note + toggle */}
      <p style={{ textAlign: "center", fontSize: 12, color: "#777", marginBottom: "0.4rem" }}>
        All prices <strong>exclude GST (18%).</strong> Yearly plans include 2 months free!
      </p>
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        gap: 8, fontSize: 13, color: "#555", marginBottom: "2rem",
      }}>
        <Toggle on={gstOn} onToggle={() => setGstOn((p) => !p)} />
        Show Prices{" "}
        <span
          style={{ color: "#f97316", fontWeight: 500, cursor: "pointer" }}
          onClick={() => setGstOn((p) => !p)}
        >
          Including 18% GST
        </span>
      </div>
    </div>
  );
}

// ─── Main Page: 3 summary cards ──────────────────────────────────────────────

function MainPage({ activeTab, gstOn, onViewAll }) {
  const prices = HERO_PRICES[activeTab];
  const mult = gstOn ? 1.18 : 1;
  const fmt = (v) => Math.round(v * mult).toLocaleString("en-IN");

  const FEATURES = {
    lite: [
      { text: "Unlimited data, no FUP" },
      { text: "Free WiFi Router" },
      { text: "20 OTT apps included", chips: ["JioHotstar", "SonyLiv", "+18 more ↓"] },
      { text: "483 live channels via IPTV" },
      { text: "24×7 customer support" },
    ],
    prime: [
      { text: "Unlimited data, no FUP" },
      { text: "Free WiFi Router" },
      { text: "21 OTT apps incl. Zee5", chips: ["JioHotstar", "SonyLiv", "Zee5", "+18 more ↓"] },
      { text: "491 live channels via IPTV" },
      { text: "Priority 24×7 support" },
      { text: "Static IP available" },
    ],
    max: [
      { text: "Unlimited data, no FUP" },
      { text: "Free WiFi Router" },
      { text: "24 OTT apps — all platforms", chips: ["JioHotstar", "SonyLiv", "Zee5", "Prime Video", "Lionsgate", "+18 more ↓"] },
      { text: "506 live channels via IPTV" },
      { text: "Priority 24×7 support" },
      { text: "Static IP + CCTV ready" },
    ],
  };

  return (
    <div>
      {/* 3 hero plan cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
        marginBottom: "1.5rem",
      }}>
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            style={{
              background: "#fff",
              border: plan.featured ? "2px solid #f97316" : "0.5px solid #e0e0e0",
              borderRadius: 16,
              padding: "1.5rem",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {plan.featured && (
              <div style={{
                position: "absolute", top: -15, left: "50%",
                transform: "translateX(-50%)",
                background: "#f97316", color: "#fff",
                fontSize: 10, fontWeight: 700,
                padding: "4px 18px", borderRadius: 12,
                whiteSpace: "nowrap", letterSpacing: "0.06em",
              }}>
                MOST POPULAR
              </div>
            )}

            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
              display: "inline-block",
              background: "#fff7ed", color: "#c2640a",
              padding: "3px 10px", borderRadius: 6, marginBottom: 6,
              alignSelf: "flex-start",
            }}>
              {plan.id.toUpperCase()}
            </div>

            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#111", marginBottom: 2 }}>
              {plan.name}
            </div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: "1.2rem" }}>{plan.meta}</div>

            {/* <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 3 }}>
              <span style={{ fontSize: "1rem", fontWeight: 700, color: "#111" }}>₹</span>
              <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111", lineHeight: 1 }}>
                {fmt(prices[plan.id])}
              </span>
              <span style={{ fontSize: 13, color: "#888" }}>/mo</span>
            </div> */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 3,
                marginBottom: 3,
              }}
            >
              <span style={{ fontSize: "1rem", fontWeight: 700, color: "#111" }}>₹</span>

              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#666",
                }}
              >
                Starts from
              </span>

              <span
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  color: "#111",
                  lineHeight: 1,
                }}
              >
                {fmt(prices[plan.id])}
              </span>

              <span style={{ fontSize: 13, color: "#888" }}>/mo</span>
            </div>
            <div style={{ fontSize: 11, color: "#aaa", marginBottom: "1.4rem" }}>
              {gstOn ? "incl." : "+"}18% GST · Billed {activeTab.toLowerCase()}
            </div>

            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 9, marginBottom: "1.5rem", flex: 1 }}>
              {FEATURES[plan.id].map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#222" }}>
                  <span style={{ color: "#22c55e", fontSize: 15, marginTop: 1, flexShrink: 0 }}>✓</span>
                  <div>
                    {f.text}
                    {f.chips && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                        {f.chips.map((c) => (
                          <span key={c} style={{
                            background: c.startsWith("+") ? "#fff7ed" : "#f5f5f5",
                            border: c.startsWith("+") ? "0.5px solid #f97316" : "0.5px solid #e0e0e0",
                            borderRadius: 6, padding: "2px 8px",
                            fontSize: 11,
                            color: c.startsWith("+") ? "#f97316" : "#666",
                          }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <button style={{
              width: "100%", padding: 11, borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              border: "2px solid #f97316",
              background: plan.featured ? "#f97316" : "transparent",
              color: plan.featured ? "#fff" : "#f97316",
            }}>
              Get Connected
            </button>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: 12, color: "#999", marginBottom: "2rem" }}>
        Prices shown for Internet + OTT bundle at 100 Mbps. More speeds & plan types available.
      </p>

      {/* View All button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={onViewAll}
          style={{
            background: "#f97316", color: "#fff",
            border: "none", padding: "13px 48px",
            borderRadius: 10, fontSize: 15, fontWeight: 700,
            cursor: "pointer",
          }}
        >
          View All Plans & Speeds →
        </button>
      </div>
    </div>
  );
}

// ─── All Plans Page ───────────────────────────────────────────────────────────

function SubPlanCard({ subPlan, planId, activeTab, gstOn }) {
  const [showOtt, setShowOtt] = useState(false);

  return (
    <>
      {showOtt && <OttModal planId={planId} onClose={() => setShowOtt(false)} />}
      <div style={{
        background: "#fafafa",
        border: "0.5px solid #ebebeb",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
      }}>
        {/* Sub-card header */}
        <div style={{
          background: "#fff",
          padding: "12px 14px 10px",
          borderBottom: "0.5px solid #ebebeb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          flexWrap: "wrap",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#333" }}>
            {subPlan.label}
          </div>
          {subPlan.hasOtt && (
            <button
              onClick={() => setShowOtt(true)}
              style={{
                background: "#fff7ed", border: "0.5px solid #fed7aa",
                borderRadius: 20, padding: "3px 10px",
                fontSize: 11, color: "#c2440a", fontWeight: 600,
                cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              View OTT Apps ↗
            </button>
          )}
        </div>

        {/* Speed rows */}
        <div style={{ flex: 1 }}>
          {subPlan.speeds.map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "9px 14px",
                borderBottom: i < subPlan.speeds.length - 1 ? "0.5px solid #f0f0f0" : "none",
                background: i % 2 === 0 ? "#fff" : "#fafafa",
              }}
            >
              <span style={{
                fontSize: 13, color: "#333", fontWeight: 500,
                background: "#f0f0f0", padding: "2px 8px",
                borderRadius: 6, display: "inline-block",
              }}>
                {row.speed}
              </span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#f97316" }}>
                  {calcPrice(row.base, activeTab, gstOn)}
                </div>
                <div style={{ fontSize: 10, color: "#bbb" }}>/month effective</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AllPlansPage({ activeTab, gstOn }) {
  return (
    <div>
      <p style={{ textAlign: "center", fontSize: 13, color: "#888", marginBottom: "2rem" }}>
        All prices {gstOn ? "include" : "exclude"} 18% GST · Billed {activeTab.toLowerCase()}
        {activeTab === "Yearly" && <strong> · Includes 2 months free</strong>}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            style={{
              background: "#fff",
              border: plan.featured ? "2px solid #f97316" : "0.5px solid #e0e0e0",
              borderRadius: 18,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Outer card header */}
            {plan.featured && (
              <div style={{
                position: "absolute", top: -1, left: "50%",
                transform: "translateX(-50%)",
                background: "#f97316", color: "#fff",
                fontSize: 10, fontWeight: 700,
                padding: "4px 20px", borderRadius: "0 0 12px 12px",
                letterSpacing: "0.06em", zIndex: 1,
              }}>
                MOST POPULAR
              </div>
            )}

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
              padding: "1.25rem 1.5rem 1rem",
              background: plan.featured ? "#fff9f5" : "#fff",
              borderBottom: "0.5px solid #f0f0f0",
            }}>
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 800, letterSpacing: "0.12em",
                  color: "#f97316", marginBottom: 4,
                }}>
                  {plan.tier}
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111", marginBottom: 2 }}>
                  {plan.name}
                </div>
                <div style={{ fontSize: 12, color: "#888" }}>{plan.meta}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <div style={{
                  background: "#fff7ed", border: "0.5px solid #fed7aa",
                  borderRadius: 8, padding: "5px 12px",
                  fontSize: 12, color: "#c2440a", fontWeight: 600,
                }}>
                  {plan.ottCount} OTT Apps
                </div>
                <button style={{
                  background: "#f97316", color: "#fff",
                  border: "none", borderRadius: 8,
                  padding: "5px 16px", fontSize: 12,
                  fontWeight: 600, cursor: "pointer",
                }}>
                  Get Connected
                </button>
              </div>
            </div>

            {/* 4 sub-plan cards — horizontal scroll on small screens */}
            <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}>
                {console.log(plan.subPlans)}
                {plan.subPlans.map((sp) => (
                  <SubPlanCard
                    key={sp.label}
                    subPlan={sp}
                    planId={plan.id}
                    activeTab={activeTab}
                    gstOn={gstOn}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: 11, color: "#ccc", marginTop: "2rem" }}>
        All prices exclude 18% GST unless toggled. Contact us for enterprise / bulk rates.
      </p>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function SunFiberPlans() {
  const [page, setPage] = useState("main");   // "main" | "all"
  const [activeTab, setActiveTab] = useState("Yearly");
  const [gstOn, setGstOn] = useState(false);

  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#1a1a1a",
      maxWidth: 1100,
      margin: "0 auto",
      padding: "2rem 1rem",
    }}>
      {/* Shared header always visible */}
      <PlanHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        gstOn={gstOn}
        setGstOn={setGstOn}
        showBack={page === "all"}
        onBack={() => setPage("main")}
      />

      {/* Page body */}
      {page === "main" ? (
        <MainPage
          activeTab={activeTab}
          gstOn={gstOn}
          onViewAll={() => setPage("all")}
        />
      ) : (
        <AllPlansPage
          activeTab={activeTab}
          gstOn={gstOn}
        />
      )}
    </div>
  );
}
