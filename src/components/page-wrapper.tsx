import { type ReactNode } from "react"

interface PageWrapperProps{
    children: ReactNode
}

export default function PageWrapper({children}:PageWrapperProps){
    return(
        <div className="h-screen w-screen">
            <div className="size-full w-3/4 mx-auto">{children}</div>
        </div>
    )
}