import express from "express";
import codeReview from "../controllers/codeReview.js";
import generateContantController from "../controllers/generateContant.js";

const router = express.Router();

router.post("/get-response" ,generateContantController )
router.post("/get-code-review" ,codeReview )

export default router;
