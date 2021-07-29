const jwt = require('jsonwebtoken'); // For JSON Web Token
const { Schema, model } = require('mongoose'); 
const Joi = require('joi'); // Joi is for validation

// Creating Schema named userSchema
const userSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024 // We do it because Our password will be stored as Hash and then its length will be increased
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'publisher'],
        default: 'user'
    }
})

// Adding a method to userSchema
// It will generate a JSON web token
userSchema.methods.generateJWT = function () {
    const token = jwt.sign(
        {
            // It is payload of the token
            _id: this._id,
            email: this.email,
            role: this.role
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "72h" //Time limit for each token
        }
    )
    return token;
}

const validateUser = user => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required() // Here Password will come from client side thats why maxLength is 255
    });
    return schema.validate(user)
}

module.exports.User = model('User', userSchema);
module.exports.validate = validateUser;
