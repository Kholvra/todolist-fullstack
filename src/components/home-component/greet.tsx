'use client'

import { useSession } from "next-auth/react"

export default function Greet(){
    const {data: session} = useSession()
    
    return(
        <h1>{session? `hellow ${session.user.email}`:'youre not log on'}</h1>
    )
}