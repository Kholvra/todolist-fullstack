import React from "react";
import { FiPlus } from "react-icons/fi";
import useDBMutation from "@/hooks/useDBMutation";
import { useState } from "react";

export default function CreateTodo() {
  const [newTodo, setNewTodo] = useState<string>("");
  const { createTodo } = useDBMutation();

  return (
    <form
      action=""
      onSubmit={(e) => {
        const {status, mutate} = createTodo(e,newTodo);
        if (status){
          mutate()
          setNewTodo('')
        } //if after the safe parse check success then clear the input
      }}
      className="flex"
    >
      <input
        type="text"
        className="mr-2 grow rounded-lg border border-neutral-400/30 px-4 py-4 shadow-xs transition duration-500 ease-in-out focus:ring-2 focus:ring-neutral-400/50 focus:outline-none"
        placeholder="What do you want to do?"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button
        type="submit"
        className={`flex flex-row items-center gap-2 rounded-lg bg-black px-3 py-1 text-white ${newTodo?.length > 0 ? "opacity-100" : "opacity-50"} cursor-pointer transition duration-200`}
      >
        <FiPlus className="text-white" />
        <span>Add</span>
      </button>
    </form>
  );
}
