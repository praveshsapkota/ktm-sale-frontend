import { gql } from "@apollo/client";

export const subCatagory_name = gql`
	query {
		subCatagories {
			name
			id
			slug
		}
	}
`;
