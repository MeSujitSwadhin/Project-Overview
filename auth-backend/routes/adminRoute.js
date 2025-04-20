import express from 'express'
import registerAdmin, { loginAdmin, getMyProfile, signout } from '../controllers/adminControllers.js'
import auth from '../middlewares/auth.js';
const router = express.Router();


router.route("/signup").post(registerAdmin)
router.route("/signin").post(loginAdmin)
router.route("/user").get(auth, getMyProfile);
router.route("/signout").post(auth, signout)

export default router