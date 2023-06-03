import { ID, storage } from "@/lib/appwrite/appwrite";

// Define a function called uploadImage that takes in a file object as a parameter
const uploadImage = async (file: File) => {
  // Check if the file is provided
  if (!file) return;

  // Use the createFile method of the storage object to upload the file
  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_IMAGE_BUCKET_ID!,
    ID.unique(),
    file
  );
  // Return the uploaded file
  return fileUploaded;
};

export default uploadImage;

// This code defines a function called uploadImage that takes in a file object as a parameter. The function checks if the file is provided and, if so, uses the createFile method of the storage object to upload the file. The uploaded file is then returned by the function. The uploadImage function is exported as the default export of the module.
