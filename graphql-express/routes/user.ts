import { Router } from "express";
import { RequestHandler } from "express-serve-static-core";
import UserSchema from "../models/User.model";

const router = Router();

// this ParamsDictory (the type argument into RequestHandler)
// is to define what is in the req.params
const authenticate: RequestHandler<{
  email: string;
  username?: string;
  password: string;
}> = (req, res, next) => {
  // now implement the authencation using passport and its jwt strategy
  // https://heynojde.com/tutorial/authenticate-users-node-expressjs-and-passportjs/
  // has a lot of neat libraries that can be chugged together easily with passport
};

export const isAuthenticated: RequestHandler<{}> = (req, res, next) => {};

router
  .route("/")
  .get(isAuthenticated, (req, res) => {
    // return the current user object if authenticated
  })
  .post(async (req, res, next) => {
    // create a new user instance from registration
    // make sure to call the auth/ route, aka chug that middleware
    const data = req.body;
    console.log(data);

    try {
      const user = await UserSchema.create(data);
      req.params = {
        email: user.email,
        username: user.username,
        password: user.password,
      };
      next();
    } catch (error) {
      res.sendStatus(500);
    }
  }, authenticate)
  .put(isAuthenticated, (req, res) => {
    // requesting to update the user instance that is logged in
  });

router.post("/auth", authenticate);

export default router;
