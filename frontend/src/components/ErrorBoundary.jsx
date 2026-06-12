import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log per a debugging futur (no s'envia a cap servei extern)
    console.error("[PDJ Error Boundary]", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main id="main" style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem", background: "var(--c-cream, #F5F1E8)", fontFamily: "var(--f-sans, sans-serif)",
      }}>
        <div style={{ maxWidth: "520px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--f-mono, monospace)", fontSize: ".75rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--c-ink-soft, #5A6478)", marginBottom: "1rem" }}>
            Error inesperat
          </p>
          <h1 style={{ fontFamily: "var(--f-display, serif)", fontSize: "clamp(1.5rem,5vw,2.5rem)", fontWeight: 400, color: "var(--c-ink, #0E1B3D)", marginBottom: "1rem" }}>
            Alguna cosa ha anat malament
          </h1>
          <p style={{ color: "var(--c-ink-soft, #5A6478)", marginBottom: "2rem", lineHeight: 1.6 }}>
            La pàgina ha trobat un error inesperat. Torna a carregar-la per continuar.
          </p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.hash = "/home"; }}
            style={{
              background: "var(--c-ink, #0E1B3D)", color: "var(--c-cream, #F5F1E8)",
              border: "none", borderRadius: "999px", padding: "12px 28px",
              fontFamily: "inherit", fontSize: "1rem", fontWeight: 500, cursor: "pointer",
            }}
          >
            Tornar a l'inici
          </button>
        </div>
      </main>
    );
  }
}
