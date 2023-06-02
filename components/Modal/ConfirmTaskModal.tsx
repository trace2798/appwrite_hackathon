"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/Button";
import { AlertTriangle } from "lucide-react";
import { useBoardStore } from "@/store/BoardStore";

interface ConfirmTaskModalProps {
  isOpen?: boolean;
  onClose: () => void;
  todo: Todo;
  index: number;
  id: TypedColumn;
}

const ConfirmTaskModal: React.FC<ConfirmTaskModalProps> = ({
  isOpen,
  onClose,
  todo,
  index,
  id,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <AlertTriangle
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-gray-900 dark:text-neutral-300"
            >
              Delete Task
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                Are you sure you want to delete this Task? This action cannot be
                undone and the task will be permanently deleted from the
                database.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 flex justify-evenly">
          <Button
            disabled={isLoading}
            variant={"danger"}
            onClick={() => deleteTask(index, todo, id)}
          >
            Delete
          </Button>
          <Button disabled={isLoading} variant={"ghost"} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmTaskModal;
