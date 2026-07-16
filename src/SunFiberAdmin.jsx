import { useState, useEffect, useCallback } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────

// Same backend as the public pricing page. Swap for an env var in production.
// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = import.meta.env.VITE_API_URL


const BILLING_CYCLES = ["Monthly", "Quarterly", "Half-Yearly", "Yearly"];

// ─── API helper ───────────────────────────────────────────────────────────────
// No sessions, no tokens - every request carries username & password, and the
// backend checks them itself, per request. GET requests send them as query
// params; every other method sends them in the JSON body.

async function adminRequest(path, { method = "GET", body, credentials } = {}) {
  let url = `${API_BASE_URL}${path}`;
  const options = { method };

  if (method === "GET") {
    const params = new URLSearchParams({
      username: credentials.username,
      password: credentials.password,
    });
    url += (url.includes("?") ? "&" : "?") + params.toString();
  } else {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify({
      ...body,
      username: credentials.username,
      password: credentials.password,
    });
  }

  const res = await fetch(url, options);
  let data = {};
  try {
    data = await res.json();
  } catch {
    // some error responses have no JSON body - fine, data stays {}
  }
  if (!res.ok) {
    throw new Error(data.error || data.message || `Request failed (${res.status})`);
  }
  return data;
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const s = {
  page: {
    fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#1a1a1a",
    maxWidth: 900, margin: "0 auto", padding: "2rem 1rem",
  },
  card: {
    background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 14,
    padding: "1.25rem", marginBottom: "1.25rem",
  },
  subCard: {
    background: "#fafafa", border: "0.5px solid #ebebeb", borderRadius: 10,
    padding: "1rem", marginBottom: "0.75rem",
  },
  input: {
    border: "0.5px solid #ddd", borderRadius: 8, padding: "7px 10px",
    fontSize: 13, fontFamily: "inherit", color: "#1a1a1a",
  },
  label: {
    fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 3,
    display: "block", textTransform: "uppercase", letterSpacing: "0.04em",
  },
  row: { display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "flex-end" },
  field: { display: "flex", flexDirection: "column", gap: 2 },
  primaryBtn: {
    background: "#f97316", color: "#fff", border: "none", borderRadius: 8,
    padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  ghostBtn: {
    background: "#fff", color: "#f97316", border: "0.5px solid #f97316",
    borderRadius: 8, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  dangerBtn: {
    background: "#fff", color: "#dc2626", border: "0.5px solid #fca5a5",
    borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
  },
  smallBtn: {
    background: "#f5f5f5", color: "#555", border: "0.5px solid #e0e0e0",
    borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer",
  },
  errorText: { color: "#dc2626", fontSize: 12, marginTop: 6 },
  sectionTitle: {
    fontSize: 13, fontWeight: 800, color: "#333", letterSpacing: "0.04em",
    textTransform: "uppercase", marginBottom: "0.75rem",
  },
  badge: {
    background: "#fff7ed", border: "0.5px solid #fed7aa", borderRadius: 8,
    padding: "2px 9px", fontSize: 11, color: "#c2440a", fontWeight: 600, display: "inline-block",
  },
};

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setChecking(true);
    setError(null);
    try {
      const data = await adminRequest("/admin/login", {
        method: "POST",
        credentials: { username, password },
      });
      if (data.success) {
        onLogin({ username, password });
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setChecking(false);
    }
  }

  return (
    <div style={{
      minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <form onSubmit={handleSubmit} style={{ ...s.card, width: 320 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#111", marginBottom: 4 }}>
          Sun Fiber Admin
        </div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: "1.25rem" }}>
          Sign in to manage plans &amp; pricing
        </div>

        <div style={{ ...s.field, marginBottom: "0.75rem" }}>
          <label style={s.label}>Username</label>
          <input style={s.input} value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
        </div>
        <div style={{ ...s.field, marginBottom: "1rem" }}>
          <label style={s.label}>Password</label>
          <input style={s.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <div style={s.errorText}>{error}</div>}

        <button
          type="submit"
          disabled={checking}
          style={{ ...s.primaryBtn, width: "100%", marginTop: "0.5rem", opacity: checking ? 0.6 : 1 }}
        >
          {checking ? "Signing in…" : "Log in"}
        </button>
      </form>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function SunFiberAdmin() {
  const [credentials, setCredentials] = useState(null);
  const [view, setView] = useState({ name: "list" }); // { name: "list" } | { name: "detail", planId }

  if (!credentials) {
    return <LoginScreen onLogin={setCredentials} />;
  }

  return (
    <div style={s.page}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#111" }}>Sun Fiber Admin</div>
          <div style={{ fontSize: 12, color: "#888" }}>Plans, speed tiers &amp; pricing</div>
        </div>
        <button style={s.smallBtn} onClick={() => setCredentials(null)}>Log out</button>
      </div>

      {view.name === "list" ? (
        <PlansListView
          credentials={credentials}
          onOpenPlan={(planId) => setView({ name: "detail", planId })}
        />
      ) : (
        <PlanDetailView
          credentials={credentials}
          planId={view.planId}
          onBack={() => setView({ name: "list" })}
        />
      )}
    </div>
  );
}

// ─── Plans list ───────────────────────────────────────────────────────────────

function PlansListView({ credentials, onOpenPlan }) {
  const [plans, setPlans] = useState(null);
  const [error, setError] = useState(null);

  const refresh = useCallback(() => {
    setError(null);
    adminRequest("/admin/plans", { credentials })
      .then(setPlans)
      .catch((err) => setError(err.message));
  }, [credentials]);

  useEffect(() => { refresh(); }, [refresh]);

  if (error) {
    return (
      <div style={s.card}>
        <div style={s.errorText}>{error}</div>
        <button style={{ ...s.ghostBtn, marginTop: 8 }} onClick={refresh}>Try again</button>
      </div>
    );
  }
  if (plans === null) {
    return <div style={{ color: "#888", fontSize: 13 }}>Loading plans…</div>;
  }

  return (
    <div>
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          credentials={credentials}
          onSaved={refresh}
          onDeleted={refresh}
          onOpen={() => onOpenPlan(plan.id)}
        />
      ))}
      <NewPlanForm credentials={credentials} onCreated={refresh} />
    </div>
  );
}

// Editable plan card. Used both in the list (with a "Manage" button) and at
// the top of the detail view (pass onOpen={null} to hide that button there).
function PlanCard({ plan, credentials, onSaved, onDeleted, onOpen }) {
  const [form, setForm] = useState({
    tier: plan.tier, name: plan.name, meta: plan.meta || "",
    featured: plan.featured, ott_count: plan.ott_count, display_order: plan.display_order,
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setForm({
      tier: plan.tier, name: plan.name, meta: plan.meta || "",
      featured: plan.featured, ott_count: plan.ott_count, display_order: plan.display_order,
    });
  }, [plan]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await adminRequest(`/admin/plans/${plan.id}`, {
        method: "PUT",
        credentials,
        body: {
          tier: form.tier,
          name: form.name,
          meta: form.meta,
          featured: form.featured,
          ott_count: Number(form.ott_count),
          display_order: Number(form.display_order),
        },
      });
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete plan "${plan.name}"? This also deletes its OTT apps, sub-plans, speed tiers, and pricing.`)) return;
    setDeleting(true);
    setError(null);
    try {
      await adminRequest(`/admin/plans/${plan.id}`, { method: "DELETE", credentials });
      onDeleted();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  return (
    <div style={s.card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <span style={s.badge}>{plan.id}</span>
        <div style={{ display: "flex", gap: 8 }}>
          {onOpen && <button style={s.ghostBtn} onClick={onOpen}>Manage pricing →</button>}
          <button
            style={{ ...s.dangerBtn, opacity: deleting ? 0.6 : 1 }}
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>

      <div style={{ ...s.row, marginBottom: "0.6rem" }}>
        <div style={s.field}>
          <label style={s.label}>Tier label</label>
          <input style={{ ...s.input, width: 180 }} value={form.tier} onChange={(e) => update("tier", e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Display name</label>
          <input style={{ ...s.input, width: 180 }} value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div style={{ ...s.field, flex: 1, minWidth: 180 }}>
          <label style={s.label}>Meta line</label>
          <input style={s.input} value={form.meta} onChange={(e) => update("meta", e.target.value)} />
        </div>
      </div>

      <div style={s.row}>
        <div style={s.field}>
          <label style={s.label}>OTT count</label>
          <input type="number" style={{ ...s.input, width: 80 }} value={form.ott_count} onChange={(e) => update("ott_count", e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Display order</label>
          <input type="number" style={{ ...s.input, width: 80 }} value={form.display_order} onChange={(e) => update("display_order", e.target.value)} />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#555", paddingBottom: 8 }}>
          <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />
          Featured (Most Popular)
        </label>
        <button
          style={{ ...s.primaryBtn, opacity: saving ? 0.6 : 1, marginLeft: "auto" }}
          disabled={saving}
          onClick={handleSave}
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {error && <div style={s.errorText}>{error}</div>}
    </div>
  );
}

function NewPlanForm({ credentials, onCreated }) {
  const blank = { id: "", tier: "", name: "", meta: "", featured: false, ott_count: 0, display_order: 0 };
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleCreate() {
    if (!form.id.trim() || !form.tier.trim() || !form.name.trim()) {
      setError("id, tier and name are required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await adminRequest("/admin/plans", {
        method: "POST",
        credentials,
        body: {
          id: form.id.trim(),
          tier: form.tier,
          name: form.name,
          meta: form.meta,
          featured: form.featured,
          ott_count: Number(form.ott_count),
          display_order: Number(form.display_order),
        },
      });
      setForm(blank);
      onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ ...s.card, border: "1px dashed #f0c9a3", background: "#fffaf5" }}>
      <div style={s.sectionTitle}>+ Add a new plan</div>
      <div style={{ ...s.row, marginBottom: "0.6rem" }}>
        <div style={s.field}>
          <label style={s.label}>id (e.g. &quot;ultra&quot;)</label>
          <input style={{ ...s.input, width: 100 }} value={form.id} onChange={(e) => update("id", e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Tier label</label>
          <input style={{ ...s.input, width: 160 }} value={form.tier} onChange={(e) => update("tier", e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Display name</label>
          <input style={{ ...s.input, width: 160 }} value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div style={{ ...s.field, flex: 1, minWidth: 160 }}>
          <label style={s.label}>Meta line</label>
          <input style={s.input} value={form.meta} onChange={(e) => update("meta", e.target.value)} />
        </div>
      </div>
      <div style={s.row}>
        <div style={s.field}>
          <label style={s.label}>OTT count</label>
          <input type="number" style={{ ...s.input, width: 80 }} value={form.ott_count} onChange={(e) => update("ott_count", e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Display order</label>
          <input type="number" style={{ ...s.input, width: 80 }} value={form.display_order} onChange={(e) => update("display_order", e.target.value)} />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#555", paddingBottom: 8 }}>
          <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />
          Featured
        </label>
        <button
          style={{ ...s.primaryBtn, opacity: saving ? 0.6 : 1, marginLeft: "auto" }}
          disabled={saving}
          onClick={handleCreate}
        >
          {saving ? "Creating…" : "Create plan"}
        </button>
      </div>
      {error && <div style={s.errorText}>{error}</div>}
    </div>
  );
}

// ─── Plan detail ──────────────────────────────────────────────────────────────

function PlanDetailView({ credentials, planId, onBack }) {
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  const refresh = useCallback(() => {
    setError(null);
    adminRequest(`/admin/plans-full/${planId}`, { credentials })
      .then(setPlan)
      .catch((err) => setError(err.message));
  }, [credentials, planId]);

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <div>
      <button style={{ ...s.smallBtn, marginBottom: "1rem" }} onClick={onBack}>← Back to plans</button>

      {error && (
        <div style={s.card}>
          <div style={s.errorText}>{error}</div>
          <button style={{ ...s.ghostBtn, marginTop: 8 }} onClick={refresh}>Try again</button>
        </div>
      )}

      {!error && plan === null && <div style={{ color: "#888", fontSize: 13 }}>Loading plan…</div>}

      {plan && (
        <>
          <PlanCard plan={plan} credentials={credentials} onSaved={refresh} onDeleted={onBack} onOpen={null} />
          <OttAppsSection plan={plan} credentials={credentials} onChanged={refresh} />
          <SubPlansSection plan={plan} credentials={credentials} onChanged={refresh} />
        </>
      )}
    </div>
  );
}

function OttAppsSection({ plan, credentials, onChanged }) {
  const [newApp, setNewApp] = useState("");
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState(null);

  async function handleAdd() {
    if (!newApp.trim()) return;
    setAdding(true);
    setError(null);
    try {
      await adminRequest("/admin/ott-apps", {
        method: "POST",
        credentials,
        body: { plan_id: plan.id, app_name: newApp.trim(), display_order: plan.ott_apps.length },
      });
      setNewApp("");
      onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(id) {
    setRemovingId(id);
    setError(null);
    try {
      await adminRequest(`/admin/ott-apps/${id}`, { method: "DELETE", credentials });
      onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div style={s.card}>
      <div style={s.sectionTitle}>OTT apps ({plan.ott_apps.length})</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "0.75rem" }}>
        {plan.ott_apps.map((app) => (
          <span key={app.id} style={{ ...s.badge, display: "flex", alignItems: "center", gap: 6 }}>
            {app.app_name}
            <span
              onClick={() => handleRemove(app.id)}
              style={{ cursor: "pointer", color: "#c2440a", fontWeight: 700, opacity: removingId === app.id ? 0.4 : 1 }}
            >
              ×
            </span>
          </span>
        ))}
        {plan.ott_apps.length === 0 && (
          <span style={{ fontSize: 12, color: "#aaa" }}>No OTT apps yet.</span>
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{ ...s.input, width: 200 }}
          placeholder="New app name"
          value={newApp}
          onChange={(e) => setNewApp(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button style={{ ...s.ghostBtn, opacity: adding ? 0.6 : 1 }} disabled={adding} onClick={handleAdd}>
          {adding ? "Adding…" : "Add app"}
        </button>
      </div>
      {error && <div style={s.errorText}>{error}</div>}
    </div>
  );
}

function SubPlansSection({ plan, credentials, onChanged }) {
  return (
    <div style={s.card}>
      <div style={s.sectionTitle}>Sub-plans, speed tiers &amp; pricing</div>
      {plan.sub_plans.map((sp) => (
        <SubPlanBlock key={sp.id} subPlan={sp} credentials={credentials} onChanged={onChanged} />
      ))}
      <NewSubPlanForm planId={plan.id} credentials={credentials} onChanged={onChanged} />
    </div>
  );
}

function SubPlanBlock({ subPlan, credentials, onChanged }) {
  const [label, setLabel] = useState(subPlan.label);
  const [hasOtt, setHasOtt] = useState(subPlan.has_ott);
  const [displayOrder, setDisplayOrder] = useState(subPlan.display_order);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLabel(subPlan.label);
    setHasOtt(subPlan.has_ott);
    setDisplayOrder(subPlan.display_order);
  }, [subPlan]);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await adminRequest(`/admin/sub-plans/${subPlan.id}`, {
        method: "PUT",
        credentials,
        body: { label, has_ott: hasOtt, display_order: Number(displayOrder) },
      });
      onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete sub-plan "${subPlan.label}"? This also deletes its speed tiers and pricing.`)) return;
    setDeleting(true);
    setError(null);
    try {
      await adminRequest(`/admin/sub-plans/${subPlan.id}`, { method: "DELETE", credentials });
      onChanged();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  return (
    <details open style={s.subCard}>
      <summary style={{ cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#333" }}>
        {subPlan.label} {subPlan.has_ott && <span style={{ ...s.badge, marginLeft: 6 }}>OTT bundled</span>}
      </summary>

      <div style={{ ...s.row, marginTop: "0.75rem", marginBottom: "0.5rem" }}>
        <div style={s.field}>
          <label style={s.label}>Label</label>
          <input style={{ ...s.input, width: 220 }} value={label} onChange={(e) => setLabel(e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Display order</label>
          <input type="number" style={{ ...s.input, width: 80 }} value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#555", paddingBottom: 8 }}>
          <input type="checkbox" checked={hasOtt} onChange={(e) => setHasOtt(e.target.checked)} />
          Includes OTT apps
        </label>
        <button style={{ ...s.primaryBtn, opacity: saving ? 0.6 : 1 }} disabled={saving} onClick={handleSave}>
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          style={{ ...s.dangerBtn, opacity: deleting ? 0.6 : 1, marginLeft: "auto" }}
          disabled={deleting}
          onClick={handleDelete}
        >
          {deleting ? "Deleting…" : "Delete sub-plan"}
        </button>
      </div>
      {error && <div style={s.errorText}>{error}</div>}

      <div style={{ paddingLeft: "0.25rem", borderLeft: "2px solid #f0e0d0", marginLeft: "0.25rem" }}>
        {subPlan.speed_tiers.map((tier) => (
          <SpeedTierBlock key={tier.id} tier={tier} credentials={credentials} onChanged={onChanged} />
        ))}
        <NewSpeedTierForm subPlanId={subPlan.id} credentials={credentials} onChanged={onChanged} />
      </div>
    </details>
  );
}

function SpeedTierBlock({ tier, credentials, onChanged }) {
  const [speedLabel, setSpeedLabel] = useState(tier.speed_label);
  const [speedMbps, setSpeedMbps] = useState(tier.speed_mbps);
  const [displayOrder, setDisplayOrder] = useState(tier.display_order);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSpeedLabel(tier.speed_label);
    setSpeedMbps(tier.speed_mbps);
    setDisplayOrder(tier.display_order);
  }, [tier]);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await adminRequest(`/admin/speed-tiers/${tier.id}`, {
        method: "PUT",
        credentials,
        body: { speed_label: speedLabel, speed_mbps: Number(speedMbps), display_order: Number(displayOrder) },
      });
      onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete speed tier "${tier.speed_label}"? This also deletes its pricing.`)) return;
    setDeleting(true);
    setError(null);
    try {
      await adminRequest(`/admin/speed-tiers/${tier.id}`, { method: "DELETE", credentials });
      onChanged();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  const pricingByCycle = Object.fromEntries((tier.pricing || []).map((p) => [p.billing_cycle, p]));

  return (
    <div style={{ ...s.subCard, background: "#fff" }}>
      <div style={{ ...s.row, marginBottom: "0.6rem" }}>
        <div style={s.field}>
          <label style={s.label}>Speed label</label>
          <input style={{ ...s.input, width: 110 }} value={speedLabel} onChange={(e) => setSpeedLabel(e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Speed (Mbps)</label>
          <input type="number" style={{ ...s.input, width: 90 }} value={speedMbps} onChange={(e) => setSpeedMbps(e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Display order</label>
          <input type="number" style={{ ...s.input, width: 80 }} value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} />
        </div>
        <button style={{ ...s.primaryBtn, opacity: saving ? 0.6 : 1 }} disabled={saving} onClick={handleSave}>
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          style={{ ...s.dangerBtn, opacity: deleting ? 0.6 : 1, marginLeft: "auto" }}
          disabled={deleting}
          onClick={handleDelete}
        >
          {deleting ? "Deleting…" : "Delete tier"}
        </button>
      </div>
      {error && <div style={s.errorText}>{error}</div>}

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ textAlign: "left", color: "#888" }}>
            <th style={{ padding: "4px 6px", fontWeight: 600 }}>Cycle</th>
            <th style={{ padding: "4px 6px", fontWeight: 600 }}>Total (₹)</th>
            <th style={{ padding: "4px 6px", fontWeight: 600 }}>Effective/mo (₹)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {BILLING_CYCLES.map((cycle) => (
            <PricingRow
              key={cycle}
              tierId={tier.id}
              billingCycle={cycle}
              existing={pricingByCycle[cycle]}
              credentials={credentials}
              onSaved={onChanged}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PricingRow({ tierId, billingCycle, existing, credentials, onSaved }) {
  const [total, setTotal] = useState(existing ? String(Number(existing.total_amount)) : "");
  const [eff, setEff] = useState(existing ? String(Number(existing.effective_monthly)) : "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTotal(existing ? String(Number(existing.total_amount)) : "");
    setEff(existing ? String(Number(existing.effective_monthly)) : "");
  }, [existing]);

  async function handleSave() {
    if (total === "" || eff === "") {
      setError("Both prices required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await adminRequest("/admin/pricing-upsert", {
        method: "PUT",
        credentials,
        body: {
          speed_tier_id: tierId,
          billing_cycle: billingCycle,
          total_amount: Number(total),
          effective_monthly: Number(eff),
        },
      });
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr style={{ borderTop: "1px solid #f0f0f0" }}>
      <td style={{ padding: "6px", fontWeight: 600, color: "#555" }}>{billingCycle}</td>
      <td style={{ padding: "6px" }}>
        <input type="number" style={{ ...s.input, width: 90 }} value={total} onChange={(e) => setTotal(e.target.value)} />
      </td>
      <td style={{ padding: "6px" }}>
        <input type="number" style={{ ...s.input, width: 90 }} value={eff} onChange={(e) => setEff(e.target.value)} />
      </td>
      <td style={{ padding: "6px" }}>
        <button style={{ ...s.smallBtn, opacity: saving ? 0.6 : 1 }} disabled={saving} onClick={handleSave}>
          {saving ? "…" : existing ? "Save" : "Create"}
        </button>
        {error && <div style={s.errorText}>{error}</div>}
      </td>
    </tr>
  );
}

function NewSpeedTierForm({ subPlanId, credentials, onChanged }) {
  const [speedLabel, setSpeedLabel] = useState("");
  const [speedMbps, setSpeedMbps] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function handleAdd() {
    if (!speedLabel.trim() || speedMbps === "") {
      setError("Speed label and Mbps are required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await adminRequest("/admin/speed-tiers", {
        method: "POST",
        credentials,
        body: {
          sub_plan_id: subPlanId,
          speed_label: speedLabel.trim(),
          speed_mbps: Number(speedMbps),
          display_order: Number(displayOrder),
        },
      });
      setSpeedLabel("");
      setSpeedMbps("");
      setDisplayOrder(0);
      onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ ...s.row, padding: "0.5rem 0" }}>
      <div style={s.field}>
        <label style={s.label}>New speed label</label>
        <input
          style={{ ...s.input, width: 110 }}
          placeholder="e.g. 400 Mbps"
          value={speedLabel}
          onChange={(e) => setSpeedLabel(e.target.value)}
        />
      </div>
      <div style={s.field}>
        <label style={s.label}>Mbps</label>
        <input type="number" style={{ ...s.input, width: 80 }} value={speedMbps} onChange={(e) => setSpeedMbps(e.target.value)} />
      </div>
      <div style={s.field}>
        <label style={s.label}>Display order</label>
        <input type="number" style={{ ...s.input, width: 80 }} value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} />
      </div>
      <button style={{ ...s.ghostBtn, opacity: saving ? 0.6 : 1 }} disabled={saving} onClick={handleAdd}>
        {saving ? "Adding…" : "+ Add speed tier"}
      </button>
      {error && <div style={s.errorText}>{error}</div>}
    </div>
  );
}

function NewSubPlanForm({ planId, credentials, onChanged }) {
  const [label, setLabel] = useState("");
  const [hasOtt, setHasOtt] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function handleAdd() {
    if (!label.trim()) {
      setError("Label is required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await adminRequest("/admin/sub-plans", {
        method: "POST",
        credentials,
        body: { plan_id: planId, label: label.trim(), has_ott: hasOtt, display_order: Number(displayOrder) },
      });
      setLabel("");
      setHasOtt(false);
      setDisplayOrder(0);
      onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ ...s.row, borderTop: "1px dashed #e5e5e5", paddingTop: "0.75rem", marginTop: "0.5rem" }}>
      <div style={{ ...s.field, flex: 1, minWidth: 180 }}>
        <label style={s.label}>New sub-plan label</label>
        <input
          style={s.input}
          placeholder='e.g. "Internet + OTT 25 Apps"'
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div style={s.field}>
        <label style={s.label}>Display order</label>
        <input type="number" style={{ ...s.input, width: 80 }} value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} />
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#555", paddingBottom: 8 }}>
        <input type="checkbox" checked={hasOtt} onChange={(e) => setHasOtt(e.target.checked)} />
        Includes OTT apps
      </label>
      <button style={{ ...s.primaryBtn, opacity: saving ? 0.6 : 1 }} disabled={saving} onClick={handleAdd}>
        {saving ? "Adding…" : "+ Add sub-plan"}
      </button>
      {error && <div style={s.errorText}>{error}</div>}
    </div>
  );
}
