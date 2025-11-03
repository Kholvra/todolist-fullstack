interface HeaderProps{
    email: string|null|undefined
}

export default function Header({email}:HeaderProps){
    return(
        <header className="relative w-screen after:absolute after:bg-black after:h-1 after:left-0 after:right-0 after:w-screen after:content-['']">
            {email}
            <div className="w-screen bg-black"></div>
        </header>
    )
}