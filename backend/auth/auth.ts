import { AppConstants } from '../constants/constants'

const { NOT_AUTHERIZED_CODE, APP_USERS } = AppConstants

export const Auth = {
    // middle to check if incoming token is valid and has a valid user
    isRecruiter: (req: any, res: any, next: any) => {
        const canAccessRoute = req.user.role === APP_USERS.recruiter || req.user.role === APP_USERS.admin
        if(!canAccessRoute) return res.status(NOT_AUTHERIZED_CODE).json({
            success: false,
            message: 'You are not authorized to perform this action!'
        })
        next()
    }
}