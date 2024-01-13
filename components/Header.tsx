import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <h1 className="text-2xl">
        See What Movies or Shows Actors Have in Common
      </h1>
      <ModeToggle />
    </div>
  );
}
