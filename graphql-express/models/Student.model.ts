import mongoose, { InferSchemaType, Schema } from "mongoose";
import UserSchema, { User } from "./User.model";
import UniversitySchema, { University } from "./University.model";
import CollegeSchema, { College } from "./College.model";
import { Dorm } from "./Dorm.model";

export interface Student {
  user: User;

  preferedName: string;
  studentID: string;

  friends: [User];
  university: University;
  college: College;
  dorm: Dorm;
}

const schema = new Schema<Student>({
  user: { type: UserSchema, required: true },

  preferedName: String,
  studentID: { type: String, required: true },

  friends: [UserSchema],

  university: { type: UniversitySchema, required: true },
  college: { type: CollegeSchema, required: true },
  // dorm: {}
});

export default mongoose.model("Student", schema);
