import mongoose, { InferSchemaType, Schema } from "mongoose";
import UserSchema from "./User.model";
import CollegeSchema from "./College.model";

const schema = new Schema({
  users: [{ type: UserSchema }],

  name: { type: String, required: true },
  colleges: [{ type: CollegeSchema, required: true }],
});

type University = InferSchemaType<typeof schema>;

export default mongoose.model("University", schema);
