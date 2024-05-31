const joi = require('joi');

module.exports.ideaSchema = joi.object({
    Idea : joi.object({
        name : joi.string().required(),
        phoneNumber: joi.number().required(),
        email : joi.string().required(),
        description : joi.string().required(),
    }).required()
})
