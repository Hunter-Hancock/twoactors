import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <h1 className="text-2xl">See if Actors are in the same movie or show</h1>
      <ModeToggle />
    </div>
  );
}
