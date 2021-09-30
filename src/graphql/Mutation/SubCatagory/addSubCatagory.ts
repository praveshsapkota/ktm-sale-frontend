import { gql } from "@apollo/client";

export const addSubCatagory = gql`
	mutation addSubCatagory(
		$name: String!
		$status: String!
		$slug: String!
		$subCatagoryImage: [String!]!
		$seoTags: String!
		$catagory: String!
	) {
		createOnesub_catagory(
			data: {
				name: $name
				slug: $slug
				status: $status
				seoTags: $seoTags
				Catagory: { connect: { name: $catagory } }
				subCatagoryImage: { set: $subCatagoryImage }
			}
		) {
			name
		}
	}
`;
