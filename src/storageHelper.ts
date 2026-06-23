import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Uploads a file to Firebase Storage and returns the public download URL.
 * @param file The File object from an input element
 * @param folder The folder path in storage (e.g. "services")
 * @returns The download URL string
 */
export async function uploadFileToStorage(file: File, folder: string): Promise<string> {
  if (!file) throw new Error("No file provided");
  
  // Create a unique filename to prevent overwrites
  const uniqueName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
  const storageRef = ref(storage, `${folder}/${uniqueName}`);
  
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Storage Upload Error:", error);
    throw error;
  }
}
