import express from 'express' 

import {
    addProgram,allPrograms,updateProgram,deleteProgram,getProgramsByCompany
} from "./../controllers/program.controller.js"

const router = express.Router()

router.post("/",addProgram)

router.get("/",allPrograms)

router.put("/:id",updateProgram)

router.get("/company/:companyId", getProgramsByCompany);

router.delete("/:id",deleteProgram)

export default router;