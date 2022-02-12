import { gql } from 'apollo-server'

export const typeDefs = gql`
    type Student {
        student_id: String
        name: String
        mark: Int
        university: String
    }

    type Query {
        students: [Student]
    }
`