import {
	ApolloClient,
	InMemoryCache,
	ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";

const uri = "http://localhost:5000/";

const authMiddleware = new ApolloLink( (operation, forward) => {
	// add the authorization to the headers
	
	operation.setContext(({ headers = {} }) => ({
	headers: {
		...headers,
		authorization: localStorage.getItem("Token") || ""
	}
	}));
	
	return forward(operation);
});

const UploadLink = createUploadLink({
	uri: uri,
	// headers: {
	// 	jwtTokens:  Token()
	// },
}) as any ;

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);

	if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
	// uri: uri,
	cache: new InMemoryCache(),
	link: ApolloLink.from([errorLink,authMiddleware,UploadLink]),
	credentials : "include"

});

