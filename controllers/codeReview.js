import codeReviewService from "../Services/codeReviewAI.js"

const  codeReview = async (req , res)=>{
    const code = req.body.code
if (!code) {
    return res.status(400).send("Code is required")
}
const response = await codeReviewService(code)
res.send(response)
}
export default codeReview