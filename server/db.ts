import mongoose from "mongoose";
import { User, ContactSubmission } from "./models";
import { ENV } from './_core/env';

let isConnected = false;
let connectionPromise: Promise<any> | null = null;

export async function getDb() {
  if (isConnected) return mongoose.connection;
  if (connectionPromise) return connectionPromise;

  const dbUrl = process.env.MONGODB_URI || process.env.DATABASE_URL;
  
  if (!dbUrl) {
    console.warn("[Database] MONGODB_URI is not defined in .env");
    return null;
  }

  const sanitizedUrl = dbUrl.replace(/(:)([^@/]+)(@)/, "$1****$3");
  console.log(`[Database] Attempting to connect to: ${sanitizedUrl}`);

  connectionPromise = mongoose.connect(dbUrl, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }).then(() => {
    isConnected = true;
    connectionPromise = null;
    console.log("[Database] Connected successfully to MongoDB Atlas!");
    return mongoose.connection;
  }).catch((error: any) => {
    isConnected = false;
    connectionPromise = null;
    console.error("[Database] CRITICAL: Connection failed!");
    console.error(`[Database] Error Type: ${error.name}`);
    console.error(`[Database] Error Message: ${error.message}`);
    
    // Log detalhado para debug
    if (error.reason) {
      console.error("[Database] Reason:", JSON.stringify(error.reason, null, 2));
    }

    if (error.message.includes("Could not connect to any servers") || error.message.includes("selection timeout")) {
      console.error("[Database] HINT: This is likely an IP Whitelist issue or the cluster is still initializing.");
    }
    
    if (error.message.includes("auth failed") || error.message.includes("Authentication failed")) {
      console.error("[Database] HINT: Double check your username and password in .env");
    }
    
    return null;
  });

  return connectionPromise;
}

export async function upsertUser(userData: any): Promise<void> {
  if (!userData.openId) throw new Error("User openId is required");
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  
  try {
    const update: any = { lastSignedIn: userData.lastSignedIn || new Date() };
    if (userData.name !== undefined) update.name = userData.name;
    if (userData.email !== undefined) update.email = userData.email;
    if (userData.loginMethod !== undefined) update.loginMethod = userData.loginMethod;
    if (userData.role !== undefined) update.role = userData.role;
    else if (userData.openId === ENV.ownerOpenId) update.role = 'admin';

    await User.findOneAndUpdate({ openId: userData.openId }, { $set: update }, { upsert: true });
  } catch (error) {
    console.error("[Database] upsertUser failed:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  return User.findOne({ openId }).lean();
}

export async function insertContactSubmission(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const submission = new ContactSubmission(data);
  return await submission.save();
}
