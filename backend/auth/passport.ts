import { ExtractJwt, Strategy } from 'passport-jwt'
import { AppConstants } from '../constants/constants'
import { User } from '../models/user'

export const Passport = (passport: any) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: AppConstants.APP_SECRET
    }
    passport.use(new Strategy(options, (jwtPayload: any, done: any) => {
        // find user by id in database
        User.findById(jwtPayload._id, (err: any, user: any) => {
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }))
}