import { gql } from "@apollo/client";

export const subCatagory_name = gql`
	query {
		subCatagories {
			name
			slug
			id
			image: subCatagoryImage
			status
			tags: seoTags
			category: Catagory {
				name
			}
		}
	}
`;
