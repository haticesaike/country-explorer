import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
    uri: 'https://countries.trevorblades.com/graphql',
});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
export default client;
