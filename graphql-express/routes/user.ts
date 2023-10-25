import { Request, Router } from "express";
import { RequestHandler } from "express-serve-static-core";
import passport, { AuthenticateCallback } from "passport";
import jwt from "express-jwt";
import UserModel from "../models/User.model";

const router = Router();

export const isAuthenticated: RequestHandler<{}> = (req, res, next) => {
  console.log(req.user);

  if (req.user) next();
  else res.json({ authenticated: false, user: req.user });
};

export const authenticate = passport.authenticate("local", {
  successMessage: "Successful",
  failureMessage: "Cannot authenticate",
  successRedirect: "/",
  failureRedirect: "/singin",
  failureFlash: true,
});

router
  .route("/")
  .get(isAuthenticated, (req, res) => {
    // return the current user object if authenticated
    res.json({ authenticated: true });
  })
  .post(async (req, res) => {
    // create a new user instance from registration
    // make sure to call the auth/ route, aka chug that middleware
    const data = req.body;
    console.log(data);

    try {
      UserModel.register(data, data.password);

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
