import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { indexRouter } from './router'
import { AppConstants } from './constants/constants'

const { PORT } = AppConstants

export class Server {
    app: Application

    constructor() {
        // initialize the application
        this.app = express()
        // application middleware
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(express.json())
        // application routes
        this.app.use('/raw', indexRouter.getRawData())
        // start development server
        this.app.listen(PORT, () => console.log(`Registree backend server runninng on port: ${PORT}`))
    }
}