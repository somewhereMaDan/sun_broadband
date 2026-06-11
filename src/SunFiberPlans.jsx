import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TABS = ["Monthly", "Quarterly", "Half-Yearly", "Yearly"];

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

// Each speed row: { speed, Monthly, Quarterly, "Half-Yearly", Yearly }
// Each cycle value: { total (billed that cycle), eff (effective per month) }

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
        hasOtt: false,
        speeds: [
          { speed: "50 Mbps", Monthly: { total: 499, eff: 499 }, Quarterly: { total: 1497, eff: 499 }, "Half-Yearly": { total: 2749, eff: 458 }, Yearly: { total: 4999, eff: 417 } },
          { speed: "100 Mbps", Monthly: { total: 599, eff: 599 }, Quarterly: { total: 1797, eff: 599 }, "Half-Yearly": { total: 3299, eff: 550 }, Yearly: { total: 5999, eff: 500 } },
          { speed: "200 Mbps", Monthly: { total: 899, eff: 899 }, Quarterly: { total: 2697, eff: 899 }, "Half-Yearly": { total: 4999, eff: 833 }, Yearly: { total: 8999, eff: 750 } },
        ],
      },
      {
        label: "Internet + OTT 20 Apps",
        hasOtt: true,
        speeds: [
          { speed: "100 Mbps", Monthly: { total: 800, eff: 800 }, Quarterly: { total: 2250, eff: 750 }, "Half-Yearly": { total: 4200, eff: 700 }, Yearly: { total: 7800, eff: 650 } },
          { speed: "150 Mbps", Monthly: { total: 900, eff: 900 }, Quarterly: { total: 2550, eff: 850 }, "Half-Yearly": { total: 4800, eff: 800 }, Yearly: { total: 9000, eff: 750 } },
          { speed: "200 Mbps", Monthly: { total: 1000, eff: 1000 }, Quarterly: { total: 2850, eff: 950 }, "Half-Yearly": { total: 5250, eff: 875 }, Yearly: { total: 9600, eff: 800 } },
          { speed: "300 Mbps", Monthly: { total: 1500, eff: 1500 }, Quarterly: { total: 4350, eff: 1450 }, "Half-Yearly": { total: 8100, eff: 1350 }, Yearly: { total: 15000, eff: 1250 } },
        ],
      },
      {
        label: "Internet + IPTV",
        hasOtt: false,
        speeds: [
          { speed: "100 Mbps", Monthly: { total: 1000, eff: 1000 }, Quarterly: { total: 2847, eff: 949 }, "Half-Yearly": { total: 5394, eff: 899 }, Yearly: { total: 10188, eff: 849 } },
          { speed: "200 Mbps", Monthly: { total: 1400, eff: 1400 }, Quarterly: { total: 3597, eff: 1199 }, "Half-Yearly": { total: 6744, eff: 1124 }, Yearly: { total: 12588, eff: 1049 } },
          { speed: "300 Mbps", Monthly: { total: 1800, eff: 1800 }, Quarterly: { total: 4497, eff: 1499 }, "Half-Yearly": { total: 8394, eff: 1399 }, Yearly: { total: 15588, eff: 1299 } },
        ],
      },
      {
        label: "Internet + OTT + IPTV 20 Apps",
        hasOtt: true,
        speeds: [
          { speed: "100 Mbps", Monthly: { total: 1100, eff: 1100 }, Quarterly: { total: 2997, eff: 999 }, "Half-Yearly": { total: 5694, eff: 949 }, Yearly: { total: 10788, eff: 899 } },
          { speed: "200 Mbps", Monthly: { total: 1549, eff: 1549 }, Quarterly: { total: 3747, eff: 1249 }, "Half-Yearly": { total: 7044, eff: 1174 }, Yearly: { total: 13188, eff: 1099 } },
          { speed: "300 Mbps", Monthly: { total: 2099, eff: 2099 }, Quarterly: { total: 4677, eff: 1559 }, "Half-Yearly": { total: 8694, eff: 1449 }, Yearly: { total: 16188, eff: 1349 } },
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
        hasOtt: false,
        speeds: [
          { speed: "50 Mbps", Monthly: { total: 499, eff: 499 }, Quarterly: { total: 1497, eff: 499 }, "Half-Yearly": { total: 2749, eff: 458 }, Yearly: { total: 4999, eff: 417 } },
          { speed: "100 Mbps", Monthly: { total: 599, eff: 599 }, Quarterly: { total: 1797, eff: 599 }, "Half-Yearly": { total: 3299, eff: 550 }, Yearly: { total: 5999, eff: 500 } },
          { speed: "200 Mbps", Monthly: { total: 899, eff: 899 }, Quarterly: { total: 2697, eff: 899 }, "Half-Yearly": { total: 4999, eff: 833 }, Yearly: { total: 8999, eff: 750 } },
        ],
      },
      {
        label: "Internet + OTT 21 Apps",
        hasOtt: true,
        speeds: [
          { speed: "100 Mbps", Monthly: { total: 850, eff: 850 }, Quarterly: { total: 2400, eff: 800 }, "Half-Yearly": { total: 4500, eff: 750 }, Yearly: { total: 8400, eff: 700 } },
          { speed: "150 Mbps", Monthly: { total: 950, eff: 950 }, Quarterly: { total: 2700, eff: 900 }, "Half-Yearly": { total: 5100, eff: 850 }, Yearly: { total: 9600, eff: 800 } },
          { speed: "200 Mbps", Monthly: { total: 1050, eff: 1050 }, Quarterly: { total: 3000, eff: 1000 }, "Half-Yearly": { total: 5550, eff: 925 }, Yearly: { total: 10200, eff: 850 } },
          { speed: "300 Mbps", Monthly: { total: 1600, eff: 1600 }, Quarterly: { total: 4500, eff: 1500 }, "Half-Yearly": { total: 8400, eff: 1400 }, Yearly: { total: 15600, eff: 1300 } },
        ],
      },
      {
        label: "Internet + IPTV",
        hasOtt: false,
        speeds: [
          { speed: "100 Mbps", Monthly: { total: 1149, eff: 1149 }, Quarterly: { total: 3147, eff: 1049 }, "Half-Yearly": { total: 5994, eff: 999 }, Yearly: { total: 11388, eff: 949 } },
          { speed: "200 Mbps", Monthly: { total: 1299, eff: 1299 }, Quarterly: { total: 3672, eff: 1224 }, "Half-Yearly": { total: 7044, eff: 1174 }, Yearly: { total: 13188, eff: 1099 } },
          { speed: "300 Mbps", Monthly: { total: 1599, eff: 1599 }, Quarterly: { total: 4947, eff: 1649 }, "Half-Yearly": { total: 9294, eff: 1549 }, Yearly: { total: 17388, eff: 1449 } },
        ],
      },
      {
        label: "Internet + OTT + IPTV 21 Apps",
        hasOtt: true,
        speeds: [
          { speed: "100 Mbps", Monthly: { total: 1199, eff: 1199 }, Quarterly: { total: 3297, eff: 1099 }, "Half-Yearly": { total: 6294, eff: 1049 }, Yearly: { total: 11988, eff: 999 } },
          { speed: "200 Mbps", Monthly: { total: 1399, eff: 1399 }, Quarterly: { total: 3897, eff: 1299 }, "Half-Yearly": { total: 7344, eff: 1224 }, Yearly: { total: 13788, eff: 1149 } },
          { speed: "300 Mbps", Monthly: { total: 1849, eff: 1849 }, Quarterly: { total: 5397, eff: 1799 }, "Half-Yearly": { total: 10194, eff: 1699 }, Yearly: { total: 19188, eff: 1599 } },
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
        hasOtt: false,
        speeds: [
          { speed: "50 Mbps", Monthly: { total: 499, eff: 499 }, Quarterly: { total: 1497, eff: 499 }, "Half-Yearly": { total: 2749, eff: 458 }, Yearly: { total: 4999, eff: 417 } },
          { speed: "100 Mbps", Monthly: { total: 599, eff: 599 }, Quarterly: { total: 1797, eff: 599 }, "Half-Yearly": { total: 3299, eff: 550 }, Yearly: { total: 5999, eff: 500 } },
          { speed: "200 Mbps", Monthly: { total: 899, eff: 899 }, Quarterly: { total: 2697, eff: 899 }, "Half-Yearly": { total: 4999, eff: 833 }, Yearly: { total: 8999, eff: 750 } },
        ],
      },
      {
        label: "Internet + OTT 24 Apps",
        hasOtt: true,
        speeds: [
          { speed: "100 Mbps", Monthly: { total: 1100, eff: 1100 }, Quarterly: { total: 3000, eff: 1000 }, "Half-Yearly": { total: 5700, eff: 950 }, Yearly: { total: 10800, eff: 900 } },
          { speed: "150 Mbps", Monthly: { total: 1200, eff: 1200 }, Quarterly: { total: 3300, eff: 1100 }, "Half-Yearly": { total: 6300, eff: 1050 }, Yearly: { total: 12000, eff: 1000 } },
          { speed: "200 Mbps", Monthly: { total: 1300, eff: 1300 }, Quarterly: { total: 3600, eff: 1200 }, "Half-Yearly": { total: 6750, eff: 1125 }, Yearly: { total: 12600, eff: 1050 } },
          { speed: "300 Mbps", Monthly: { total: 1800, eff: 1800 }, Quarterly: { total: 5100, eff: 1700 }, "Half-Yearly": { total: 9600, eff: 1600 }, Yearly: { total: 18000, eff: 1500 } },
          { speed: "500 Mbps", Monthly: { total: 2800, eff: 2800 }, Quarterly: { total: 7950, eff: 2650 }, "Half-Yearly": { total: 15000, eff: 2500 }, Yearly: { total: 28800, eff: 2400 } },
          { speed: "1000 Mbps", Monthly: { total: 4300, eff: 4300 }, Quarterly: { total: 12450, eff: 4150 }, "Half-Yearly": { total: 23100, eff: 3850 }, Yearly: { total: 42600, eff: 3550 } },
        ],
      },
      {
        label: "Internet + IPTV",
        hasOtt: false,
        speeds: [
          { speed: "100 Mbps", Monthly: { total: 1399, eff: 1399 }, Quarterly: { total: 3747, eff: 1249 }, "Half-Yearly": { total: 7194, eff: 1199 }, Yearly: { total: 13788, eff: 1149 } },
          { speed: "200 Mbps", Monthly: { total: 1899, eff: 1899 }, Quarterly: { total: 4497, eff: 1499 }, "Half-Yearly": { total: 8544, eff: 1424 }, Yearly: { total: 15888, eff: 1324 } },
          { speed: "300 Mbps", Monthly: { total: 1999, eff: 1999 }, Quarterly: { total: 5697, eff: 1899 }, "Half-Yearly": { total: 10794, eff: 1799 }, Yearly: { total: 20388, eff: 1699 } },
        ],
      },
      {
        label: "Internet + OTT + IPTV 24 Apps",
        hasOtt: true,
        speeds: [
          { speed: "100 Mbps", Monthly: { total: 1449, eff: 1449 }, Quarterly: { total: 4047, eff: 1349 }, "Half-Yearly": { total: 7794, eff: 1299 }, Yearly: { total: 14988, eff: 1249 } },
          { speed: "200 Mbps", Monthly: { total: 1999, eff: 1999 }, Quarterly: { total: 4647, eff: 1549 }, "Half-Yearly": { total: 8844, eff: 1474 }, Yearly: { total: 16788, eff: 1399 } },
          { speed: "300 Mbps", Monthly: { total: 2199, eff: 2199 }, Quarterly: { total: 5997, eff: 1999 }, "Half-Yearly": { total: 11394, eff: 1899 }, Yearly: { total: 21588, eff: 1799 } },
        ],
      },
    ],
  },
];

// Hero card "starts from" prices — Internet+OTT 100 Mbps effective/month per cycle
const HERO_PRICES = {
  Monthly: { lite: 800, prime: 850, max: 1100 },
  Quarterly: { lite: 750, prime: 800, max: 1000 },
  "Half-Yearly": { lite: 700, prime: 750, max: 950 },
  Yearly: { lite: 650, prime: 700, max: 900 },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyGst(value, gstOn) {
  return Math.round(value * (gstOn ? 1.18 : 1));
}

function fmtINR(value) {
  return "₹" + value.toLocaleString("en-IN");
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

// ─── Shared Header ────────────────────────────────────────────────────────────

function PlanHeader({ activeTab, setActiveTab, gstOn, setGstOn, showBack }) {
  return (
    <div>

      <h1 style={{
        textAlign: "center", fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 800,
        background: "linear-gradient(135deg,#f97316,#fb923c)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text", marginBottom: "1rem",
      }}>
        Sun Fiber Plans
      </h1>

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

        <div style={{ flex: 1 }}>
          {subPlan.speeds.map((row, i) => {
            const cycleData = row[activeTab];
            const totalDisplay = fmtINR(applyGst(cycleData.total, gstOn));
            const effDisplay = fmtINR(applyGst(cycleData.eff, gstOn));
            return (
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
                    {totalDisplay}
                  </div>
                  <div style={{ fontSize: 10, color: "#bbb" }}>
                    {effDisplay}/month effective
                  </div>
                </div>
              </div>
            );
          })}
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
                <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                style={{
                  background: "#f97316", color: "#fff",
                  border: "none", borderRadius: 8,
                  padding: "5px 16px", fontSize: 12,
                  fontWeight: 600, cursor: "pointer",
                }}>
                  Get Connected
                </button>
              </div>
            </div>

            <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}>
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
  // const [page, setPage] = useState("main");
  const [activeTab, setActiveTab] = useState("Yearly");
  const [gstOn, setGstOn] = useState(false);

  return (
    <section style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#1a1a1a",
      maxWidth: 1100,
      margin: "0 auto",
      padding: "2rem 1rem",
    }} id="plans">
      <PlanHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        gstOn={gstOn}
        setGstOn={setGstOn}
      />

      <AllPlansPage
        activeTab={activeTab}
        gstOn={gstOn}
      />
    </section>
  );
}
