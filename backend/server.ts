import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { indexRouter } from './router'
import { userRouter } from './router/user'
import { AppConstants } from './constants/constants'
import { connectTodabase } from './database/database'
import { Passport } from './auth/passport'
import session from 'express-session'
import passport from 'passport'

const { PORT, APP_SECRET } = AppConstants

const app = express()

export class Server {
    app: Application

    constructor() {
        // initialize the application
        this.app = express()
        // connect to database
        connectTodabase()
        // application middleware
        Passport(passport)
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(express.json())
        this.app.use(
            session({
              secret: APP_SECRET,
              resave: true,
              saveUninitialized: true
            })
          )
        this.app.use(passport.initialize())
        this.app.use(passport.session());
        // application routes
        this.app.use('/raw', indexRouter.getRawData())
        this.app.use('/users', userRouter.addUser())
        this.app.use('/users', userRouter.loginUser())
        // start development server
        this.app.listen(PORT, () => console.log(`Registree backend server runninng on port: ${PORT}`))
    }
}