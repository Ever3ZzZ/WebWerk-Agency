export default function Button({ children, href, variant = "primary" }) {
  const styles =
    variant === "primary"
      ? "bg-ink text-white shadow-soft hover:bg-copper"
      : "bg-white/70 text-ink shadow-line hover:bg-white";

  return (
    <a
      href={href}
      className={`focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </a>
  );
}
