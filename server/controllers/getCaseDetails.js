const CaseModel = require("../models/CaseModel");

async function getCaseDetails(req, res) {
    try {
        const { caseid } = req.body;
        if (!caseid) {
            return res.status(400).json({ error: "Case ID is required" });
        }

        const caseDetails = await CaseModel.findById(caseid).populate("hearings");

        if (!caseDetails) {
            return res.status(404).json({ error: "Case not found" });
        }

        res.status(200).json({ message: "Case details", data: caseDetails });
    } catch (error) {
        console.error("Error fetching case details:", error);
        res.status(500).json({ error: "Failed to fetch case details" });
    }
}

module.exports =  getCaseDetails ;
