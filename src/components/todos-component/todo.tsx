import useDBMutation from "@/hooks/useDBMutation";
import { type todoAll } from "@/types/todo-type";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

interface TodoProps {
  todo: todoAll;
}

export default function Todo({ todo }: TodoProps) {
  const { id, text, done } = todo;
  const { toggleDone, deleteTodo } = useDBMutation();

  return (
    <li className="my-2 flex flex-row items-center justify-between rounded-lg border border-neutral-200/40 p-3 hover:bg-neutral-200/10">
      <div className="flex flex-row items-center">
        <div className="realtive mr-3">
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => toggleDone(e, id)}
            className="peer absolute h-5 w-5 cursor-pointer opacity-0"
          />
          <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border border-neutral-200/40 transition duration-200 peer-checked:border-black peer-checked:bg-black">
            {done ? (
              <FaCheck className="h-3 w-3 text-white" />
            ) : (
              <span className="h-3 w-3 text-transparent">.</span>
            )}
          </div>
        </div>

        <span
          className={`${done ? "text-neutral line-through" : ""} break-all`}
        >
          {text}
        </span>
      </div>
      <button
        className="hover:bg-danger-100 mx-2 cursor-pointer rounded-lg p-2 transition duration-100"
        onClick={() => deleteTodo(id)}
      >
        <FaRegTrashAlt className="text-danger-700" />
      </button>
    </li>
  );
}
