import { gql } from "@apollo/client";

export const Catagory = gql`
	query {
		categories {
			name
			slug
			id
		}
	}
`;
