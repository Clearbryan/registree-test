import mongoose from 'mongoose'
import { AppConstants } from '../constants/constants'

export const connectTodabase = () => {
    mongoose.connect(AppConstants.MONGO_URI)
        .then(() => console.log(`Database connection succesfull...`))
        .catch(err => {
            console.log(err.message)
            process.exit(1)
        })
}
