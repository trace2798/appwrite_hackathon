import { ID, storage } from "@/lib/appwrite/appwrite";

// An async function that uploads an image file to the storage server and returns its metadata
const uploadImage = async (file: File) => {
  // If there is no file, return early
  if (!file) return;
  // Create a new file on the storage server with the given bucket id, unique id, and file object
  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_IMAGE_BUCKET_ID!,
    ID.unique(),
    file
  );
  // Return the file metadata
  return fileUploaded;
};

export default uploadImage;
