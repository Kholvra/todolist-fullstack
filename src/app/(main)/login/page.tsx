'use client'

import { useState, type FormEvent } from "react"
import { signIn, useSession, signOut } from "next-auth/react"

export default function Login(){

    const [email, setEmail] = useState('')
    const {data: session,status} = useSession()

    const loginSubmitHandler=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (!session){
            await signIn('nodemailer',{email, redirectTo:'/'})
        } else{
            await signOut();
        }
    }  

    if (status==='loading'){
        return <span>loadin</span>
    }

    return(
        <div className="flex flex-col size-full justify-center items-center gap-5">
            <h1 className="text-3xl">LOGIN</h1>
            <form action="" className="bg-white flex flex-col justify-center items-center gap-5" onSubmit={(e)=>loginSubmitHandler(e)}>
                {!session?<input type="text" className="border" value={email} onChange={(e)=>setEmail(e.target.value)}/>:<span>You already Sign In</span>}
                <button type="submit" className="bg-blue-200 rounded p-2">{!session? 'sign in':'sign out'}</button>
            </form>
        </div>
    )
}