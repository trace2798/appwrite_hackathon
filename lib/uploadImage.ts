import { ID, storage } from "@/lib/appwrite/appwrite";

const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    "647432b6c6ef02a3ec10",
    ID.unique(),
    file
  );
  return fileUploaded;
};

export default uploadImage;
