import { ApolloServer } from 'apollo-server'
import { resolvers } from './graqhql/resolvers';
import { typeDefs } from './graqhql/typeDefs';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Apollo server listening at ${url}`);
});