import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyA6V81qGpezbCsDX-dPwyK4XyafYyoNBPg"

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
    systemInstruction : `
    You are an expert code reviewer. Your task is to:
1. Analyze the provided code for mistakes, inefficiencies, or bad practices.
2. Suggest improvements with clear explanations.
3. Provide a better version of the code if applicable.
4. Ensure the code follows best practices for security, performance, and readability.
    `
 });

const prompt = "Explain how AI works";

const codeReviewService = async (prompt)=>{
    const result = await model.generateContent(prompt)
    return result.response.text()
    }
    
    export default codeReviewService
