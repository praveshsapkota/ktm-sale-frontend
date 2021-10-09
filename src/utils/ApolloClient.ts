import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client"
const uri = "http://localhost:4000/graphql"
export const client = new ApolloClient({
	uri: uri,
	cache: new InMemoryCache(),
	link: createUploadLink({ uri: uri }) as any
});
