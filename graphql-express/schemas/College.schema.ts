import mongoose, { InferSchemaType, Schema } from "mongoose";
import UserSchema from "./User.schema";

const schema = new Schema({
  user: { type: UserSchema },
});

type College = InferSchemaType<typeof schema>;

export default mongoose.model("College", schema);
