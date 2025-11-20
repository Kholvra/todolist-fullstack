"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { type todoAll } from "@/types/todo-type";
import Todo from "@/components/todos-component/todo";
import ClearAllModal from "../modal/clear-todo-all-modal";

interface CompletedTodosProps {
  todo: todoAll[] | undefined;
}

export default function CompletedTodos({ todo }: CompletedTodosProps) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <div className="flex justify-between mt-10">
        <Collapsible.Trigger asChild>
          <button className="hover:text-neutral flex cursor-pointer flex-row items-center gap-2">
            <MdKeyboardArrowUp
              className={`size-6 ${open ? "" : "-rotate-180"} transition duration-100`}
            />
            <span className="text-lg font-bold">{`Completed (${todo?.length})`}</span>
          </button>
        </Collapsible.Trigger>
        <ClearAllModal todo={todo}/>
      </div>
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
