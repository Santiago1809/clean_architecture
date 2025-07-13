import { MONGO_DB_NAME } from "@/config/envs";
import type { MongoOptions } from "@/types";
import mongoose from "mongoose";

export class MongoDatabase {
  static async connect(options: MongoOptions) {
    const { mongoUrl, dbName } = options;
    try {
      mongoose
        .connect(mongoUrl, {
          dbName,
        })
        .then(() => {
          console.log(`Connected to MongoDB at ${mongoUrl}/${MONGO_DB_NAME} 🚀`);
        });
    } catch (error) {
      console.log("Error connecting to MongoDB:", error);
      throw error;
    }
  }
}
