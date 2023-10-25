import mongoose, { InferSchemaType, Schema } from "mongoose";

// import bcrypt from "bcrypt";

import passportLocalMongoose from "passport-local-mongoose";

// https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
const validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
  }
);

// depricated for using passport-local-mongoose (two blocks below)
// schema.pre("save", function (next): void {
//   const user = this;
//   if (user.isModified("password")) {
//     bcrypt.genSalt(7, function (err, salt) {
//       if (!err)
//         bcrypt.hash(user.password, salt, function (err, hash): void {
//           if (err) next(err);
//           else user.password = hash;
//         });
//       else next(err);
//     });
//   }
//   next();
// });

// schema.methods.comparePassword = function (
//   candidatePassword: string,
//   cb: (err: Error | null, isMatch?: boolean) => {}
// ) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

schema.plugin(passportLocalMongoose);

export type User = InferSchemaType<typeof schema>;

export default mongoose.model("User", schema);
