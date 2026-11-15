import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap section">
      <p className="label">404</p>
      <h1 style={{ fontSize: "var(--step-5)", marginTop: "var(--s-4)" }}>This page does not exist.</h1>
      <p style={{ marginTop: "var(--s-5)" }}>
        <Link href="/" className="btn">Back to home</Link>
      </p>
    </section>
  );
}

