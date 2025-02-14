import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyA6V81qGpezbCsDX-dPwyK4XyafYyoNBPg"

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = "Explain how AI works";

const generateContent = async (prompt) =>{
    const result = await model.generateContent(prompt)
    return result.response.text()
}
export default generateContent