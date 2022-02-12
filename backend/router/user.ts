import { Router, Request, Response } from 'express'
import { Validator } from '../validators/validator'
import { AppConstants } from '../constants/constants'
import { Auth } from '../auth/auth'
import { Helper } from '../utils/utils'
import { User } from '../models/user'
import passport from 'passport'

const router = Router()
const { BAD_REQUEST_CODE, SUCCESS_REQUEST_CODE, MONGO_DUPLICATE_ENTRY_ERROR_CODE} = AppConstants
const { isRecruiter } = Auth

class UserRouter {
    addUser(): Router {
        return router.post('/add', passport.authenticate('jwt', { session: false }),  isRecruiter, async (req: Request, res: Response) => {
            const userInput = await Validator.validateAdminUserInput(req.body)
            const { value, error } = userInput
            if (error)  return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: error.message
            })
            // validation passed
            try {
                // encrypt user password
                const encryptedPassword = await Helper.encryptPassword(value.password)
                const newUser = new User({...value, password: encryptedPassword})
                const user = await newUser.save()
                // return response to client
                res.status(SUCCESS_REQUEST_CODE).json({
                    success: true,
                    user
                })
            } catch (error: any) {
                if(error.code === MONGO_DUPLICATE_ENTRY_ERROR_CODE) {
                    for(const key in error.keyValue) { 
                        res.status(BAD_REQUEST_CODE).json({
                            success: false,
                            message: `${key} already exists!`
                        })
                    }
                }else {
                    res.json({
                        success: false,
                        message: error.message
                    })
                }
                
            }
        })
    }

    // login user and create token
    loginUser(): Router {
        return router.post('/login', async (req: Request, res: Response) => {
            const { loginId, password } = req.body
            try {
                const user = await User.findOne({ loginId })
                if(!user) {
                    return res.status(BAD_REQUEST_CODE).json({
                        success: false,
                        message: 'Invalid loginId provided!'
                    })
                }
                // check if password matches
                const isPasswordMatch = await Helper.comparePassword(password, user.password)
                if(!isPasswordMatch) {
                    return res.status(BAD_REQUEST_CODE).json({
                        success: false,
                        message: 'Incorrect password provided!'
                    })
                }
                // create token
                const token = await Helper.generateToken(user)
                // return response to client
                res.status(SUCCESS_REQUEST_CODE).json({
                    success: true,
                    token
                })
            } catch (error: any) {
                res.json({
                    success: false,
                    message: error.message
                })
            }
        })
    }
}

export const userRouter = new UserRouter()