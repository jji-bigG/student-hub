import { InferSchemaType, Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  //   location
  //   social groups
  // activities (calendar)
});

export type Dorm = InferSchemaType<typeof schema>;

export default model("Dorm", schema);
