const CaseModel = require("../models/CaseModel");

async function statusUpdate(request,response){
    try{
        const {caseid} = request.body
        const caseDetails=await CaseModel.findById(caseid);
        if(caseDetails.status==="Pending"){
            caseDetails.status="Closed";
        }
        else{
            caseDetails.status="Pending";
        }
        caseDetails.enddate=new Date().toISOString();
        await caseDetails.save();
        return response.status(200).json({caseDetails,success:true});
    }catch(error){
        return response.status(500).json({error:"Internal server error, cant update status"});
    }
}
module.exports = statusUpdate;