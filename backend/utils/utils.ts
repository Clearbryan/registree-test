import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { AppConstants } from '../constants/constants'

export const Helper = {
    // function to encrypt user password
    encryptPassword: async (password: string): Promise<String> => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    },
    // function to compare user password
    comparePassword: async (password: string, hash: string): Promise<boolean> => {
        const isMatch = await bcrypt.compare(password, hash)
        return isMatch
    },
    // function to generate token
    generateToken: (user: any): string => {
        const token = jwt.sign(_.pick(user, ['_id', 'loginId', 'email', 'role']), AppConstants.APP_SECRET, { expiresIn: '1h' })
        return token
    }
}