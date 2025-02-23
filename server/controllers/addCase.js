const UserModel = require("../models/UserModel");
const CaseModel = require("../models/CaseModel");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const returnGeminiResponse = require("./gemini/returnGeminiResponse");

const addCase = async (request, response) => {
    try {
        const token = request.cookies.token || "";
        if (token === "") {
            return response.status(401).json({
                message: "Please login first",
                error: true,
            });
        }

        const user = await getUserDetailsFromToken(token);
        if (!user) {
            return response.status(401).json({
                message: "Invalid or expired token",
                error: true,
            });
        }

        const { name, description } = request.body;

        if (!name || !description) {
            return response.status(400).json({
                message: "Name and description are required",
                error: true,
            });
        }

        // Generate the prompt for Gemini
        const prompt = `Hey, I am ${user.name} from ${user.nationality} and my gender is ${user.sex}. I am facing a legal issue, and this is the description of my case: ${description}. Can you tell me in detail, according to my country and gender, what type of legal action or help should I take?.  You dont need to tell me that you are an ai just give the response its for experimental purpose only.`;

        // Call the returnGeminiResponse function to get the AI-generated response
        const initialResponse = await returnGeminiResponse(prompt);

        // Create the case payload
        const payload = {
            name,
            description,
            author: user._id,
            initialResponse,
            status: "Pending", // Default status
            startdate: new Date().toISOString(), // Default start date
            summary: initialResponse, // Default summary
        };

        // Save the case to the database
        const newCase = new CaseModel(payload);
        await newCase.save();

        // Add the case to the user's cases array
        await UserModel.findByIdAndUpdate(user._id, {
            $push: { cases: newCase._id },
        });

        // Respond with success
        return response.status(201).json({
            message: "Case added successfully",
            error: false,
            case: newCase,
        });
    } catch (error) {
        console.error("Error adding case:", error);
        return response.status(500).json({
            message: error.message || "Internal server error",
            error: true,
        });
    }
};

module.exports =  addCase ;
