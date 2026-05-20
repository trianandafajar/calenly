export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(135deg, #f5f3ff 0%, #ffffff 50%, #eef2ff 100%)",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "680px",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "18px",
          padding: "48px 32px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(17, 24, 39, 0.1)",
        }}
      >
        <p style={{ margin: 0, color: "#886CC0", fontWeight: 700, letterSpacing: "0.1em" }}>ERROR 404</p>
        <h1 style={{ margin: "10px 0 12px", fontSize: "42px", lineHeight: 1.2, color: "#111827" }}>Page Not Found</h1>
        <p style={{ margin: "0 auto 28px", maxWidth: "520px", color: "#4b5563", fontSize: "16px", lineHeight: 1.6 }}>
          The page you are looking for may have been moved, deleted, or is temporarily unavailable.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            backgroundColor: "#886CC0",
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: 600,
            padding: "12px 22px",
            borderRadius: "999px",
          }}
        >
          Back to Home
        </a>
      </section>
    </main>
  )
}
