import express from "express"
import { MembersController } from "../controllers/memberController"
import { authenticate, authorizeRoles } from "../middleware/auth"
import { MemberType } from "../models" 

const router: express.Router = express.Router()

router.post("/onboard", authenticate, MembersController.createInitialMember)
router.use(authenticate)

// Get all members for the authenticated user (Admin can see all, Member only their own)
router.get("/", MembersController.getMembersByUser)
router.post("/", authorizeRoles(MemberType.Admin),MembersController.createMember)
router.put("/:memberId",MembersController.updateMember)
router.delete("/:memberId", authorizeRoles(MemberType.Admin), MembersController.deleteMember)

export default router
