import { storage } from "@/lib/appwrite/appwrite";

// Defining an async function that takes an image object and returns its URL
const getUrl = async (image: Image) => {
  // Use the storage.getFilePreview method to get the URL of the image file with the given bucket id and file id
  const url = storage.getFilePreview(image.bucketId, image.fileId);
  // Return the URL
  return url;
};

export default getUrl;
