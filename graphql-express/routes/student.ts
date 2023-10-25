import { Router } from "express";
import { isAuthenticated } from "./user";
import StudentModel from "../models/Student.model";

const router = Router();

router.use(isAuthenticated);

router.post("/", (req, res) => {
  const data = req.body;

  //   StudentModel.create(data);
});

export default router;
