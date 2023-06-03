"use client";
import React, { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/Button";
import { EditIcon } from "lucide-react";
import { useBoardStore } from "@/store/BoardStore";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/solid";

interface EditTaskModalProps {
  isOpen?: boolean;
  onClose: () => void;
  todo: Todo;
  index: number;
  id: TypedColumn;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  todo,
  index,
  id,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newImage, setNewImage] = useState<File | null>(null);
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const editTask = useBoardStore((state) => state.editTask);
  const handleEdit = () => {
    editTask(index, todo, id, newTitle, undefined, newImage);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <EditIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
          </div>
          <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-base font-satoshiBold leading-6 text-gray-900 dark:text-neutral-300"
            >
              Edit Task
            </Dialog.Title>
          </div>
        </div>
        <div>
          <div className="mt-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter a new task title.."
              className="w-full border border-gray-300 bg-neutral-400 dark:bg-neutral-200 text-white dark:text-black rounded-md outline-none p-5 mt-5"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              imagePickerRef.current?.click();
            }}
            className="w-full mt-5 border border-gray-300 dark:border-blue-900 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <PhotoIcon className="h-6 w-6 mr-2 inline-block  text-slate-900 dark:text-neutral-200" />
            <span className="text-slate-900 dark:text-neutral-200">
              Change Image
            </span>
          </button>
          {newImage && (
            <Image
              alt="Uploaded_image"
              width={200}
              height={200}
              className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
              src={URL.createObjectURL(newImage)}
              onClick={() => {
                setNewImage(null);
              }}
            />
          )}
          <input
            type="file"
            ref={imagePickerRef}
            hidden
            onChange={(e) => {
              if (!e.target.files![0].type.startsWith("image/")) return;
              setNewImage(e.target.files![0]);
            }}
          />
        </div>

        <div className="mt-5 sm:mt-4 flex justify-evenly">
          <Button
            disabled={isLoading}
            variant="default"
            onClick={handleEdit}
          >
            Update
          </Button>
          <Button disabled={isLoading} variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EditTaskModal;
