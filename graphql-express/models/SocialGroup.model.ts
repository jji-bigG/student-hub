/**
 * a group can be any form of human organization
 * examples: study groups, clubs, fraternities, activities, townhouses, roommates...
 * this is a base model that can be extended for specific use cases as above
 */

import { InferSchemaType, Schema, model } from "mongoose";
import UserModel from "./User.model";

const schema = new Schema(
  {
    name: String,
    members: [UserModel],

    // messaging features
    announcements: [String],
  },
  {
    timestamps: true,
  }
);

export type SocialGroup = InferSchemaType<typeof schema>;

export default model("Social Group", schema);
