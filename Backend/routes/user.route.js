import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js" // jyare koi name thi export kariye tyare curly brace ma thay {}
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();
// POST request data sumbit mate vapray che
router.route("/register").post(singleUpload,register); // register koi pn kari sake etle Authenticated che ke nai ee check karvani jarur nathi
router.route("/login").post(login);// ama aapde andar j authenticate che ke nai e check karyu che
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);// ahiya andar authenticate che ke nai e check nathi karyu etle ahiya isAuthenticate vadu check mukyo che
// uper vada ma pehla check thase ke user authenticated che ke nai , agar hase to j profile update kari sakse

export default router;

