const adminModel = require('../models/adminModel');
const requestBodyVerificationService = require('../Services/requestBodyVerificationService');

const getAdminProfile = (req, res) => {
    if (req.userType === 'admin') {
        adminModel.findOne({ email: req.email }).exec()
            .then(admin => {
                return res.status(200).json({
                    email: admin.email,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                })
            })
    } else
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Wrong user type'
        });
};

const uploadAdminProfile = (req, res) => {

    let verificationResult = requestBodyVerificationService.verifyRequestBody(
        [
            "firstName",
            "lastName",
            "email"
        ], req);

    if (!verificationResult.ifValid) {

        return res.status(400).json(verificationResult.message);

    }

    if (req.body.email !== req.email) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'No permission to upload other profile'
        });
    }

    if (req.userType === 'customer') {

        const admin = Object.assign({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        adminModel.updateOne({email: admin.email}, admin)
            .then(() => {
                return res.status(200).json({message: "successfully updated"});
            }).catch(error => {
            console.log('error by updating an admin\'s Profile');
            return res.status(500).json({
                error: 'Internal server error happens by add customer Profile',
                message: error.message
            })
        });
    }
};

module.exports = {
    getAdminProfile,
    uploadAdminProfile
};
