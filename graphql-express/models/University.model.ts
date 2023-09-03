import mongoose, { InferSchemaType, Schema } from "mongoose";
import UserSchema from "./User.model";
import CollegeSchema from "./College.model";

const schema = new Schema({
  name: { type: String, required: true },
  colleges: [{ type: CollegeSchema, required: true }],
});

export type University = InferSchemaType<typeof schema>;

export default mongoose.model("University", schema);
