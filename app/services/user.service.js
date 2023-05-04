const Joi = require("joi")
class UserService {

    validateUser = async (data) => {
        try {
            if ((Object.keys(data)).length == 0) {
                throw "Empty payload"
            } else {
                let userSchema = Joi.object({
                    name: Joi.string()
                        .min(3)
                        .max(50)
                        .required(),

                    email: Joi.string()
                        .email({ minDomainSegments: 2 })
                        .required(),

                    password: Joi.string()
                        .pattern(new RegExp('^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{3,30}$'))
                        .required(),

                    address: Joi.string(),

                    role: Joi.array().items(
                        Joi.string().valid("admin", "suppliar", "customer")
                    ),

                    status: Joi.string()
                        .allow("active", "inactive")
                        .default('inactive'),

                    phone: Joi.string()
                        .min(10)

                    // repeat_password: Joi.ref('password'),

                })
                let response = await userSchema.validateAsync(data)
                return response;

            }
        } catch (err) {
            console.log(err);
            if (err?.details) {
                throw err?.details?.[0].message;
            }
            throw err;
        }
    }

}

const userService = new UserService
module.exports = userService;