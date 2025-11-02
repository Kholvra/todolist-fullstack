'use client'

import { useState, type FormEvent } from "react"
import { signIn, useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login(){

    const [email, setEmail] = useState('')
    const {data: session,status} = useSession()
    const router = useRouter()

    const loginSubmitHandler=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (!session){
            const encodedEmail = encodeURIComponent(email)
            const result = await signIn('nodemailer',{email, redirect:false, redirectTo:'/'})
            if (result?.ok){
                router.push(`/verify?email=${encodedEmail}`)
            } else{
                alert('failed sending magic link')
            }

        } else{
            await signOut();
        }
    }
    

    if (status==='loading'){
        return <span>loading</span>
    }

    return(
        <div className="flex flex-col size-full justify-center items-center">
            <h1 className="text-4xl font-bold mb-2">Sign In</h1>
            <span className="text-neutral mb-7">Use your email to continue</span>
            <form action="" className=" flex flex-col w-100 justify-center gap-3" onSubmit={(e)=>loginSubmitHandler(e)}>
                {!session?<input type="text" className="p-1 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-3 focus:ring-neutral-400/50 transition duration-500 ease-in-out shadow-xl" value={email} onChange={(e)=>setEmail(e.target.value)}/>:<span>You already Sign In</span>}
                <button type="submit" className={`rounded-lg p-2 py-2 bg-black ${email.length>0?'opacity-100':'opacity-50'} text-white text-lg transition duration-300`}>{!session? 'Sign In':'Sign Out'}</button>
            </form>
            <span className="text-neutral mt-7">We&apos;ll send a login link to your email</span>
        </div>
    )
}