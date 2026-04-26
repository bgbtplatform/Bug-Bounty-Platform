import express from 'express' 

import {
    addProgram,allPrograms,updateProgram,deleteProgram,getProgramsByCompany, getProgramById
} from "./../controllers/program.controller.js"
import auth from "./../middleware/auth.middleware.js"

const router = express.Router()

router.post("/", auth, addProgram)

router.get("/",allPrograms)

router.put("/:id", auth, updateProgram)

router.get("/:id", getProgramById);
router.get("/company/:companyId", getProgramsByCompany);

router.delete("/:id", auth, deleteProgram)

export default router;
