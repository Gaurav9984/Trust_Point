const Joi = require('joi');

const signUpValidation = (req, res, next) => {
    // Debug: log incoming signup payload
    console.log('[SIGNUP PAYLOAD]', req.body);
    // Accept any of: name, fullName, full_name for compatibility with frontend/backends
    const Schema = Joi.object({
        name: Joi.string().min(3).max(50),
        fullName: Joi.string().min(3).max(50),
        full_name: Joi.string().min(3).max(50),
        invester_id: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().allow(''),
        password: Joi.string().min(5).required(),
    }).or('name', 'fullName', 'full_name');

    const { error } = Schema.validate(req.body);
    if (error) {
        const errors = error.details ? error.details.map((d) => d.message) : [error.message || 'Invalid request'];
        return res.status(400).json({ message: 'Bad Request', errors });
    }
    next();
};

const loginValidation=(req,res,next)=>{
    const Schema = Joi.object({
        invester_id: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(5).required()
    })
    const {error}=Schema.validate(req.body);
    if(error){
        const errors = error.details ? error.details.map(d => d.message) : [error.message || 'Invalid request']
        return res.status(400).json({ message: "Bad Request", errors })
    }
    next();
}
module.exports = { signUpValidation, loginValidation };