import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Acest link nu exista</h2>
      <Link href="/">Acasa</Link>
    </div>
  );
}
