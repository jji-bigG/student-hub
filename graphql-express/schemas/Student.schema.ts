import mongoose, { InferSchemaType, Schema } from "mongoose";
import UserSchema from "./User.schema";
import UniversitySchema from "./University.schema";
import CollegeSchema from "./College.schema";

const schema = new Schema({
  user: { type: UserSchema },

  preferedName: String,
  studentID: String,

  friends: [UserSchema],

  university: { type: UniversitySchema, required: true },
  college: { type: CollegeSchema, required: true },
});

type Student = InferSchemaType<typeof schema>;

export default mongoose.model("Student", schema);
