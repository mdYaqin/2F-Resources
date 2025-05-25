import { MongoClient, GridFSBucket } from "mongodb";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

const uri = process.env.DATABASE_URL!;

if (!uri) {
  throw new Error(
    "❌ DATABASE_URL is not defined. Make sure .env.development is loaded properly."
  );
}

console.log("Endpoint" + uri);

const client = new MongoClient(uri);
const dbName = "2fResources"; // replace with your actual DB name

export async function uploadFileToGridFS(
  filename: string,
  filepath: string
): Promise<string> {
  await client.connect();
  const db = client.db(dbName);
  const bucket = new GridFSBucket(db);

  const fileStream = fs.createReadStream(filepath);
  const uploadStream = bucket.openUploadStream(filename);

  return new Promise((resolve, reject) => {
    fileStream
      .pipe(uploadStream)
      .on("error", (err) => {
        console.log("Error");
        reject(err);
      })
      .on("finish", () => {
        console.log("Success");
        resolve(uploadStream.id.toString());
      });
  });
}
