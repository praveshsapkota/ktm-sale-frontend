import { gql } from "@apollo/client";

export const getProducts = gql`
	query getproducts {
			products {
				name
				description
				name
				thumbnail : product_thumbnail
				productImages : productImage
				slug
				subCatagory {
					name
				}
				variants
				status
				tags : seoTags
				__typename
			}
		}
	
`;

// export const filtered_products = gql``;
