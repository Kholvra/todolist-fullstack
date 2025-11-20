import { PiSignOutBold } from "react-icons/pi";
import SignOutButton from "./sign-out-button";

interface HeaderProps {
  email: string | null | undefined;
}

export default function Header({ email }: HeaderProps) {
  return (
    <header className="mb-10 flex w-full flex-row items-center justify-between">
      <div>
        <h1 className="mb-1 text-xl font-bold md:text-2xl">Todo List</h1>
        <span className="text-neutral">{email}</span>
      </div>
      <div>
        <SignOutButton className="flex cursor-pointer flex-row items-center gap-2 rounded-lg bg-neutral-400/10 p-2 transition md:bg-transparent hover:lg:bg-neutral-400/10">
          <PiSignOutBold className="size-5" />
        </SignOutButton>
      </div>
    </header>
  );
}
