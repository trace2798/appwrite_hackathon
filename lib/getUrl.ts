import { storage } from "@/lib/appwrite/appwrite";

// Define a function called getUrl that takes in an image object as a parameter
const getUrl = async (image: Image) => {
  // Use the getFilePreview method of the storage object to get the URL of the image
  const url = storage.getFilePreview(image.bucketId, image.fileId);
  // Return the URL
  return url;
};

export default getUrl;

// This code defines a function called getUrl that takes in an image object as a parameter. 
// The function uses the getFilePreview method of the storage object to get the URL of the image. The URL is then returned by the function. The getUrl function is exported as the default export of the module.
