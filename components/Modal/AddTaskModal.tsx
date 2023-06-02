"use client";
import { Fragment, useRef, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypeRadioGroup from "../TaskBoard/TaskTypeRadioGroup";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/solid";

// Define a function component that renders a modal for adding a new task
function AddTaskModal() {
  // Define a ref for the image picker input element
  const imagePickerRef = useRef<HTMLInputElement>(null);
  // Destructure the modal open status and close function from the useModalStore hook
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  // Destructure the new task input, image, and add task function from the useBoardStore hook
  const [newTaskInput, setNewTaskInput, image, setImage, addTask, newTaskType] =
    useBoardStore((state) => [
      state.newTaskInput,
      state.setNewTaskInput,
      state.image,
      state.setImage,
      state.addTask,
      state.newTaskType,
    ]);

  // Define a function that handles the form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Prevent the default browser behavior
    e.preventDefault();
    // If the new task input is empty, return early
    if (!newTaskInput) return;

    // Add the new task to the server and the board state with the given input, type, and image
    addTask(newTaskInput, newTaskType, image);
    // Reset the image state to null
    setImage(null);
    // Close the modal
    closeModal();
  };

  return (
    // Use the Transition component at the root level to animate the modal appearance and disappearance
    <Transition appear show={isOpen} as={Fragment}>
      {/* Use the Dialog component to render a modal dialog with the given props */}
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        className="relative z-10"
        onClose={closeModal}
      >
        {/* Use the Transition.Child component to animate the modal backdrop
        opacity */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* Render a div element that covers the entire screen with a
          semi-transparent background */}
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        {/* Render a div element that centers the modal content vertically and
        horizontally */}
        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            {/* Use the Transition.Child component to animate the modal panel
            transform and opacity */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* Render a Dialog.Panel element that contains the modal content
              and styles */}
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-900 dark:bg-neutral-300 p-6 text-left align-middle shadow-xl transition-all">
                {/* Render a Dialog.Title element that contains the modal title
                and styles */}
                <Dialog.Title
                  as="h3"
                  className="text-lg font-satoshiBold text-neutral-300 leading-6 dark:text-gray-900 pb-2"
                >
                  Add a Task
                </Dialog.Title>
                {/* Render a div element that contains an input element for
                entering a new task title */}
                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a task here.."
                    className="w-full border border-gray-300 bg-slate-700 dark:bg-neutral-200 text-white dark:text-black rounded-md outline-none p-5"
                  />
                </div>
                {/* Render a custom component that contains radio buttons for
                selecting a new task type */}
                <TaskTypeRadioGroup />
                {/* Render a div element that contains a button for uploading an
                image for the new task and an image preview if there is an image
                selected */}
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      // Trigger a click event on the hidden image picker input element when the button is clicked
                      imagePickerRef.current?.click();
                    }}
                    className="w-full border border-gray-300 dark:border-blue-900 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    {/* Render an icon component and a span element for the
                    button content and styles */}
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block text-neutral-200 dark:text-slate-900" />
                    <span className="text-neutral-200 dark:text-black">
                      Upload Image
                    </span>
                  </button>
                  {image && (
                    // If there is an image selected, render an image component with the given props and styles
                    <Image
                      alt="Uploaded_image"
                      width={200}
                      height={200}
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                      src={URL.createObjectURL(image)}
                      onClick={() => {
                        // Reset the image state to null when the image preview is clicked
                        setImage(null);
                      }}
                    />
                  )}
                  {/* Render an input element of type file that is hidden from
                  view but can be triggered by clicking on the button above */}
                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                      // If there is a file selected and it is an image file, update the image state with it
                      if (!e.target.files![0].type.startsWith("image/")) return;
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>
                {/* Render a div element that contains a button for submitting
                the form and adding the new task */}
                <div className="mt-4 ">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus:visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AddTaskModal;
