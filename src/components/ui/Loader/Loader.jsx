export default function UiLoader({ visible = true, fullscreen = false, label = "Loading..." }) {
  if (!visible) return null;

  const spinner = <div className="spinner-border" style={{ color: "#ea1c26" }} aria-hidden="true" />;

  if (fullscreen) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
        }}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          {spinner}
          {label ? <div style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>{label}</div> : null}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "20px 0" }} role="status" aria-live="polite" aria-busy="true">
      {spinner}
      {label ? <div style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>{label}</div> : null}
    </div>
  );
}
