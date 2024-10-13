import { Router } from "express";
import {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logoutGet
} from "../controllers/authController.js";
const router = Router();

router.get("/signup", signupGet);
router.post("/signup", signupPost);
router.get("/login", loginGet);
router.post("/login", loginPost);
router.get("/logout", logoutGet)

export default router;
