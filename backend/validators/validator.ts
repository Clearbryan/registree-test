import joi from 'joi'

export const Validator = {
    // validate admin user
    validateAdminUserInput: async (admin: any): Promise<any> => {
        const schema = joi.object({
            loginId: joi.string().min(4).max(15).required().error(new Error(`Login ID is required!`)),
            email: joi.string().email({minDomainSegments: 2}).max(50).required().error(new Error(`Please enter a valid email address!`)),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(4).max(16).error(new Error(`Password is requred!`)),
            role: joi.string().valid('recruiter', 'candidate').required().error(new Error(`Invalid user role entered!`))
        })

        return schema.validate(admin)
    }
}