"use client";

import useDBMutation from "@/hooks/useDBMutation";
import type { todoAll } from "@/types/todo-type";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import SubmitButton from "../submit-button";
import { GoPencil } from "react-icons/go";
import DialogXClose from "./dialog-x-close";

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
      setNewText("");
      mutate();
      setOpen(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="mx-2 cursor-pointer rounded-lg p-2 transition duration-100 hover:bg-neutral-100">
          <GoPencil />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow dialog-overlay" />
        <Dialog.Content className="data-[state=open]:animate-contentShow dialog-content">
          <Dialog.Title className="dialog-tittle">
            Edit Task
          </Dialog.Title>
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
                <button className="cursor-pointer rounded-lg border border-neutral-400/30 px-4 py-2 text-sm font-medium">
                  Cancel
                </button>
              </Dialog.Close>
              <SubmitButton
                inputField={newText}
                className="px-4 text-sm font-medium"
              >
                Save
              </SubmitButton>
            </div>
          </form>
          <DialogXClose />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
