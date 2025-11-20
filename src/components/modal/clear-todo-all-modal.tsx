import * as Dialog from "@radix-ui/react-dialog";
import DialogXClose from "./dialog-x-close";
import SubmitButton from "../submit-button";
import useDBMutation from "@/hooks/useDBMutation";
import type { todoAll } from "@/types/todo-type";
import { useState } from "react";

interface ClearAllModalProps {
  todo: todoAll[]|undefined;
}

export default function ClearAllModal({ todo }: ClearAllModalProps) {
  const {clearCompleted}= useDBMutation();
  const [open,setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="text-neutral cursor-pointer text-sm transition hover:text-black">
          Clear All
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow dialog-overlay">
          <Dialog.Content className="data-[state=open]:animate-contentShow dialog-content">
            <Dialog.Title className="dialog-tittle">
              Clear Completed Tasks?
            </Dialog.Title>
            <div className="flex flex-col gap-8">
              <p>
                {`This will permanently delete ${todo?.length} completed tasks. This action
                cannot be undone`}
              </p>
              <div className="flex justify-end gap-4">
                <Dialog.Close asChild>
                  <button className="rounded-lg border border-neutral-100 px-4 py-2">
                    Cancel
                  </button>
                </Dialog.Close>
                <SubmitButton
                  className="px-4 text-sm font-medium"
                  onClick={()=>{clearCompleted(); setOpen(false)}}
                >
                  Clear
                </SubmitButton>
              </div>
            </div>
            <DialogXClose />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
