const customerModel = require('../models/customerModel');
const requestBodyVerificationService = require("../Services/requestBodyVerificationService");

const getCustomerProfile = (req, res) => {
    if (req.userType === 'customer') {
        customerModel.findOne({ email: req.body.email }).exec()
            .then(customer => {
                return res.status(200).json({
                    email: customer.email,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                })
            })
    } else
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Wrong user type'
        });
};

const uploadCustomerProfile = (req, res) => {

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

        const customer = Object.assign({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        customerModel.updateOne({email: customer.email}, customer)
            .then(() => {
                return res.status(200).json({message: "successfully updated"});
            }).catch(error => {
            console.log('error by updating a customer Profile');

            return res.status(500).json({
                error: 'Internal server error happens by add customer Profile',
                message: error.message
            })
        });
    }
};
module.exports = {
    getCustomerProfile,
    uploadCustomerProfile
};
