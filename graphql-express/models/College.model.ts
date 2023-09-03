import mongoose, { InferSchemaType, Schema } from "mongoose";
import StudentModel from "./Student.model";

const schema = new Schema({
  name: { type: String, required: true },

  // majors, minors
});

export type College = InferSchemaType<typeof schema>;

export default mongoose.model("College", schema);
