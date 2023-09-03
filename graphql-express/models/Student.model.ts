import mongoose, { InferSchemaType, Schema } from "mongoose";
import UserSchema from "./User.model";
import UniversitySchema from "./University.model";
import CollegeSchema from "./College.model";

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
