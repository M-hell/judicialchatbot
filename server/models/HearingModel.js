const mongoose = require('mongoose');

const hearingSchema = new mongoose.Schema({
    caseid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
        required:[true,"provide caseId"]
    },
    no:{
        type:String,
        required:[true,"provide no"]
    },
    date:{
        type:String,
        required:[true,"provide date"]
    },
    userStatementSummary:{
        type:String,
        required:[true,"provide userStatementSummary"]
    },
    opposingPartyStatementSummary:{
        type:String,
        required:[true,"provide opposingPartyStatementSummary"]
    },
    judgeStatementSummary:{
        type:String,
        required:[true,"provide judgeStatementSummary"]
    },
    response:{
        type:String,
        required:[true,"provide response"]
    }
},{
    timestamps : true
});

const HearingModel = mongoose.model('Hearing',hearingSchema)

module.exports = HearingModel