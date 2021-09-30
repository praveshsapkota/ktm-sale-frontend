import { gql } from "@apollo/client";

export const addCatagory = gql`
	mutation (
		$name: String!
		$slug: String!
		$catagoryImage: [String!]!
		$status: String!
		$seoTags: String!
	) {
		createOneCategory(
			data: {
				name: $name
				status: $status
				slug: $slug
				catagoryImage: { set: $catagoryImage }
				seoTags: $seoTags
			}
		) {
			name
		}
	}
`;
