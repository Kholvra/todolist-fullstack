'use client';

import useDBMutation from "@/hooks/useDBMutation";
import type { todoAll } from "@/types/todo-type";
import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface EditTodoModalProps{
    todo: todoAll
}


export default function EditTodoModal({todo}:EditTodoModalProps){

    const [open,setOpen] = useState(false)
    const [newText, setNewText] = useState<string>("")
    const {editMutation} = useDBMutation()
    const {id} = todo

    function submitHandler(){
        const {status,mutate} = editMutation(id,newText)
        if (status){
            mutate()
            setOpen(false)
        }
    }

    return(
        
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button className="bg-success">Edit</button>
            </Dialog.Trigger>
            <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow"/>
            <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
                <Dialog.Title>
                    Edit Task
                </Dialog.Title>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    submitHandler()
                }}>
                    <input type="text" name="" id="" onChange={(e)=>setNewText(e.target.value)}/>
                    <button type="submit">Submit</button>
                </form>
                <Dialog.Close asChild>
                    <button className="absolute right-3 top-3"><IoCloseOutline className="size-6"/></button>
                </Dialog.Close>
            </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}