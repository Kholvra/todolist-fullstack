"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { type todoAll } from "@/types/todo-type";
import { type ChangeEvent } from "react";
import Todo from "@/components/todo";

interface CompletedTodosProps {
  todo: todoAll[] | undefined;
  toggleDone: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  deleteTodo: (id: string) => void;
}

export default function CompletedTodos({
  todo,
  toggleDone,
  deleteTodo,
}: CompletedTodosProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="mt-10">
      <Collapsible.Trigger asChild>
        <button className="flex flex-row items-center gap-2 hover:text-neutral cursor-pointer">
          <MdKeyboardArrowUp className={`size-6 ${open? '':'-rotate-180'} transition duration-100`} />
          <span className="text-lg font-bold">{`Completed (${todo?.length})`}</span>
        </button>
      </Collapsible.Trigger>
      <Collapsible.CollapsibleContent>
        <div className="relative overflow-y-auto max-h-[30dvh]">
          {todo?.length ? (
            <ul>
              {todo.map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    toggleDone={toggleDone}
                    deleteTodo={deleteTodo}
                  />
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
      </Collapsible.CollapsibleContent>
    </Collapsible.Root>
  );
}
