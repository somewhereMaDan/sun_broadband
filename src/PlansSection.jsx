import { useState } from 'react'
import "./PlansSection.css"

// ── OTT App lists ─────────────────────────────────────────────────────────────
const STARTER_APPS = [
  'Jiohotstar', 'SonyLiv', 'Bhaktflix', 'Chaupal Bhojpuri', 'Discovery+',
  'DistroTV', 'Dollywood Play', 'Fancode', 'Fridaay', 'Gurjari',
  'HubHopper', 'OM TV', 'OTTplay Premium', 'Playflix', 'Runn TV',
  'ShemarooMe', 'ShemarooMe Bhakti', 'ShemarooMe Gujarati', 'Shortfundly', 'VROTT',
]
const STANDARD_APPS = [...STARTER_APPS, 'Zee5']
const ALL_OTT_APPS = [
  'Amazon Prime Video', 'Lionsgate Play', 'Stage', 'Bhaktflix',
  'Chaupal Bhojpuri', 'Discovery+', 'DistroTV', 'Dollywood Play',
  'Fancode', 'Fridaay', 'Gurjari', 'HubHopper', 'Jiohotstar',
  'OM TV', 'OTTplay Premium', 'Playflix', 'Runn TV', 'ShemarooMe',
  'ShemarooMe Bhakti', 'ShemarooMe Gujarati', 'Shortfundly', 'SonyLiv',
  'VROTT', 'Zee5',
]
const ULTRA_APPS = ALL_OTT_APPS

// ── Pricing ───────────────────────────────────────────────────────────────────
// Base = yearly annual total (from live site, Internet+OTT 100Mbps)
// Lite ₹650/mo eff → ₹7800/yr | Prime ₹700/mo → ₹8400/yr | Max ₹900/mo → ₹10800/yr
const BASE_YEARLY = { lite: 7800, prime: 8400, max: 10800 }

// Upward multiplier vs yearly (users pay a premium for shorter commitment)
const BILLING_MULT = { monthly: 1.16, quarterly: 1.08, halfYearly: 1.04, yearly: 1.00 }

// Divisors to get effective monthly from period total
const PERIOD_MONTHS = { monthly: 1, quarterly: 3, halfYearly: 6, yearly: 12 }

function getEffMonthly(planKey, billing, gst) {
  const yearly = BASE_YEARLY[planKey]
  const periodTotal = Math.round(yearly * BILLING_MULT[billing])
  const withGst = gst ? Math.round(periodTotal * 1.18) : periodTotal
  return Math.round(withGst / PERIOD_MONTHS[billing])
}

function fmt(n) { return n.toLocaleString('en-IN') }

const BILLING_TABS = [
  { key: 'monthly',    label: 'Monthly' },
  { key: 'quarterly',  label: 'Quarterly' },
  { key: 'halfYearly', label: 'Half-Yearly' },
  { key: 'yearly',     label: 'Yearly', badge: 'Save 16%' },
]

// ── OttChips (self-contained so no import needed) ─────────────────────────────
function OttChips({ initial, all }) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? all : initial
  const remaining = all.length - initial.length
  return (
    <div className="mini-chips">
      {shown.map(app => <span key={app} className="mc">{app}</span>)}
      {!expanded && remaining > 0 && (
        <button className="mc mc-toggle" onClick={() => setExpanded(true)}>+{remaining} more ↓</button>
      )}
      {expanded && (
        <button className="mc mc-toggle" onClick={() => setExpanded(false)}>Show less ↑</button>
      )}
    </div>
  )
}

// ── Comparison table ──────────────────────────────────────────────────────────
function CompareTable() {
  return (
    <div className="plans-compare-wrap reveal">
      <h3 className="plans-compare-title">What you get with every plan</h3>
      <div className="plans-compare-scroll">
        <table className="plans-compare-table">
          <thead>
            <tr>
              <th>Benefit</th>
              <th>Lite</th>
              <th>Prime</th>
              <th>Max</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Unlimited Data</td><td><span className="cmp-check">✔</span></td><td><span className="cmp-check">✔</span></td><td><span className="cmp-check">✔</span></td></tr>
            <tr><td>Free Router</td><td><span className="cmp-check">✔</span></td><td><span className="cmp-check">✔</span></td><td><span className="cmp-check">✔</span></td></tr>
            <tr><td>OTT Apps</td><td>20</td><td>21 (+Zee5)</td><td>24 (+Amazon, Lionsgate, Stage)</td></tr>
            <tr><td>Live Channels</td><td>483</td><td>491</td><td>506</td></tr>
            <tr><td>Support</td><td>24×7</td><td>Priority</td><td>Priority</td></tr>
          </tbody>
        </table>
      </div>
      <p className="plans-compare-note">All plans billed annually. Taxes extra. Router included; installation per policy.</p>
      <div className="plans-compare-btns">
        <a href="#contact" className="p-btn pri" style={{ display: 'inline-block', padding: '12px 28px' }}>Get Connected</a>
        <a href="#coverage" className="p-btn out" style={{ display: 'inline-block', padding: '12px 28px' }}>Check Coverage</a>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PlansSection() {
  const [billing, setBilling] = useState('yearly')
  const [gst, setGst] = useState(false)

  const litePrice  = getEffMonthly('lite',  billing, gst)
  const primePrice = getEffMonthly('prime', billing, gst)
  const maxPrice   = getEffMonthly('max',   billing, gst)

  const billingLabel = {
    monthly: 'Billed monthly', quarterly: 'Billed quarterly',
    halfYearly: 'Billed every 6 months', yearly: 'Billed annually',
  }[billing]
  const gstLabel = gst ? 'Incl. 18% GST' : '+18% GST'

  return (
    <section className="sec plans-sec" id="plans">
      <div className="sec-inner">

        {/* Header */}
        <div className="reveal sec-center">
          <span className="eyebrow">Plans &amp; Pricing</span>
          <h2 className="sec-h">Sun Fiber Plans</h2>
          <div className="plans-perks-bar">
            <span>📶 Free WiFi Router</span>
            <span>∞ No Data Limit</span>
            <span>🕐 24×7 Support</span>
          </div>
        </div>

        {/* Controls */}
        <div className="reveal plans-controls">
          <div className="plans-tabs">
            {BILLING_TABS.map(tab => (
              <button
                key={tab.key}
                className={`plans-tab${billing === tab.key ? ' active' : ''}`}
                onClick={() => setBilling(tab.key)}
              >
                {tab.label}
                {tab.badge && <span className="plans-tab-badge">{tab.badge}</span>}
              </button>
            ))}
          </div>
          <p className="plans-billing-note">
            All prices <strong>exclude GST (18%)</strong>. Yearly plans include 2 months free!
          </p>
          <div className="plans-gst-row">
            <button
              className={`plans-toggle${gst ? ' on' : ''}`}
              onClick={() => setGst(v => !v)}
              aria-label="Toggle GST"
            >
              <span className="plans-toggle-knob" />
            </button>
            <span className="plans-gst-label">
              Show Prices <span className="plans-gst-accent">Including 18% GST</span>
            </span>
          </div>
        </div>

        {/* Cards — your existing design, dynamic prices only */}
        <div className="plans-row reveal">

          {/* Lite */}
          <div className="plan-card">
            <div className="plan-tier">Lite</div>
            <div className="plan-name">Smartlink Lite</div>
            <div className="plan-speed"><strong>20 OTT Apps</strong> · 483 Live Channels (21 HD)</div>
            <div className="price-row">
              <span className="p-sym">₹</span>
              <span className="p-amt">{fmt(litePrice)}</span>
              <span className="p-per">/mo</span>
            </div>
            <div className="p-gst">{gstLabel} · {billingLabel}</div>
            <div className="p-div"></div>
            <ul className="p-feats">
              <li><span className="ck">✓</span> Unlimited data, no FUP</li>
              <li><span className="ck">✓</span> Free WiFi Router</li>
              <li>
                <span className="ck">✓</span>
                <div>
                  <strong>20 OTT apps</strong> included
                  <OttChips initial={['Jiohotstar', 'SonyLiv']} all={STARTER_APPS} />
                </div>
              </li>
              <li><span className="ck">✓</span> <strong>483 live channels</strong> via IPTV</li>
              <li><span className="ck">✓</span> 24×7 customer support</li>
            </ul>
            <a href="#contact" className="p-btn out">Get Connected</a>
          </div>

          {/* Prime */}
          <div className="plan-card pop">
            <div className="pop-label">Most Popular</div>
            <div className="plan-tier f">Prime</div>
            <div className="plan-name">Smartlink Prime</div>
            <div className="plan-speed"><strong>21 OTT Apps</strong> · 491 Live Channels (59 HD)</div>
            <div className="price-row">
              <span className="p-sym">₹</span>
              <span className="p-amt">{fmt(primePrice)}</span>
              <span className="p-per">/mo</span>
            </div>
            <div className="p-gst">{gstLabel} · {billingLabel}</div>
            <div className="p-div"></div>
            <ul className="p-feats">
              <li><span className="ck">✓</span> Unlimited data, no FUP</li>
              <li><span className="ck">✓</span> Free WiFi Router</li>
              <li>
                <span className="ck">✓</span>
                <div>
                  <strong>21 OTT apps</strong> incl. Zee5
                  <OttChips initial={['Jiohotstar', 'SonyLiv', 'Zee5']} all={STANDARD_APPS} />
                </div>
              </li>
              <li><span className="ck">✓</span> <strong>491 live channels</strong> via IPTV</li>
              <li><span className="ck">✓</span> Priority 24×7 support</li>
              <li><span className="ck">✓</span> Static IP available</li>
            </ul>
            <a href="#contact" className="p-btn pri">Get Connected</a>
          </div>

          {/* Max */}
          <div className="plan-card">
            <div className="plan-tier">Max</div>
            <div className="plan-name">Smartlink Max</div>
            <div className="plan-speed"><strong>24 OTT Apps</strong> · 506 Live Channels (74 HD)</div>
            <div className="price-row">
              <span className="p-sym">₹</span>
              <span className="p-amt">{fmt(maxPrice)}</span>
              <span className="p-per">/mo</span>
            </div>
            <div className="p-gst">{gstLabel} · {billingLabel}</div>
            <div className="p-div"></div>
            <ul className="p-feats">
              <li><span className="ck">✓</span> Unlimited data, no FUP</li>
              <li><span className="ck">✓</span> Free WiFi Router</li>
              <li>
                <span className="ck">✓</span>
                <div>
                  <strong>24 OTT apps</strong> — all platforms
                  <OttChips
                    initial={['Jiohotstar', 'SonyLiv', 'Zee5', 'Prime Video', 'Lionsgate', 'Stage']}
                    all={ULTRA_APPS}
                  />
                </div>
              </li>
              <li><span className="ck">✓</span> <strong>506 live channels</strong> via IPTV</li>
              <li><span className="ck">✓</span> Priority 24×7 support</li>
              <li><span className="ck">✓</span> Static IP + CCTV ready</li>
            </ul>
            <a href="#contact" className="p-btn out">Get Connected</a>
          </div>

        </div>

        <p className="plans-note reveal">
          Prices shown are effective monthly for Internet + OTT bundle at 100 Mbps ·
          More speeds &amp; plan types available —{' '}
          <a href="#contact" style={{ color: 'var(--brand)' }}>contact us for full pricing</a>
        </p>

        {/* Comparison table */}
        <CompareTable />

      </div>
    </section>
  )
}
