import Greet from "@/components/home-component/greet"
import { auth } from "@/server/auth"
import { redirect } from "next/navigation"


export default async function Home(){
    const session = await auth()
    if(!session){
        redirect('/login')
    }
    return <div>
        <Greet/>
    </div>
}