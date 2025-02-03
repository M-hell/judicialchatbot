const { createWorker } = require('tesseract.js');
const returnGeminiResponse = require('./gemini/returnGeminiResponse');
const CaseModel = require('../models/CaseModel');

const ocr = async (req, res) => {
    try {
        const { caseid,imageUrl } = req.body;
        if (!imageUrl) {
            return res.status(400).json({ error: 'Image URL is required' });
        }

        const worker = await createWorker('eng');
        const { data: { text } } = await worker.recognize(imageUrl);
        await worker.terminate();

        const caseData = await CaseModel.findById(caseid);
        if (!caseData) {
            return res.status(404).json({ error: 'Case not found' });
        }
        const prompt = `I am facing a legal issue and the summary of the issue is this - ${caseData.summary}.
        I am having a issue with the document regarding this legal case. Can you help me understand the legal implications of this document?
        the text is the document is - ${text}`;


        const response=await returnGeminiResponse(prompt);
        return res.status(200).json({ imageresponse:response });

        
    } catch (error) {
        console.error('Error extracting text:', error);
        res.status(500).json({ error: 'Failed to extract text in ocr' });
    }
};

module.exports =  ocr ;
