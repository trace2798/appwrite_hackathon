import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const Column = ({ id, todos, index }: Props) => {
  const [setNewTaskType] = useBoardStore((state) => [state.setNewTaskType]);

  const openModal = useModalStore((state) => state.openModal);

  const handleAddTodo = () => {
    setNewTaskType(id);
    openModal();
  };
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Droppable droppableId={index.toString()} type="card">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`my-6 rounded-md border border-l-4 p-4 border-slate-900 dark:border-neutral-100 ${
                    snapshot.isDraggingOver
                      ? "dark:bg-neutral-300/90 bg-slate-600/50"
                      : "dark:bg-neutral-300/50 bg-slate-900/50"
                  }`}
                >
                  <h2 className="flex justify-between font-satoshiBold text-slate-900 dark:text-neutral-100 text-xl p-2">
                    {idToColumnText[id]}
                    <span className="text-neutral-200 bg-gray-900 dark:text-slate-800 dark:bg-neutral-200 border border-slate-900 rounded-md px-2 py-1 text-sm font-ranadeRegular">
                      {todos.length}
                    </span>
                  </h2>
                  <div className="space-y-2">
                    {todos.map((todo, index) => {
                      return (
                        <>
                          <Draggable
                            key={todo.$id}
                            draggableId={todo.$id}
                            index={index}
                          >
                            {(provided) => (
                              <TodoCard
                                todo={todo}
                                index={index}
                                id={id}
                                innerRef={provided.innerRef}
                                draggableProps={provided.draggableProps}
                                dragHandleProps={provided.dragHandleProps}
                              />
                            )}
                          </Draggable>
                        </>
                      );
                    })}
                    {provided.placeholder}
                    <div className="flex items-end justify-end p-2">
                      <button
                        onClick={handleAddTodo}
                        className="text-neutral-300 dark:text-neutral-100 hover:text-neutral-100"
                      >
                        <PlusCircleIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Column;
