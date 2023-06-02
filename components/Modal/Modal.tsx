"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

// Defining an interface for the modal props
interface ModalProps {
  // An optional prop that indicates whether the modal is open or not
  isOpen?: boolean;
  // A required prop that defines a function to close the modal
  onClose: () => void;
  // A required prop that defines the children elements to render inside the modal
  children: React.ReactNode;
}

// Defining a function component that renders a modal with the given props
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Use the Transition.Root component at the root level to animate the
      modal appearance and disappearance */}
      <Transition.Root show={isOpen} as={Fragment}>
        {/* Use the Dialog component to render a modal dialog with the given props */}
        <Dialog as="div" className="relative z-50" onClose={onClose}>
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* Render a div element that centers the modal content vertically and
        horizontally */}
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              {/* Use the Transition.Child component to animate the modal panel
            transform and opacity */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                {/* Render a Dialog.Panel element that contains the modal content
              and styles */}
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  {/* Render a div element that contains a close button at the top
                right corner of the modal panel */}
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block z-10">
                    <button
                      type="button"
                      className="rounded-md bg-white dark:bg-slate-700 text-gray-400 dark:text-neutral-300 hover:text-gray-500 dark:hover:text-neutral-200"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      {/* Render an X icon component with the given size and styles */}
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  {/* Render the children elements passed as props inside the modal
                panel */}
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Modal;
