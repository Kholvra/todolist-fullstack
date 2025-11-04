"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { type todoAll } from "@/types/todo-type";
import { type ChangeEvent } from "react";
import Todo from "@/components/todo";


interface CompletedTodosProps{
    todo: todoAll[]|undefined
    toggleDone: (e: ChangeEvent<HTMLInputElement>, id: string) => void
    deleteTodo: (id: string) => void
}

export default function CompletedTodos({todo,toggleDone,deleteTodo}:CompletedTodosProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <button className="flex flex-row items-center gap-2">
          <MdKeyboardArrowUp className="size-6 text-black rotate-180" />
          <span>Completed</span>
        </button>
      </Collapsible.Trigger>
      <Collapsible.CollapsibleContent>
      <div className="relative max-h-[calc(100vh-350px)] overflow-y-auto lg:max-h-[calc(100vh-300px)]">
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
                <span className="text-neutral mt-20 block text-center text-lg">
                  No tasks yet. Add one to get started!
                </span>
              )}
            </div>
      </Collapsible.CollapsibleContent>
    </Collapsible.Root>
  );
}
