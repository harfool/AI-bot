import codeReviewService from "../Services/codeReviewAI.js"

const  codeReview = async (req , res)=>{
    const prompt = req.body.prompt
if (!prompt) {
    return res.status(400).send("Prompt is required")
}
const response = await codeReviewService(prompt)
res.send(response)
}
export default codeReview