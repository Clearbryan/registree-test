export const AppConstants = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://admin:Q1qJCROaabSDOW5b@cluster0.0m6ek.mongodb.net/registree?retryWrites=true&w=majority',
    UNIVERSITY_URI: 'https://registree-coding-challenge.glitch.me/',
    REST_API: 'http://localhost:3000/raw',
    BAD_REQUEST_CODE: 400,
    SUCCESS_REQUEST_CODE: 200,
    NOT_AUTHERIZED_CODE: 401,
    MONGO_DUPLICATE_ENTRY_ERROR_CODE: 11000,
    APP_SECRET: process.env.APP_SECRET || 'secret',
    APP_USERS: { recruiter: 'recruiter', candidate: 'candidate', admin: 'admin' }
}