import express from "express"
import { AuthController } from "../controllers/auth.controller" // Import new function

const router: express.Router = express.Router()

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/select-member", AuthController.selectMemberAndGenerateToken) 

export default router
