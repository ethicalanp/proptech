/**
 * Helper function to upload an image to Cloudinary using an unsigned preset.
 * 
 * @param file The image File object from an input type="file"
 * @returns The secure URL of the uploaded image
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  const CLOUD_NAME = "defrohr5n";
  const UPLOAD_PRESET = "krh7lvvc";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}
