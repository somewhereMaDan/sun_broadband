import { useState, useEffect, useCallback } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────

// Point this at your backend. If you're on Vite, you can swap this for
// `import.meta.env.VITE_API_URL || "http://localhost:4000"` and set
// VITE_API_URL in a .env file for production builds.
// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = import.meta.env.VITE_API_URL

const TABS = ["Monthly", "Quarterly", "Half-Yearly", "Yearly"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyGst(value, gstOn) {
  return Math.round(value * (gstOn ? 1.18 : 1));
}

function fmtINR(value) {
  return "₹" + value.toLocaleString("en-IN");
}

// Reshapes one row from GET /api/plans into what the UI below expects:
// { id, tier, name, meta, featured, ottCount, ottApps, subPlans: [
//     { label, hasOtt, speeds: [ { speed, Monthly: {total,eff}, Quarterly: {...}, ... } ] }
// ] }
function transformPlan(plan) {
  return {
    id: plan.id,
    tier: plan.tier,
    name: plan.name,
    meta: plan.meta,
    featured: plan.featured,
    ottCount: plan.ott_count,
    ottApps: plan.ott_apps || [],
    subPlans: (plan.sub_plans || []).map((sp) => ({
      label: sp.label,
      hasOtt: sp.has_ott,
      speeds: (sp.speed_tiers || []).map((tier) => {
        const row = { speed: tier.speed_label };
        (tier.pricing || []).forEach((p) => {
          // NUMERIC columns come back as strings over JSON - convert once, here.
          row[p.billing_cycle] = {
            total: Number(p.total_amount),
            eff: Number(p.effective_monthly),
          };
        });
        return row;
      }),
    })),
  };
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

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <>
      <style>{`@keyframes sf-spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: 32, height: 32,
        border: "3px solid #fed7aa",
        borderTopColor: "#f97316",
        borderRadius: "50%",
        animation: "sf-spin 0.8s linear infinite",
      }} />
    </>
  );
}

// ─── OTT Modal ────────────────────────────────────────────────────────────────

function OttModal({ apps, onClose }) {
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

function PlanHeader({ activeTab, setActiveTab, gstOn, setGstOn }) {
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

function SubPlanCard({ subPlan, apps, activeTab, gstOn }) {
  const [showOtt, setShowOtt] = useState(false);

  return (
    <>
      {showOtt && <OttModal apps={apps} onClose={() => setShowOtt(false)} />}
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
            if (!cycleData) return null;
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

function AllPlansPage({ plans, activeTab, gstOn }) {
  return (
    <div>
      <p style={{ textAlign: "center", fontSize: 13, color: "#888", marginBottom: "2rem" }}>
        All prices {gstOn ? "include" : "exclude"} 18% GST · Billed {activeTab.toLowerCase()}
        {activeTab === "Yearly" && <strong> · Includes 2 months free</strong>}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {plans.map((plan) => (
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
                    apps={plan.ottApps}
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
  const [activeTab, setActiveTab] = useState("Yearly");
  const [gstOn, setGstOn] = useState(false);

  const [plans, setPlans] = useState(null); // null = still loading
  const [error, setError] = useState(null);

  const loadPlans = useCallback((signal) => {
    setError(null);
    fetch(`${API_BASE_URL}/api/plans`, { signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then((data) => setPlans(data.map(transformPlan)))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Could not load plans");
        }
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadPlans(controller.signal);
    return () => controller.abort();
  }, [loadPlans]);

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

      {error ? (
        <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <p style={{ fontSize: 14, color: "#c2440a", fontWeight: 600, marginBottom: 8 }}>
            Couldn&apos;t load plans
          </p>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>{error}</p>
          <button
            onClick={() => loadPlans()}
            style={{
              background: "#f97316", color: "#fff",
              border: "none", borderRadius: 8,
              padding: "8px 20px", fontSize: 13,
              fontWeight: 600, cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      ) : plans === null ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "4rem 0" }}>
          <Spinner />
          <p style={{ fontSize: 13, color: "#888" }}>Loading current plans…</p>
        </div>
      ) : plans.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: 13, color: "#888", padding: "4rem 0" }}>
          No plans are available right now. Check back soon.
        </p>
      ) : (
        <AllPlansPage
          plans={plans}
          activeTab={activeTab}
          gstOn={gstOn}
        />
      )}
    </section>
  );
}
