import mongose, { Schema } from 'mongoose'

const userSchema = new Schema({
    email: { type: String, required: true },
    loginId: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: null }
})

export const User = mongose.model(`User`, userSchema)