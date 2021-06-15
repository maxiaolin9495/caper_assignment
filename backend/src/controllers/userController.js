const jwt = require('jsonwebtoken');
const customerModel = require('../models/customerModel');
const adminModel = require('../models/adminModel');
const config = require('../config');
const requestBodyVerificationService =  require('../Services/requestBodyVerificationService');

const login = (req, res) => {

    let verificationResult = verifyRequestBody(req);

    if (!verificationResult.ifValid) {
        return res.status(400).json(verificationResult.message);
    }

    adminModel.findOne({ email: req.body.email.trim().toLowerCase() }).exec()
        .then(user => {
            //user object
            if(!user){
                customerModel.findOne({
                    email: req.body.email.trim().toLowerCase()
                })
                    .exec()
                    .then(user => {
                        if(!user){
                            console.log('No users founded');
                            return res.status(404).send({
                                 token: null
                                })
                        }
                        //user object
                        // check if the password is valid
                        if (!(req.body.password === user.password)){

                            return res.status(401).send({ token: null });

                        }
                        return createTokenResponse(req, res, user, 'customer');

                    })
            }else {
                // check if the password is valid
                if (!(req.body.password === user.password)) {
                    return res.status(401)
                        .send({
                            token: null
                        });
                }

                return createTokenResponse(req, res, user, 'admin');

            }
        })
        .catch(error => {
            console.log('error by searching user');
            return res.status(500).json({
                error: 'Internal Error happened',
                message: error.message
            })
        });
};

const register = (req, res) => {
    let verificationResult = verifyRequestBody(req);

    if (!verificationResult.ifValid) {

        return res.status(400).json(verificationResult.message);

    }

    if (req.body.userType === "admin") {

        const user = Object.assign(req.body, { ifProved: false });
        //the email address will be transformed to lowerCase;
        user.email = user.email.trim().toLowerCase();
        return registerUser(user, customerModel, adminModel, req, res);

    } else {

        const user = Object.assign(req.body);
        user.email = user.email.trim().toLowerCase();
        return registerUser(user, adminModel, customerModel, req, res);

    }

};

const registerUser = (user, dataModel1, dataModel2, req, res, userType) => {
    dataModel1.findOne({ email: req.body.email.trim().toLowerCase() })
        .exec()
        .then(data => {
            //verify if the email is registered in the dataModel1
            if (data === null) {
                //if not, then try to register the email in the dataModel2
                dataModel2.create(user)
                    .then(user => {

                        // if user is registered without errors
                        // create a token
                        return createTokenResponse(req, res, user);

                    })
                    .catch(error => {
                        return errorHandlerForRegister(error, res);
                    });
            } else {
                return res.status(400).json({
                    error: 'Duplicated user',
                    message: 'You have already registered an account with your email'
                })
            }
        }).catch(error => {
            console.log('error by searching user ' + error.message);
            return res.status(404).json({
                error: 'User Not Found',
                message: error.message
            })
        });
};


const createTokenResponse = (req, res, user, userType) => {

    // sign a token
    const token = jwt.sign({
        email: user.email,
        userType: userType?userType:req.body.userType
    }, config.JwtSecret, {
        expiresIn: 999999,
    });
    return res.status(200).json({ token: token })
};

const errorHandlerForRegister = (error, res) => {
    console.log('error by creating a User');
    if (error.code === 11000) {
        return res.status(400).json({
            error: 'User exists',
            message: error.message
        })
    } else {
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        })
    }
};

const verifyRequestBody = (req) => {
    let response = requestBodyVerificationService.verifyRequestBody(
        [
            "email",
            "password"
        ], req);

    if (!response.ifValid){
        return response;
    }
    // only 2 valid userType values
    if (req.body.userType && req.body.userType !== "admin" && req.body.userType !== "customer") {
        return {
            ifValid: false,
            message: {
                error: 'Bad Request',
                message: 'Invalid userType value'
            }
        };
    }

    return {
        ifValid: true
    }

};


module.exports = {
    login,
    register,
};
