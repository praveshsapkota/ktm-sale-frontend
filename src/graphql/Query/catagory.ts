import { gql } from "@apollo/client";

export const Catagory = gql`
	query {
		categories {
			id
			image: catagoryImage
			name
			slug
			status
			tags: seoTags
		}
	}
`;
