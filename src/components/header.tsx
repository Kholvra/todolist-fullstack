import { PiSignOutBold } from "react-icons/pi";
import SignOutButton from "./sign-out-button";


interface HeaderProps{
    email: string|null|undefined
}

export default function Header({email}:HeaderProps){
    return(
        <header className="flex flex-row justify-between items-center w-full mb-10">
            <div>
                <h1 className="text-xl md:text-2xl font-bold mb-1">Todo List</h1>
                <span className="text-neutral">{email}</span>
            </div>
            <div><SignOutButton className="flex flex-row items-center gap-2 p-2 bg-neutral-400/10 md:bg-transparent hover:lg:bg-neutral-400/10 rounded-lg transition cursor-pointer"><PiSignOutBold className="size-5"/><span className="hidden md:block font-semibold">Sign Out</span></SignOutButton></div>
        </header>
    )
}