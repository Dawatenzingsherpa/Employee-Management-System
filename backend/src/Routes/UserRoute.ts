import express, { Router } from "express";
import UserController from "../Controller/UserController";

const router: Router = express.Router();

router.route("/register").post(UserController.registerUser);
router.route("/login").post(UserController.loginUser);
export default router;
