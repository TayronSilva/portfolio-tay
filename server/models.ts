import mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
  openId: string;
  name?: string;
  email?: string;
  loginMethod?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
}

const UserSchema: Schema = new Schema(
  {
    openId: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String },
    loginMethod: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user", required: true },
    lastSignedIn: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

const ContactSubmissionSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const ContactSubmission = 
  mongoose.models.ContactSubmission || 
  mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);
