import { useState, type FormEvent } from "react";
import { FiPlus } from "react-icons/fi";

interface CreateTodoProps {
  handler: (e: FormEvent<HTMLFormElement>, newTodo: string) => void;
}

export default function CreateTodo({ handler }: CreateTodoProps) {
  const [newTodo, setNewTodo] = useState("");

  return (
    <form
      action=""
      onSubmit={(e) => {
        handler(e, newTodo);
        setNewTodo("");
      }}
      className="flex"
    >
      <input
        type="text"
        className="grow py-4 px-4 mr-2 border border-neutral-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400/50 transition duration-500 ease-in-out shadow-xs"
        placeholder="What do you want to do?"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="submit" className={`flex flex-row items-center gap-2 rounded-lg px-3 py-1 bg-black text-white ${newTodo?.length>0?'opacity-100':'opacity-50'} transition duration-200 `}>
        <FiPlus className="text-white"/><span>Add</span>
      </button>
    </form>
  );
}
