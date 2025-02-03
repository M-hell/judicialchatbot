const HearingModel = require("../models/HearingModel");
const returnGeminiResponse = require("./gemini/returnGeminiResponse");
const CaseModel = require("../models/CaseModel");

async function addHearing(request, response) {
  try {
    const {
      caseid,
      no,
      date,
      userStatementSummary,
      opposingPartyStatementSummary,
      judgeStatementSummary,
    } = request.body;

    // Validate request body
    if (
      !caseid ||
      !no ||
      !date ||
      !userStatementSummary ||
      !opposingPartyStatementSummary ||
      !judgeStatementSummary
    ) {
      return response.status(400).json({ error: "All fields are required." });
    }

    const caseSummary = await CaseModel.findById(caseid);
    if (!caseSummary) {
      return response.status(404).json({ error: "Case not found." });
    }
    // Prepare the first prompt for Gemini
    const prompt = `Based on the following hearing details, suggest the next steps according to Indian law:
        - casesummary: ${caseSummary.summary}
        - User Statement: ${userStatementSummary}
        - Opposing Party Statement: ${opposingPartyStatementSummary}
        - Judge Statement: ${judgeStatementSummary}
        Provide the next legal steps under Indian law for this case.`;

    // Generate next steps using Gemini
    const geminiResponse=await returnGeminiResponse(prompt);

    // Prepare the second prompt for Gemini to update the case summary
    const summaryPrompt = `Based on the following hearing details, modify the summary of the case:
        -hearing no: ${no}
        -hearing date: ${date}
        - User Statement: ${userStatementSummary}
        - Opposing Party Statement: ${opposingPartyStatementSummary}
        - Judge Statement: ${judgeStatementSummary}
        - Suggestion: ${geminiResponse}
        - Current Summary: ${caseSummary.summary}
        
        Provide an updated summary for the case.`;

    // Generate updated summary using Gemini
    const updatedSummary = await returnGeminiResponse(summaryPrompt);

    const payload={
      caseid,
      no,
      date,
      userStatementSummary,
      opposingPartyStatementSummary,
      judgeStatementSummary,
      response:geminiResponse
    }

    const newHearing = new HearingModel(payload);
    const savedHearing = await newHearing.save();

    // Update the case summary
    caseSummary.summary = updatedSummary;
    await caseSummary.save();

    //push the hearing id to the case
    caseSummary.hearings.push(savedHearing._id);
    await caseSummary.save();

    return response.status(201).json(savedHearing);
    
  } catch (error) {
    console.error("Error adding hearing:", error);
    return response
      .status(500)
      .json({ error: "An error occurred while adding the hearing." });
  }
}

module.exports = addHearing;
