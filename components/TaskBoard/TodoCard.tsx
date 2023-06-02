"use client";
import getUrl from "@/lib/getUrl";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import ConfirmTaskModal from "../Modal/ConfirmTaskModal";

interface TodoCardProps {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

// A function component that renders a todo card
function TodoCard({
  // Destructure the props of type TodoCardProps
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: TodoCardProps) {
  // Define a state variable for the image URL of the todo
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  // Define a state variable for the confirmation modal open status
  const [confirmOpen, setConfirmOpen] = useState(false);
  // Define an effect hook that runs once when the component mounts
  useEffect(() => {
    // If the todo has an image, fetch its URL from the server
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          // Update the image URL state with the fetched URL
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);
  return (
    <>
      {/* Render a confirmation modal component with the given props */}
      <ConfirmTaskModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        todo={todo}
        index={index}
        id={id}
      />
     {/* Render a div element that contains the todo card content and styles */}
      <div
        className="bg-neutral-300 rounded-md space-y-2 drop-shadow-md border-l-4 border-black"
        // Spread the draggable props to enable drag and drop functionality
        {...draggableProps}
        {...dragHandleProps}
        // Assign the inner ref to the div element
        ref={innerRef}
      >
        {/* Render a div element that contains the todo title and a delete button */}
        <div className="flex justify-between items-center p-5 text-slate-900 font-ranadeRegular">
          <p>{todo.title}</p>
          <div className="flex justify-center gap-10 my-8">
            <div
              // Set an onClick handler that opens the confirmation modal
              onClick={() => setConfirmOpen(true)}
              className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
            >
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                {/* Render a trash icon component with the given size */}
                <TrashIcon size={20} />
              </div>
            </div>
          </div>
        </div>
        {/* If there is an image URL, render an image component with the given
        props and styles */}
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
