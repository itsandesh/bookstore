class UserService {

    validateUser = async (data) => {
        if (!data) {
            throw "Empty payload"
        } else {
            if (!data.email || ! !data.name || data.password || data.role) {
                throw "email,name,password, role required"
            }
        }
    }

}

const userService = new UserService
module.exports = userService;