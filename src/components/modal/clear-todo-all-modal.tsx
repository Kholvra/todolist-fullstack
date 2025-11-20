import * as Dialog from "@radix-ui/react-dialog";
import DialogXClose from "./dialog-x-close";

export default function ClearAllModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-sm text-neutral hover:text-black transition cursor-pointer">Clear All</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow dialog-overlay">
          <Dialog.Content className="data-[state=open]:animate-contentShow dialog-content">
            <Dialog.Title className="dialog-tittle">Clear Completed Tasks?</Dialog.Title>
            <p>This will permanently delete 3 completed tasks. This action cannot be undone</p>
            <DialogXClose/>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
