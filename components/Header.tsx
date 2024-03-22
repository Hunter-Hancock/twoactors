import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <h1 className="text-2xl">
        See What Movies or Shows Actors Have in Common
      </h1>
      <nav>
        <ul className="flex gap-5">
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
      <ModeToggle />
    </div>
  );
}
