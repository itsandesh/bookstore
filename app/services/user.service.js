const Joi = require("joi")
const MongoDBService = require("./mongo.service")
const UserModel = require("../model/user.model")
class UserService extends MongoDBService {

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

                    role: Joi.string().allow("admin", "suppliar", "customer").default('customer'),

                    status: Joi.string()
                        .allow("active", "inactive")
                        .default('inactive'),

                    phone: Joi.string()
                        .min(10),

                    image: Joi.string().empty()

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

    registerUser = async (data) => {
        try {

            // let response = await this.db.collection('users').insertOne(data);
            let user = new UserModel(data)
            return await user.save() //this is the insert query like .insertOne

            //    let response = await this.addSingleRow('users', data);

        } catch (err) {
            throw err;
        }
    }
    getUserByEmail = async (email) => {
        try {
            let UserDetail = await this.db.collection('users').findOne({
                email: email
            });
            return UserDetail


        } catch (err) {
            throw "getUserByEmail", +err;
        }
    }
    getUserById = async (UserId) => {
        try {
            let UserDetail = await UserModel.findById(UserId, {password:0 }); //first parameter is ID and second parameter is Projection
            return UserDetail;

        } catch (err) {
            throw "UserDetailById", err;
        }
    }
    updateUserById =async(id, data )=>{
        try{
            let response = await UserModel.findByIdAndUpdate(id,{$set:data})
            return response

        }catch(err){
            throw "update User error :"+ err;
        }
    }

}

const userService = new UserService
module.exports = userService;