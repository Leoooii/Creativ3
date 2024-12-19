import Link from "next/link";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

export default function NotFound() {
  return (
    <div
      className={
        "w-full flex flex-col items-center justify-center h-96 text-white"
      }
    >
      <QuestionMarkCircleIcon className={"w-12"} />
      <h2>Acest link nu exista</h2>
      <Link href="/">Navigati spre Acasa</Link>
    </div>
  );
}
