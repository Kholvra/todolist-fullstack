import { type todoAll } from "@/types/todo-type"
import type { ChangeEvent } from "react"

interface TodoProps{
    todo: todoAll
    toggleDone: (e:ChangeEvent<HTMLInputElement>,id:string)=>void
    deleteTodo: (id:string)=>void
}


export default function Todo({todo, toggleDone, deleteTodo}:TodoProps){

    const {id,text,done} = todo

    return(
        <li className="my-2"><input type="checkbox" checked={done} onChange={(e)=>toggleDone(e,id)}/>{text}<button className="mx-2 bg-blue-300 rounded p-1" onClick={()=>deleteTodo(id)}>delete</button></li>
    )
}