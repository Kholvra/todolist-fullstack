import { type ReactNode } from "react"

interface PageWrapperProps{
    children: ReactNode
}

export default function PageWrapper({children}:PageWrapperProps){
    return(
        <div className=" mt-10 md:mt-0 h-screen w-screen overflow-hidden bg-danger-400" >
            <div className="h-full lg:w-1/3 mx-auto p-5 bg-yellow-200">{children}</div>
        </div>
    )
}