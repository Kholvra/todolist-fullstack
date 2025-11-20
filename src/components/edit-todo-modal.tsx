"use client";

import useDBMutation from "@/hooks/useDBMutation";
import type { todoAll } from "@/types/todo-type";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import SubmitButton from "./submit-button";
import { GoPencil } from "react-icons/go";

interface EditTodoModalProps {
  todo: todoAll;
}

export default function EditTodoModal({ todo }: EditTodoModalProps) {
  const [open, setOpen] = useState(false);
  const [newText, setNewText] = useState<string>("");
  const { editMutation } = useDBMutation();
  const { id } = todo;
  
  function submitHandler() {
    const { status, mutate } = editMutation(id, newText);
    if (status) {
      setNewText("")
      mutate();
      setOpen(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="hover:bg-neutral-100 mx-2 cursor-pointer rounded-lg p-2 transition duration-100"><GoPencil/></button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[var(--shadow-6)] focus:outline-none">
          <Dialog.Title className="font-semibold text-xl">Edit Task</Dialog.Title>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
            className="flex flex-col gap-8"
          >
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => setNewText(e.target.value)}
              className="mt-5 grow rounded-lg border border-neutral-400/30 px-4 py-2 shadow-xs transition duration-500 ease-in-out focus:ring-2 focus:ring-neutral-400/50 focus:outline-none"
            />
            <div className="flex gap-5 self-end">
              <Dialog.Close asChild>
                <button className="rounded-lg border border-neutral-400/30 py-2 px-4 text-sm font-medium cursor-pointer">Cancel</button>
              </Dialog.Close>
              <SubmitButton inputField={newText} className="px-4 text-sm font-medium">Save</SubmitButton>
            </div>
          </form>
          <Dialog.Close asChild>
            <button className="absolute top-5 right-5 cursor-pointer">
              <IoCloseOutline className="size-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
