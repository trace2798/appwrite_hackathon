"use client";
import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import ConfirmTaskModal from "./ConfirmTaskModal";

interface TodoCardProps {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: TodoCardProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [confirmOpen, setConfirmOpen] = useState(false);
  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);
  return (
    <>
      <ConfirmTaskModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        todo={todo}
        index={index}
        id={id}
      />
      <div
        className="bg-neutral-300 rounded-md space-y-2 drop-shadow-md border-l-4 border-black"
        {...draggableProps}
        {...dragHandleProps}
        ref={innerRef}
      >
        <div className="flex justify-between items-center p-5 text-slate-900 font-ranadeRegular">
          <p>{todo.title}</p>
          <div className="flex justify-center gap-10 my-8">
            <div
              onClick={() => setConfirmOpen(true)}
              className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
            >
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                <TrashIcon size={20} />
              </div>
            </div>
          </div>
        </div>
        {imageUrl && (
          <div className=" h-full w-full rounded-b-md">
            <Image
              src={imageUrl}
              alt="Task_image"
              width={400}
              height={200}
              className="w-full object-contain rounded-b-md"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default TodoCard;
