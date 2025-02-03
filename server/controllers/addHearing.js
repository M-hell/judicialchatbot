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
      hearingResponse,
    } = request.body;

    // Validate request body
    if (
      !no ||
      !date ||
      !userStatementSummary ||
      !opposingPartyStatementSummary ||
      !judgeStatementSummary ||
      !hearingResponse
    ) {
      return response.status(400).json({ error: "All fields are required." });
    }

    // Save the new hearing to the database
    const newHearing = new HearingModel({
      no,
      date,
      userStatementSummary,
      opposingPartyStatementSummary,
      judgeStatementSummary,
      response: hearingResponse,
    });

    await newHearing.save();

    // Fetch the case summary
    const caseSummary = await CaseModel.findById(caseid);

    if (!caseSummary) {
      return response.status(404).json({ error: "Case not found." });
    }

    // Prepare the first prompt for Gemini
    const prompt = `Based on the following hearing details, suggest the next steps according to Indian law:
        - Hearing No: ${no}
        - Date: ${date}
        - User Statement: ${userStatementSummary}
        - Opposing Party Statement: ${opposingPartyStatementSummary}
        - Judge Statement: ${judgeStatementSummary}
        
        Provide the next legal steps under Indian law for this case.`;

    // Generate next steps using Gemini
    let geminiResponse;
    try {
      geminiResponse = await returnGeminiResponse(prompt);
    } catch (error) {
      console.error("Error generating Gemini response for next steps:", error);
      return response
        .status(500)
        .json({ error: "Failed to generate next steps from Gemini." });
    }

    // Prepare the second prompt for Gemini to update the case summary
    const summaryPrompt = `Based on the following hearing details, modify the summary of the case:
        - Hearing No: ${no}
        - Date: ${date}
        - User Statement: ${userStatementSummary}
        - Opposing Party Statement: ${opposingPartyStatementSummary}
        - Judge Statement: ${judgeStatementSummary}
        - Suggestion: ${geminiResponse}
        - Current Summary: ${caseSummary.summary}
        
        Provide an updated summary for the case.`;

    // Generate updated summary using Gemini
    let updatedSummary;
    try {
      updatedSummary = await returnGeminiResponse(summaryPrompt);
    } catch (error) {
      console.error(
        "Error generating Gemini response for case summary:",
        error
      );
      return response.status(500).json({
        error: "Failed to generate updated case summary from Gemini.",
      });
    }

    // Update the case with the new summary
    await CaseModel.findByIdAndUpdate(request.params.id, {
      summary: updatedSummary,
    });

    // Return a response with Gemini-generated legal advice
    return response.status(201).json({
      message: "Hearing added successfully",
      hearing: newHearing,
      nextSteps: geminiResponse,
    });
  } catch (error) {
    console.error("Error adding hearing:", error);
    return response
      .status(500)
      .json({ error: "An error occurred while adding the hearing." });
  }
}

module.exports = addHearing;
