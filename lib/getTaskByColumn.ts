import { databases } from "@/lib/appwrite/appwrite";

// An asynchronous function named getTaskByColumn
export const getTaskByColumn = async () => {
  // Using the listDocuments method of the databases object to retrieve data
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );
  // console.log(data);

  // Storing the documents property of the data object in a variable named todos
  const todos = data.documents;

  // Reducing the todos array into a Map object with keys as todo status and values as objects with id and todos properties
  const columns = todos.reduce((acc, todo) => {
    // Checking if the accumulator Map object does not have a key with the current todo status
    if (!acc.get(todo.status)) {
      // Setting a new key-value pair in the accumulator Map object with key as todo status and value as an object with id and todos properties
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    // Pushing the current todo object into the todos array of the value object corresponding to the current todo status key in the accumulator Map object
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,

      // Using a spread operator to conditionally add an image property to the current todo object if it exists
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    // Returning the updated accumulator Map object
    return acc;
  }, new Map<TypedColumn, Column>());

  // console.log(columns);

  //if columns do not have a tag, add them with empty todos.
  // Defining an array of column types
  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];

  // Looping through each column type
  for (const columnType of columnTypes) {
    // Checking if the columns Map object does not have a key with the current column type
    if (!columns.get(columnType)) {
      // Setting a new key-value pair in the columns Map object with key as column type and value as an object with id and todos properties
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  // Creating a new sorted Map object by sorting the entries of the columns Map object based on their index in the columnTypes array
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  // Defining a board object with a columns property set to the sortedColumns Map object
  const board: Board = {
    columns: sortedColumns,
  };

  // Returning the board object
  return board;
};

// This code exports an asynchronous function named getTaskByColumn that retrieves data from a database using the listDocuments method of the databases object imported from “@/lib/appwrite/appwrite”.
// The data is then processed to group the todos by their status and create a Map object with keys as todo status and values as objects with id and todos properties.
// The code also checks if all column types (“todo”, “inprogress”, “done”) are present in the columns Map object and adds any missing column types with empty todos.
// Finally, the columns Map object is sorted based on the order of column types in the columnTypes array and a board object is created with a columns property set to the sorted columns Map object. The board object is then returned by the function.
