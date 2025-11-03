'use client'

import type { ReactNode } from "react"
import { signOut } from "next-auth/react"

interface SignOutButtonProps{
    className?: string,
    children: ReactNode
}

export default function SignOutButton({className,children}:SignOutButtonProps){
    return(
        <button onClick={()=>signOut()} className={className}>{children}</button>
    )
}