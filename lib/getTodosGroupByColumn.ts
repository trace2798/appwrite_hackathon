import { databases } from "@/lib/appwrite/appwrite";

// Defining an async function that fetches the todos from the database and groups them by column
export const getTodosGroupByColumn = async () => {
  // Use the databases.listDocuments method to get the data from the database server with the given database id and collection id
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );
  // console.log(data);

  // Destructure the documents property from the data object and assign it to a variable named todos
  const todos = data.documents;

  // Use the reduce method to iterate over the todos array and create a map of columns with their corresponding todos
  const columns = todos.reduce((acc, todo) => {
    // If the accumulator map does not have a key for the todo status, create a new entry with an empty array of todos
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    // Push the current todo to the array of todos for its status in the accumulator map
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,

      // If the todo has an image property, parse it as JSON and add it to the todo object
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    // Return the accumulator map for the next iteration
    return acc;
  }, new Map<TypedColumn, Column>());

  // console.log(columns);

  // Define an array of column types as strings
  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];

  // Use a for loop to iterate over the column types array
  for (const columnType of columnTypes) {
    // If the columns map does not have a key for the current column type, create a new entry with an empty array of todos
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  // Use the Array.from method to convert the columns map entries into an array and sort them by their index in the column types array
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  // Create a board object with a columns property that holds the sorted columns map
  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
