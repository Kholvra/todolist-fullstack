
interface SubmitButtonProps {
    inputField: string
    children: React.ReactNode
    className?: string
}

export default function SubmitButton({inputField,children,className}:SubmitButtonProps){

    return <button className={`flex flex-row items-center gap-2 rounded-lg bg-black px-3 py-1 text-white ${inputField?.length > 0 ? "opacity-100" : "opacity-50"} cursor-pointer transition duration-200 ${className}`}>{children}</button>
}