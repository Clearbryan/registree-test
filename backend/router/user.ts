import { Router, Request, Response } from 'express'
import { Validator } from '../validators/validator'
import { AppConstants } from '../constants/constants'

const router = Router()
const { validateAdminUserInput } = Validator
const { BAD_REQUEST_CODE } = AppConstants

class UserRouter {
    addAdminUser(): Router {
        return router.post('/add', async (req: Request, res: Response) => {
            const { value, error } = validateAdminUserInput(req.body)
            if(error) return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: error.message
            })
            // validation passed
            

        })
    } 
}