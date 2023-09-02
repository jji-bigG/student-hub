import mongoose, { InferSchemaType, Schema } from "mongoose";

// https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
const validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const schema = new Schema({
  name: { type: String, required: true },
  email: {
    // https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  gender: String,

  student: { type: String, required: true },
});

export type User = InferSchemaType<typeof schema>;

export default mongoose.model("User", schema);
