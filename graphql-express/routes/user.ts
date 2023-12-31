import { Request, Router } from "express";
import { RequestHandler } from "express-serve-static-core";
import passport, { AuthenticateCallback } from "passport";
import jwt from "express-jwt";
import UserModel from "../models/User.model";

const router = Router();

export const isAuthenticated: RequestHandler<{}> = (req, res, next) => {
  if (req.user) next();
  else res.json({ authenticated: false });
};

export const authenticate = passport.authenticate("local", {
  successMessage: "Successful",
  failureMessage: "Cannot authenticate",
  successRedirect: "/",
  failureRedirect: "/singin",
});

router
  .route("/")
  .get(isAuthenticated, (req, res) => {
    // return the current user object if authenticated
    res.json({ authenticated: true, ...req.user });
  })
  .post(async (req, res) => {
    // create a new user instance from registration
    const data = req.body;
    console.log(data);

    try {
      const resp = await UserModel.register(data, data.password);

      res.sendStatus(200);
    } catch (error) {
      console.log("error in registering user: ", error);
      res.statusMessage = "Cannot create user";
      res.sendStatus(500);
    }
  }, authenticate)
  .put(isAuthenticated, (req, res) => {
    // requesting to update the user instance that is logged in
  });

router.post("/auth", authenticate);

router.get(
  "/isunique",
  async (req: Request<{ email?: string; username?: string }>, res) => {
    // check whether the username or email is unique for an upcoming user registration
    const ret = { unique: true };

    if (req.params.email) {
      const user = await UserModel.findOne({ email: req.params.email }).exec();
      if (user) ret.unique = false;
    }
    if (req.params.username) {
      const user = await UserModel.findOne({
        username: req.params.username,
      }).exec();
      if (user) ret.unique = false;
    }

    res.json(ret);
  }
);

export default router;
