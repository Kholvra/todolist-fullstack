import { DialogClose } from "@radix-ui/react-dialog";
import { IoCloseOutline } from "react-icons/io5";

export default function DialogXClose() {
  return (
    <DialogClose asChild>
      <button className="absolute top-5 right-5 cursor-pointer">
        <IoCloseOutline className="size-6" />
      </button>
    </DialogClose>
  );
}
