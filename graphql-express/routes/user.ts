import { Router } from "express";
import { RequestHandler } from "express-serve-static-core";
import UserSchema from "../models/User.model";
import passport, { AuthenticateCallback } from "passport";
import jwt from "express-jwt";

const router = Router();

// this ParamsDictory (the type argument into RequestHandler)
// is to define what is in the req.params
const authenticate: RequestHandler<{
  username: string;
  password: string;
}> = (req, res, next) => {
  // now implement the authencation using passport and its jwt strategy
  // https://heynojde.com/tutorial/authenticate-users-node-expressjs-and-passportjs/
  // has a lot of neat libraries that can be chugged together easily with passport
  try {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) res.json({ success: false, msg: err });
      if (!user) res.json({ success: false });
      else {
        req.logIn(user, (err) => {
          if (err) console.log(err);
        });

        res.json({ success: true });
      }
    })(req, res);
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Incomplete Parameters" });
  }
};

export const isAuthenticated: RequestHandler<{}> = (req, res, next) => {
  if (req.user) next();
  else res.json({ authenticated: false });
};

router
  .route("/")
  .get(isAuthenticated, (req, res) => {
    // return the current user object if authenticated
  })
  .post(async (req, res) => {
    // create a new user instance from registration
    // make sure to call the auth/ route, aka chug that middleware
    const data = req.body;
    console.log(data);

    try {
      UserSchema.register(data, data.password);

      res.send(200);
    } catch (error) {
      console.log(error);
      res.statusMessage = "Cannot create user";
      res.sendStatus(500).end();
    }
  }, authenticate)
  .put(isAuthenticated, (req, res) => {
    // requesting to update the user instance that is logged in
  });

router.post("/auth", authenticate);

export default router;
