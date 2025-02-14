import express from "express";
import codeReview from "../controllers/codeReview.js";
import generateContantController from "../controllers/generateContant.js";

const router = express.Router();

router.get("/get-response" ,generateContantController )
router.get("/get-code-review" ,codeReview )

export default router;
