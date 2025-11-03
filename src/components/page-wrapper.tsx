import { type ReactNode } from "react"

interface PageWrapperProps{
    children: ReactNode
}

export default function PageWrapper({children}:PageWrapperProps){
    return(
        <div className="h-screen w-screen overflow-x-hidden">
            <div className="size-full lg:w-1/3 mx-auto p-5">{children}</div>
        </div>
    )
}