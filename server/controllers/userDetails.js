const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function userDetails(request, response) {
    try {
        const token = request.cookies.token || "";

        const user = await getUserDetailsFromToken(token);

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true,
            });
        }

        const populatedUser = await UserModel.findById(user._id).populate("cases");

        return response.status(200).json({
            message: "User details",
            data: populatedUser,
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
}

module.exports = userDetails;
