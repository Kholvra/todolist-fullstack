import { type todoAll } from "@/types/todo-type";
import type { ChangeEvent } from "react";
import { FaRegTrashAlt } from "react-icons/fa";


interface TodoProps {
  todo: todoAll;
  toggleDone: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  deleteTodo: (id: string) => void;
}

export default function Todo({ todo, toggleDone, deleteTodo }: TodoProps) {
  const { id, text, done } = todo;

  return (
    <li className="my-2 flex flex-row items-center justify-between rounded-lg border border-neutral-400/40 p-3 hover:bg-neutral-200/10">
      <div>
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => toggleDone(e, id)}
          className="mr-3 rounded border border-neutral-400/40"
        />
        <span>{text}</span>
      </div>
      <button
        className="mx-2 rounded-lg p-2 hover:bg-danger-100 transition duration-100"
        onClick={() => deleteTodo(id)}
      >
        <FaRegTrashAlt className="text-danger-700"/>
      </button>
    </li>
  );
}
