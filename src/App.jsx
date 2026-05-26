import { useState, useEffect } from 'react'
import './App.css'
import NatureSection from './NatureSection'

const ALL_OTT_APPS = [
  'Amazon Prime Video', 'Lionsgate Play', 'Stage', 'Bhaktflix',
  'Chaupal Bhojpuri', 'Discovery+', 'DistroTV', 'Dollywood Play',
  'Fancode', 'Fridaay', 'Gurjari', 'HubHopper', 'Jiohotstar',
  'OM TV', 'OTTplay Premium', 'Playflix', 'Runn TV', 'ShemarooMe',
  'ShemarooMe Bhakti', 'ShemarooMe Gujarati', 'Shortfundly', 'SonyLiv',
  'VROTT', 'Zee5',
]

const STARTER_APPS = [
  'Jiohotstar', 'SonyLiv', 'Bhaktflix', 'Chaupal Bhojpuri', 'Discovery+',
  'DistroTV', 'Dollywood Play', 'Fancode', 'Fridaay', 'Gurjari',
  'HubHopper', 'OM TV', 'OTTplay Premium', 'Playflix', 'Runn TV',
  'ShemarooMe', 'ShemarooMe Bhakti', 'ShemarooMe Gujarati', 'Shortfundly', 'VROTT',
]

const STANDARD_APPS = [...STARTER_APPS, 'Zee5']
const ULTRA_APPS = ALL_OTT_APPS

const TICKER_ITEMS = [
  'Unlimited Data', 'Free WiFi Router', '24×7 Local Support', '99.9% Uptime',
  'No Hidden Charges', 'Same Day Installation', '24+ OTT Apps Included',
  '500+ Live Channels', 'Fiber-Optic Network', 'Free Router Included',
  'Unlimited Data', 'Free WiFi Router', '24×7 Local Support', '99.9% Uptime',
  'No Hidden Charges', 'Same Day Installation', '24+ OTT Apps Included',
  '500+ Live Channels', 'Fiber-Optic Network',
]

function OttChips({ initial, all }) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? all : initial
  const remaining = all.length - initial.length

  return (
    <div className="mini-chips">
      {shown.map(app => (
        <span key={app} className="mc">{app}</span>
      ))}
      {!expanded && remaining > 0 && (
        <button className="mc mc-toggle" onClick={() => setExpanded(true)}>
          +{remaining} more ↓
        </button>
      )}
      {expanded && (
        <button className="mc mc-toggle" onClick={() => setExpanded(false)}>
          Show less ↑
        </button>
      )}
    </div>
  )
}

function MoreAppsCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="ott-c more-apps-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="more-apps-number">+18</div>
      <div className="more-apps-label">more apps</div>
      {hovered && (
        <div className="ott-hover-tooltip">
          <div className="tooltip-title">All Included Apps</div>
          <div className="tooltip-grid">
            {ALL_OTT_APPS.map(app => (
              <span key={app} className="tooltip-app">{app}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* NAV */}
      <nav className={`nav${navScrolled ? ' scrolled' : ''}`}>
        <a href="#" className="logo" onClick={closeMenu}>
          <div className="logo-icon">☀</div>
          <span className="logo-text">Sun<span>Broadband</span></span>
        </a>
        <ul className="nav-links">
          <li><a href="#plans">Plans</a></li>
          <li><a href="#ott">OTT Apps</a></li>
          <li><a href="#coverage">Coverage</a></li>
          <li><a href="#contact">Support</a></li>
        </ul>
        <div className="nav-right">
          <a href="tel:+911234567890" className="nav-call">📞 Call Us</a>
          <a href="https://userlogin.sunbroadband.in/login" target='_blank' className="btn-nav">Login</a>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <nav className="mobile-nav-links">
              <a href="#plans" onClick={closeMenu}>Plans</a>
              <a href="#ott" onClick={closeMenu}>OTT Apps</a>
              <a href="#coverage" onClick={closeMenu}>Coverage</a>
              <a href="#contact" onClick={closeMenu}>Support</a>
            </nav>
            <div className="mobile-nav-bottom">
              <a href="tel:+911234567890" className="mobile-call" onClick={closeMenu}>📞 Call Us</a>
              <a href="https://userlogin.sunbroadband.in/login" target='_blank' className="btn-nav" onClick={closeMenu}>Login</a>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="hero">
        <div className="hero-body">
          <div className="hero-eyebrow">
            <span className="live-dot"></span>Now Live across Raipur, Chhattisgarh
          </div>
          <h1>Your favorite <em>OTT apps</em>,<br />at blazing fiber speed.</h1>
          <p className="hero-sub">
            Sun Broadband bundles 24+ streaming platforms with ultra-fast fiber internet.
            One connection. Zero compromise.
          </p>
          <div className="hero-btns">
            <a href="#plans" className="btn-hp">View All Plans →</a>
            <a href="#ott" className="btn-hg">Explore OTT Bundle</a>
          </div>

          <div className="ott-showcase">
            <div className="ott-label-row">
              <div className="line"></div>
              <span>Included with every plan</span>
              <div className="line"></div>
            </div>
            <div className="ott-pills">
              <div className="ott-pill">
                <div className="pill-icon" style={{ background: 'rgba(0,100,200,0.15)' }}>🎬</div>
                <div>
                  <div className="pill-name">Disney+ Hotstar</div>
                  <div className="pill-sub">Sports · Movies · Series</div>
                </div>
              </div>
              <div className="ott-pill">
                <div className="pill-icon" style={{ background: 'rgba(0,100,220,0.15)' }}>🎭</div>
                <div>
                  <div className="pill-name">SonyLIV</div>
                  <div className="pill-sub">Drama · Originals · Sports</div>
                </div>
              </div>
              <div className="ott-pill">
                <div className="pill-icon" style={{ background: 'rgba(17,153,187,0.15)' }}>📺</div>
                <div>
                  <div className="pill-name">Zee5</div>
                  <div className="pill-sub">Bollywood · Regional</div>
                </div>
              </div>
              <div className="ott-pill">
                <div className="pill-icon" style={{ background: 'rgba(0,160,100,0.15)' }}>🛒</div>
                <div>
                  <div className="pill-name">Prime Video</div>
                  <div className="pill-sub">Originals · Blockbusters</div>
                </div>
                <span className="pill-tag">Max</span>
              </div>
              <div className="ott-pill">
                <div className="pill-icon" style={{ background: 'rgba(200,30,40,0.15)' }}>🦁</div>
                <div>
                  <div className="pill-name">Lionsgate Play</div>
                  <div className="pill-sub">Hollywood · International</div>
                </div>
                <span className="pill-tag">Max</span>
              </div>
              <div className="ott-more-pill">+18 more apps</div>
            </div>
          </div>
        </div>

        <div className="stat-bar">
          <div className="stat-item">
            <div className="stat-num">1<sub>Gbps</sub></div>
            <div className="stat-label">Maximum Speed</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">24<sub>+</sub></div>
            <div className="stat-label">OTT Platforms</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">500<sub>+</sub></div>
            <div className="stat-label">Live Channels</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">99.9<sub>%</sub></div>
            <div className="stat-label">Uptime SLA</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">24<sub>/7</sub></div>
            <div className="stat-label">Local Support</div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="tick-item">{item}</span>
          ))}
        </div>
      </div>

      {/* WHY */}
      <section className="sec" id="features">
        <div className="sec-inner">
          <div className="reveal">
            <span className="eyebrow">Why Sun Broadband</span>
            <h2 className="sec-h">Raipur's most complete<br />fiber experience.</h2>
          </div>
          <div className="why-grid reveal">
            <div className="why-cell">
              <div className="why-ic">⚡</div>
              <div className="why-title">Fiber-Optic Speed</div>
              <p className="why-desc">Up to 1 Gbps pure fiber — stream 4K, video call, and game simultaneously without any slowdown.</p>
            </div>
            <div className="why-cell">
              <div className="why-ic">🎬</div>
              <div className="why-title">24+ OTT Apps Bundled</div>
              <p className="why-desc">Hotstar, SonyLIV, Zee5, Prime, Lionsgate and more — already in your plan. One bill replaces many subscriptions.</p>
            </div>
            <div className="why-cell">
              <div className="why-ic">📡</div>
              <div className="why-title">500+ Live Channels</div>
              <p className="why-desc">HD and 4K IPTV with news, sports, entertainment, and regional channels across all genres.</p>
            </div>
            <div className="why-cell">
              <div className="why-ic">🛡️</div>
              <div className="why-title">99.9% Uptime SLA</div>
              <p className="why-desc">Enterprise-grade redundant fiber infrastructure. Stable connection even during peak hours.</p>
            </div>
            <div className="why-cell">
              <div className="why-ic">🧑‍💻</div>
              <div className="why-title">24×7 Raipur Support</div>
              <p className="why-desc">Real engineers in Raipur — not bots. Instant callbacks and rapid on-site response guaranteed.</p>
            </div>
            <div className="why-cell">
              <div className="why-ic">💰</div>
              <div className="why-title">Zero Hidden Charges</div>
              <p className="why-desc">Free router. No surprise fees. Transparent billing from day one — what you see is what you pay.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="sec plans-sec" id="plans">
        <div className="sec-inner">
          <div className="reveal sec-center">
            <span className="eyebrow">Plans &amp; Pricing</span>
            <h2 className="sec-h">Simple, honest pricing.</h2>
            <p className="sec-p" style={{ margin: '0 auto 40px' }}>
              All plans include unlimited data, free router, and OTT bundles — no contracts, no surprises.
            </p>
          </div>
          <div className="plans-row reveal">
            {/* Starter */}
            <div className="plan-card">
              <div className="plan-tier">Lite</div>
              <div className="plan-name">Starter</div>
              <div className="plan-speed">Up to <strong>40 Mbps</strong> fiber speed</div>
              <div className="price-row">
                <span className="p-sym">₹</span>
                <span className="p-amt">399</span>
                <span className="p-per">/mo</span>
              </div>
              <div className="p-gst">+18% GST · Billed annually</div>
              <div className="p-div"></div>
              <ul className="p-feats">
                <li><span className="ck">✓</span> Unlimited data, no FUP</li>
                <li><span className="ck">✓</span> Free WiFi Router</li>
                <li>
                  <span className="ck">✓</span>
                  <div>
                    <strong>20 OTT apps</strong> included
                    <OttChips
                      initial={['Jiohotstar', 'SonyLiv']}
                      all={STARTER_APPS}
                    />
                  </div>
                </li>
                <li><span className="ck">✓</span> <strong>483 live channels</strong> via IPTV</li>
                <li><span className="ck">✓</span> 24×7 customer support</li>
              </ul>
              <a href="#contact" className="p-btn out">Get Started</a>
            </div>

            {/* Standard */}
            <div className="plan-card pop">
              <div className="pop-label">Most Popular</div>
              <div className="plan-tier f">Prime</div>
              <div className="plan-name">Standard</div>
              <div className="plan-speed">Up to <strong>100 Mbps</strong> fiber speed</div>
              <div className="price-row">
                <span className="p-sym">₹</span>
                <span className="p-amt">599</span>
                <span className="p-per">/mo</span>
              </div>
              <div className="p-gst">+18% GST · Billed annually</div>
              <div className="p-div"></div>
              <ul className="p-feats">
                <li><span className="ck">✓</span> Unlimited data, no FUP</li>
                <li><span className="ck">✓</span> Free WiFi Router</li>
                <li>
                  <span className="ck">✓</span>
                  <div>
                    <strong>21 OTT apps</strong> incl. Zee5
                    <OttChips
                      initial={['Jiohotstar', 'SonyLiv', 'Zee5']}
                      all={STANDARD_APPS}
                    />
                  </div>
                </li>
                <li><span className="ck">✓</span> <strong>491 live channels</strong> via IPTV</li>
                <li><span className="ck">✓</span> Priority 24×7 support</li>
                <li><span className="ck">✓</span> Static IP available</li>
              </ul>
              <a href="#contact" className="p-btn pri">Get Started</a>
            </div>

            {/* Ultra */}
            <div className="plan-card">
              <div className="plan-tier">Max</div>
              <div className="plan-name">Ultra</div>
              <div className="plan-speed">Up to <strong>300 Mbps</strong> fiber speed</div>
              <div className="price-row">
                <span className="p-sym">₹</span>
                <span className="p-amt">999</span>
                <span className="p-per">/mo</span>
              </div>
              <div className="p-gst">+18% GST · Billed annually</div>
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
              <a href="#contact" className="p-btn out">Get Started</a>
            </div>
          </div>
          <p className="plans-note reveal">
            All plans include free installation · Prices are indicative — contact for exact quote · GST extra
          </p>
        </div>
      </section>

      {/* OTT DETAIL */}
      <section className="sec ott-dark" id="ott">
        <div className="ott-wrap">
          <div className="ott-left reveal">
            <span className="eyebrow">Entertainment Bundle</span>
            <h2 className="sec-h">Every streaming app.<br />One subscription.</h2>
            <p className="sec-p">
              We've bundled India's top OTT platforms with your fiber plan so you never pay
              separate subscription fees again.
            </p>
            <div className="ott-counts">
              <div><div className="oc-num">24+</div><div className="oc-label">OTT platforms</div></div>
              <div><div className="oc-num">500+</div><div className="oc-label">Live channels</div></div>
              <div><div className="oc-num">4K</div><div className="oc-label">Quality</div></div>
            </div>
            <div className="ott-list">
              <div className="ott-row">
                <div className="ott-row-left">
                  <div className="ott-sm-icon">🎬</div>
                  <div><div className="ott-row-name">Disney+ Hotstar</div><div className="ott-row-type">Live sports, movies, originals</div></div>
                </div>
                <span className="ott-chip">All Plans</span>
              </div>
              <div className="ott-row">
                <div className="ott-row-left">
                  <div className="ott-sm-icon">🎭</div>
                  <div><div className="ott-row-name">SonyLIV</div><div className="ott-row-type">Drama, sports, originals</div></div>
                </div>
                <span className="ott-chip">All Plans</span>
              </div>
              <div className="ott-row">
                <div className="ott-row-left">
                  <div className="ott-sm-icon">📺</div>
                  <div><div className="ott-row-name">Zee5</div><div className="ott-row-type">Bollywood, regional, exclusives</div></div>
                </div>
                <span className="ott-chip">Prime + Max</span>
              </div>
              <div className="ott-row">
                <div className="ott-row-left">
                  <div className="ott-sm-icon">🛒</div>
                  <div><div className="ott-row-name">Amazon Prime Video</div><div className="ott-row-type">Blockbusters, originals</div></div>
                </div>
                <span className="ott-chip">Max Only</span>
              </div>
              <div className="ott-row">
                <div className="ott-row-left">
                  <div className="ott-sm-icon">🦁</div>
                  <div><div className="ott-row-name">Lionsgate Play</div><div className="ott-row-type">Hollywood, international</div></div>
                </div>
                <span className="ott-chip">Max Only</span>
              </div>
              <div className="ott-row">
                <div className="ott-row-left">
                  <div className="ott-sm-icon">🌾</div>
                  <div><div className="ott-row-name">Stage</div><div className="ott-row-type">Rajasthani &amp; regional</div></div>
                </div>
                <span className="ott-chip">Max Only</span>
              </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <a href="#plans" className="ott-cta-btn">Pick Your Plan →</a>
            </div>
          </div>

          <div className="ott-cards reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="ott-c wide">
              <div className="ott-c-icon">🎬</div>
              <div className="ott-c-name">Disney+ Hotstar</div>
              <div className="ott-c-type">IPL · Live Cricket · Web Series · Movies</div>
              <div className="ott-c-plan">Included in all plans</div>
            </div>
            <div className="ott-c">
              <div className="ott-c-icon">🎭</div>
              <div className="ott-c-name">SonyLIV</div>
              <div className="ott-c-type">Sports · Drama · Originals</div>
              <div className="ott-c-plan">All plans</div>
            </div>
            <div className="ott-c">
              <div className="ott-c-icon">📺</div>
              <div className="ott-c-name">Zee5</div>
              <div className="ott-c-type">Bollywood · Regional</div>
              <div className="ott-c-plan">Prime &amp; Max</div>
            </div>
            <div className="ott-c">
              <div className="ott-c-icon">🛒</div>
              <div className="ott-c-name">Prime Video</div>
              <div className="ott-c-type">Hollywood · Originals</div>
              <div className="ott-c-plan">Max only</div>
            </div>
            <div className="ott-c">
              <div className="ott-c-icon">🦁</div>
              <div className="ott-c-name">Lionsgate</div>
              <div className="ott-c-type">International · Films</div>
              <div className="ott-c-plan">Max only</div>
            </div>
            <MoreAppsCard />
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="sec" id="coverage">
        <div className="cov-wrap">
          <div className="reveal">
            <span className="eyebrow">Service Areas</span>
            <h2 className="sec-h">Are we in<br />your area?</h2>
            <p className="sec-p">Expanding rapidly across Raipur. New residential and commercial zones added every month.</p>
            <div style={{ marginTop: '1.5rem' }}>
              <a href="#contact" className="cov-link">Request your area →</a>
            </div>
          </div>
          <div className="area-list reveal" style={{ transitionDelay: '0.1s' }}>
            {[
              { icon: '📍', name: 'Powai', type: 'Residential', status: 'live' },
              { icon: '🏙️', name: 'Hiranandani Gardens', type: 'Residential', status: 'live' },
              { icon: '📍', name: 'Chandivali', type: 'Residential', status: 'live' },
              { icon: '🏢', name: 'Nahar Amrit Shakti', type: 'Residential Complex', status: 'live' },
              { icon: '🌇', name: 'Raheja Vihar', type: 'Residential', status: 'live' },
              { icon: '📡', name: 'Ghatkopar East', type: 'Residential & Commercial', status: 'live' },
              { icon: '🌆', name: 'Vikhroli West', type: 'Residential', status: 'live' },
              { icon: '🚀', name: 'New Areas', type: 'Expanding monthly', status: 'soon' },
            ].map(area => (
              <div
                key={area.name}
                className="area-row"
                style={area.status === 'soon' ? { borderColor: '#fde8d8' } : {}}
              >
                <div className="area-l">
                  <span style={{ fontSize: '1.1rem' }}>{area.icon}</span>
                  <div>
                    <div className="area-name">{area.name}</div>
                    <div className="area-type">{area.type}</div>
                  </div>
                </div>
                {area.status === 'live'
                  ? <div className="live-b"><span className="d"></span>Live</div>
                  : <div className="soon-b">Coming Soon</div>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* {Nature Section} */}
      <NatureSection />

      {/* TESTIMONIALS */}
      <section className="sec testi-bg">
        <div className="sec-inner">
          <div className="reveal sec-center">
            <span className="eyebrow">Customer Stories</span>
            <h2 className="sec-h">Raipur's happiest<br />subscribers.</h2>
          </div>
          <div className="testi-grid">
            <div className="testi-c reveal">
              <div className="t-stars">★★★★★</div>
              <p className="t-quote">"Installation took less than 2 hours and the speed is exactly as promised. I work from home on video calls all day and stream 4K in the evening. Zero issues in 6 months."</p>
              <div className="t-person">
                <div className="t-av" style={{ background: '#E8500A' }}>RK</div>
                <div><div className="t-name">Rahul Kumar</div><div className="t-loc">WFH Professional · Powai</div></div>
              </div>
            </div>
            <div className="testi-c reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="t-stars">★★★★★</div>
              <p className="t-quote">"The OTT bundle is genuinely great value. We cancelled our separate Hotstar, Zee5, and SonyLIV — it's all inside the plan. The savings alone cover the broadband cost."</p>
              <div className="t-person">
                <div className="t-av" style={{ background: '#2563EB' }}>PS</div>
                <div><div className="t-name">Priya Sharma</div><div className="t-loc">Homemaker · Hiranandani Gardens</div></div>
              </div>
            </div>
            <div className="testi-c reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="t-stars">★★★★★</div>
              <p className="t-quote">"Running a design studio on the Max plan. 8 months, zero downtime. Video meetings, large file uploads, and cloud backup all running simultaneously. Highly recommend."</p>
              <div className="t-person">
                <div className="t-av" style={{ background: '#16A34A' }}>AM</div>
                <div><div className="t-name">Amit Mehta</div><div className="t-loc">Business Owner · Ghatkopar East</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec" id="contact">
        <div className="cta-in reveal">
          <span className="eyebrow">Get Connected</span>
          <h2 className="sec-h">Ready to switch?<br />We'll call in 10 minutes.</h2>
          <p className="sec-p">No commitment. No paperwork. Just tell us your address and we handle the rest.</p>
          <div className="cta-btns">
            <a href="tel:+911234567890" className="b-orange">📞 Call Now</a>
            <a href="https://wa.me/911234567890" className="b-wa">💬 WhatsApp Us</a>
            <a href="#plans" className="b-ghost">View Plans</a>
          </div>
          <div className="trust-row">
            <span className="trust-item">✓ Free Installation</span>
            <span className="trust-item">✓ Free Router Included</span>
            <span className="trust-item">✓ No Lock-in Contract</span>
            <span className="trust-item">✓ Same Day Setup</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="logo" style={{ color: '#fff' }}>
              <div className="logo-icon">☀</div>
              <span>Sun<span style={{ color: 'var(--brand)' }}>Broadband</span></span>
            </div>
            <p>High-speed fiber internet with 24+ OTT apps across Raipur, Chhattisgarh. Reliable, affordable, and backed by real local support.</p>
          </div>
          <div className="foot-col">
            <h5>Plans</h5>
            <ul>
              <li><a href="#plans">Lite / Starter</a></li>
              <li><a href="#plans">Prime / Standard</a></li>
              <li><a href="#plans">Max / Ultra</a></li>
              <li><a href="#ott">OTT Bundle</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#coverage">Coverage</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Support</h5>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Pay Bill</a></li>
              <li><a href="#">Raise Ticket</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-btm">
          <p>© 2025 Sun Broadband. All rights reserved. Raipur, Chhattisgarh.</p>
          <div className="foot-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </footer>
    </>
  )
}
