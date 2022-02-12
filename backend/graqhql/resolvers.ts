import axios from 'axios'
import { AppConstants } from '../constants/constants'

const { REST_API } = AppConstants

export const resolvers = {
    Query: {
        students: async (parent: any) => {
            try {
                const response = await axios.get(REST_API)
                return response.data.result
            } catch (error) {
                console.log('An error occured');
                return []
            }
        }
    }
}