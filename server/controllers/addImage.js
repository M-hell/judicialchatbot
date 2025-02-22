const CaseModel = require('../models/CaseModel');

const addImage = async (req, res) => {
    try {
        const { caseid, imageUrl } = req.body;
        const caseDetails = await CaseModel.findById(caseid);
        if (!caseDetails) {
            return res.status(404).json({ error: 'Case not found' });
        }
        caseDetails.imagedocuments.push(imageUrl);
        await caseDetails.save();
        res.status(200).json({ message: 'Image added successfully' });
    } catch (error) {
        console.error('Error adding image:', error);
        res.status(500).json({ error: 'Failed to add image' });
    }
};

module.exports = addImage;