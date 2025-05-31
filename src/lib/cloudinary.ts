import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true, // Always use HTTPS
});

/**
 * Uploads a file buffer to Cloudinary
 * @param buffer The file buffer to upload
 * @param folder The folder to store the image in (default: "2fResources")
 * @returns Promise with the secure URL of the uploaded image
 */
export async function uploadImageToCloudinary(
  buffer: Buffer,
  folder: string = process.env.CLOUDINARY_CLOUD_FOLDER!
): Promise<{ url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else if (result) {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Deletes an image from Cloudinary
 * @param publicId The public ID of the image to delete
 * @returns Promise with the deletion result
 */
export async function deleteImageFromCloudinary(
  publicId: string
): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary deletion error:", err);
    throw err;
  }
}

/**
 * Gets all images from a specific Cloudinary folder
 * @param folder The folder to retrieve images from (default: "2fResources/asset")
 * @returns Promise with array of image resources
 */
// export async function getImagesFromCloudinary(
//   folder: string = "2fResources/asset"
// ): Promise<CloudinaryImageResource[]> {
//   try {
//     const result = await cloudinary.search
//       .expression(`folder=${folder}`)
//       .execute();

//     return result.resources.map((resource: any) => ({
//       public_id: resource.public_id,
//       url: resource.secure_url,
//       width: resource.width,
//       height: resource.height,
//       format: resource.format,
//       created_at: resource.created_at,
//       folder: resource.folder,
//     }));
//   } catch (err) {
//     console.error("Cloudinary retrieval error:", err);
//     throw err;
//   }
// }
