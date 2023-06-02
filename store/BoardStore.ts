import { ID, databases, storage } from "@/lib/appwrite/appwrite";
import { getTodosGroupByColumn } from "@/lib/getTodosGroupByColumn";
import uploadImage from "@/lib/uploadImage";
import { create } from "zustand";

// Define an interface for the board state
interface BoardState {
  // A property that holds the board object
  board: Board;
  // A function that fetches the board data from the server
  getBoard: () => void;
  // A function that updates the board state with a new board object
  setBoardState: (board: Board) => void;
  // A function that updates a todo item in the database and on the board
  updateTodoInDb: (todo: Todo, columnId: TypedColumn) => void;
  // A property that holds the input value for a new task
  newTaskInput: string;
  // A property that holds the selected column id for a new task
  newTaskType: TypedColumn;
  // A property that holds the search string for filtering tasks
  searchString: string;
  // A function that updates the search string state
  setSearchString: (searchString: string) => void;

  // A function that deletes a task from the database and the board
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;

  // A function that updates the input value for a new task
  setNewTaskInput: (input: string) => void;
  // A function that updates the selected column id for a new task
  setNewTaskType: (columnId: TypedColumn) => void;
  // A property that holds the image file for a new task
  image: File | null;
  // A function that updates the image file for a new task
  setImage: (image: File | null) => void;
  // A function that adds a new task to the database and the board
  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
}

// Export a custom hook that returns an object of type BoardState
// The function uses the create hook from Zustand to create a state store.
export const useBoardStore = create<BoardState>((set, get) => ({
  // Initialize the board state with an empty map of columns
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  // Initialize the search string state with an empty string
  searchString: "",
  // Initialize the new task input state with an empty string
  newTaskInput: "",
  // Initialize the new task type state with "todo" as the default column id
  newTaskType: "todo",
  // Initialize the image state with null as the default value
  image: null,
  // Define a function that updates the search string state with a given value
  setSearchString: (searchString) => set({ searchString }),
  // Define an async function that fetches the board data from the server and updates the board state
  getBoard: async () => {
    const board = await getTodosGroupByColumn();
    set({ board });
  },
  // Define a function that updates the board state with a given board object
  setBoardState: (board) => set({ board }),

  // Define an async function that deletes a task from the server and the board state
  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    // Create a new map of columns by copying the current board state
    const newColumns = new Map(get().board.columns);

    // Remove the task from the corresponding column in the new map
    newColumns.get(id)?.todos.splice(taskIndex, 1);

    // Update the board state with the new map of columns
    set({ board: { columns: newColumns } });

    // If the task has an image, delete it from the storage server
    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    // Delete the task document from the database server
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  // Define a function that updates the new task input state with a given value
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  // Define a function that updates the new task type state with a given column id
  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),
  // Define a function that updates the image state with a given file or null value
  setImage: (image: File | null) => set({ image }),
  // Define an async function that updates a todo item on the server and the board state
  updateTodoInDb: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },

  // Define an async function that adds a new task to the server and the board state
  addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
    let file: Image | undefined;

    // If there is an image file, upload it to the storage server and get its metadata
    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    // Create a new task document on the database server and get its id and creation date
    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    // Reset the new task input state to an empty string
    set({ newTaskInput: "" });

    // Update the board state by adding the new task to the corresponding column in a new map of columns
    set((state) => {
      const newColumns = new Map(state.board.columns);

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      };

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
}));
