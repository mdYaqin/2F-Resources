// lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadImageToCloudinary(
  filePath: string
): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "2fResources",
    });
    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    throw err;
  }
}
// export default cloudinary;
