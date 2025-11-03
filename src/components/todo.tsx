import { type todoAll } from "@/types/todo-type";
import type { ChangeEvent } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

interface TodoProps {
  todo: todoAll;
  toggleDone: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  deleteTodo: (id: string) => void;
}

export default function Todo({ todo, toggleDone, deleteTodo }: TodoProps) {
  const { id, text, done } = todo;

  return (
    <li className="my-2 flex flex-row items-center justify-between rounded-lg border border-neutral-200/40 p-3 hover:bg-neutral-200/10">
      <div className="flex flex-row items-center">
        <div className="realtive mr-3">
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => toggleDone(e, id)}
            className="peer absolute h-5 w-5 opacity-0"
          />
          <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border border-neutral-200/40 peer-checked:border-black peer-checked:bg-black transition duration-200">
            {done ? (
              <FaCheck className="h-3 w-3 text-white" />
            ) : (
              <span className="h-3 w-3 text-transparent">.</span>
            )}
          </div>
        </div>

        <span className={`${done?'line-through text-neutral':''} break-all`}>{text}</span>
      </div>
      <button
        className="hover:bg-danger-100 mx-2 rounded-lg p-2 transition duration-100"
        onClick={() => deleteTodo(id)}
      >
        <FaRegTrashAlt className="text-danger-700" />
      </button>
    </li>
  );
}
