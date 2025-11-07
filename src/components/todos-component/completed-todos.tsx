"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { type todoAll } from "@/types/todo-type";
import Todo from "@/components/todos-component/todo";

interface CompletedTodosProps {
  todo: todoAll[] | undefined;
}

export default function CompletedTodos({ todo }: CompletedTodosProps) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="mt-10">
      <Collapsible.Trigger asChild>
        <button className="hover:text-neutral flex cursor-pointer flex-row items-center gap-2">
          <MdKeyboardArrowUp
            className={`size-6 ${open ? "" : "-rotate-180"} transition duration-100`}
          />
          <span className="text-lg font-bold">{`Completed (${todo?.length})`}</span>
        </button>
      </Collapsible.Trigger>
      <Collapsible.CollapsibleContent>
        <div className="relative max-h-[30dvh] overflow-y-auto">
          <ul>
            {todo?.map((todo) => {
              return <Todo key={todo.id} todo={todo} />;
            })}
          </ul>
        </div>
      </Collapsible.CollapsibleContent>
    </Collapsible.Root>
  );
}
