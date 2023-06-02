import { Client, Account, ID, Databases, Storage } from "appwrite";

// Create a new instance of the Client class
const client = new Client();
// Configure the client instance with the endpoint and project id from the environment variables
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// Create a new instance of the Account class with the client instance as an argument
const account = new Account(client);
// Create a new instance of the Databases class with the client instance as an argument
const databases = new Databases(client);
// Create a new instance of the Storage class with the client instance as an argument
const storage = new Storage(client);

// Export the client, account, databases, storage, and ID modules as named exports
export { client, databases, storage, account, ID };
