import { useState, useEffect, useRef } from "react";

const leaves = [
  { id: 1, left: "8%",  delay: "0s",   dur: "13s", size: 22, rot: 20  },
  { id: 2, left: "20%", delay: "2.5s", dur: "16s", size: 15, rot: -14 },
  { id: 3, left: "36%", delay: "5s",   dur: "11s", size: 26, rot: 42  },
  { id: 4, left: "55%", delay: "1.2s", dur: "14s", size: 18, rot: -28 },
  { id: 5, left: "72%", delay: "4s",   dur: "12s", size: 21, rot: 26  },
  { id: 6, left: "88%", delay: "6.5s", dur: "15s", size: 14, rot: -9  },
];

const stats = [
  { value: "0%",   label: "Capex required",          icon: "💰" },
  { value: "12",   label: "Water body problems solved", icon: "💧" },
  { value: "100%", label: "Plant-based, chemical-free", icon: "🌿" },
];

// Inject scoped CSS once — prefixed with "ns-" to avoid clashing with page styles
const STYLE_ID = "ns-styles-v2";
const CSS = `
@keyframes ns-float {
  0%   { transform:translateY(0) rotate(0deg);   opacity:0;    }
  8%   { opacity:.55; }
  92%  { opacity:.35; }
  100% { transform:translateY(800px) rotate(360deg); opacity:0; }
}
@keyframes ns-sway {
  0%,100%{ margin-left:0; }
  33%    { margin-left:14px; }
  66%    { margin-left:-10px; }
}
@keyframes ns-dot {
  0%,100%{ opacity:1;   transform:scale(1); }
  50%    { opacity:.3;  transform:scale(.6); }
}
@keyframes ns-fadein {
  from { opacity:0; transform:translateY(20px); }
  to   { opacity:1; transform:translateY(0); }
}
.ns-stat:hover {
  background: rgba(74,124,89,.1) !important;
  border-color: rgba(126,200,154,.35) !important;
}
.ns-btn2:hover {
  background: rgba(74,124,89,.12) !important;
  border-color: rgba(126,200,154,.5) !important;
  color: #c8e4d0 !important;
}
`;

function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = CSS;
  document.head.appendChild(s);
}

export default function NewNatureSection() {
  const [hov, setHov] = useState(false);
  // Start visible=true so content is never invisible if IO doesn't fire
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    // If the section is already in the viewport on mount, setVisible immediately
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fadeStyle = (delay = "0s") => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity .85s ease ${delay}, transform .85s ease ${delay}`,
  });

  return (
    <>
      <section
        ref={ref}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(158deg,#091c0d 0%,#0e2c14 42%,#183a1d 72%,#0b2410 100%)",
          fontFamily: "'Georgia','Times New Roman',serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "96px 24px 88px",
          boxSizing: "border-box",
        }}
      >
        {/* Noise texture */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
          backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)' opacity='.04'/%3E%3C/svg%3E")`,
          opacity:.45,
        }}/>

        {/* Glow orbs */}
        <div style={{ position:"absolute",top:"-8%",left:"-4%",width:480,height:480,borderRadius:"50%",pointerEvents:"none",zIndex:0,background:"radial-gradient(circle,rgba(74,124,89,.18) 0%,transparent 68%)" }}/>
        <div style={{ position:"absolute",bottom:"-10%",right:"-4%",width:560,height:560,borderRadius:"50%",pointerEvents:"none",zIndex:0,background:"radial-gradient(circle,rgba(46,100,60,.14) 0%,transparent 68%)" }}/>

        {/* Grid */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
          backgroundImage:"linear-gradient(rgba(74,124,89,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,124,89,.04) 1px,transparent 1px)",
          backgroundSize:"58px 58px",
        }}/>

        {/* Floating leaves */}
        <div style={{ position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0 }}>
          {leaves.map(l => (
            <div key={l.id} style={{
              position:"absolute", top:"-48px", left:l.left,
              animation:`ns-float ${l.dur} ${l.delay} infinite linear, ns-sway ${l.dur} ${l.delay} infinite ease-in-out`,
            }}>
              <svg width={l.size} height={l.size} viewBox="0 0 24 24" style={{ display:"block", transform:`rotate(${l.rot}deg)`, opacity:.5 }}>
                <path d="M12 2C6.48 2 2 6.48 2 12c0 2.4.87 4.59 2.3 6.3C6.15 9.85 12 8 12 8s-1.85 5.85-10.3 7.7C3.41 17.13 7.6 18 10 18c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="#4a7c59"/>
              </svg>
            </div>
          ))}
        </div>

        {/* ── Content ── */}
        <div style={{ position:"relative",zIndex:2,maxWidth:880,width:"100%",textAlign:"center" }}>

          {/* Eyebrow pill */}
          <div style={{ display:"flex",justifyContent:"center", ...fadeStyle("0s") }}>
            <div style={{
              display:"inline-flex",alignItems:"center",gap:9,
              background:"rgba(74,124,89,.13)",border:"1px solid rgba(74,124,89,.28)",
              borderRadius:100,padding:"6px 18px",marginBottom:30,
            }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:"#7ec89a",animation:"ns-dot 2.2s infinite" }}/>
              <span style={{ fontSize:11,letterSpacing:".18em",textTransform:"uppercase",color:"#7ec89a",fontFamily:"'Courier New',monospace" }}>
                Made in Bharat · Indigenous Water Technology
              </span>
            </div>
          </div>

          {/* Heading */}
          <h2 style={{
            fontSize:"clamp(38px,6.5vw,78px)",fontWeight:400,
            color:"#e6f0e2",lineHeight:1.07,letterSpacing:"-.025em",
            margin:"0 0 10px",fontFamily:"Georgia,serif",
            ...fadeStyle(".12s"),
          }}>
            Healing{" "}
            <em style={{ color:"#7ec89a",fontStyle:"italic" }}>water</em><br/>
            to restore all life.
          </h2>

          {/* Ornament divider */}
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:14,margin:"24px auto 20px",...fadeStyle(".25s") }}>
            <div style={{ width:72,height:1,background:"linear-gradient(90deg,transparent,rgba(126,200,154,.38))" }}/>
            <span style={{ fontSize:17 }}>🌿</span>
            <div style={{ width:72,height:1,background:"linear-gradient(90deg,rgba(126,200,154,.38),transparent)" }}/>
          </div>

          {/* Body copy */}
          <p style={{
            fontSize:"clamp(14px,1.8vw,17px)",color:"rgba(196,218,202,.65)",
            lineHeight:1.78,maxWidth:560,margin:"0 auto 44px",fontFamily:"Georgia,serif",
            ...fadeStyle(".38s"),
          }}>
            Carbon World Economics revives inland water bodies in-situ — no
            excavation, no synthetic chemicals, no disruption to daily life.
            Our 100 % plant-based technology restores the invisible vertical
            water cycle beneath every river, pond and drain, healing soil,
            air and food chains as one interconnected system.
          </p>

          {/* Stat cards */}
          <div style={{
            display:"flex",justifyContent:"center",gap:18,flexWrap:"wrap",
            marginBottom:48,...fadeStyle(".5s"),
          }}>
            {stats.map((s,i) => (
              <div key={i} className="ns-stat" style={{
                background:"rgba(255,255,255,.03)",border:"1px solid rgba(74,124,89,.18)",
                borderRadius:16,padding:"18px 26px",minWidth:140,
                transition:"background .25s,border-color .25s",
              }}>
                <div style={{ fontSize:20,marginBottom:5 }}>{s.icon}</div>
                <div style={{ fontSize:26,fontWeight:400,color:"#aee8c4",fontFamily:"Georgia,serif",letterSpacing:"-.01em" }}>{s.value}</div>
                <div style={{ fontSize:10.5,color:"rgba(175,206,185,.48)",letterSpacing:".08em",textTransform:"uppercase",fontFamily:"'Courier New',monospace",marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",...fadeStyle(".62s") }}>
            {/* <button
              style={{
                display:"inline-flex",alignItems:"center",gap:9,
                background: hov ? "#559f6e" : "#4a7c59",
                color:"#e4f3e9",border:"none",borderRadius:100,
                padding:"15px 34px",fontSize:14,fontFamily:"'Courier New',monospace",
                letterSpacing:".06em",cursor:"pointer",
                transition:"background .22s,transform .2s,box-shadow .22s",
                transform: hov ? "translateY(-2px) scale(1.025)" : "scale(1)",
                boxShadow: hov
                  ? "0 10px 32px rgba(74,124,89,.44),0 0 0 1px rgba(126,200,154,.28)"
                  : "0 4px 18px rgba(74,124,89,.28)",
              }}
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
              onClick={() => window.open("https://carbonworldeconomics.org","_blank")}
            >
              Explore Our Initiative
              <span style={{ display:"inline-block",transition:"transform .2s",transform:hov?"translateX(4px)":"translateX(0)" }}>→</span>
            </button> */}

            <button
              className="ns-btn2"
              style={{
                display:"inline-flex",alignItems:"center",gap:8,
                background:"transparent",color:"rgba(196,218,202,.75)",
                border:"1px solid rgba(74,124,89,.32)",borderRadius:100,
                padding:"15px 30px",fontSize:14,fontFamily:"'Courier New',monospace",
                letterSpacing:".04em",cursor:"pointer",transition:"all .22s",
              }}
              onClick={() => window.open("https://carbonworldeconomics.org","_blank")}
            >
              🌱 Explore Our Initiative
            </button>
          </div>
        </div>

        {/* Footer tagline — padding-top keeps it in flow */}
        <p style={{
          position:"relative",zIndex:2,
          marginTop:52,marginBottom:0,
          fontSize:10,color:"rgba(126,200,154,.22)",
          letterSpacing:".2em",textTransform:"uppercase",
          fontFamily:"'Courier New',monospace",
        }}>
          © Carbon World Economics · A Carbon Neutral World
        </p>
      </section>
    </>
  );
}
