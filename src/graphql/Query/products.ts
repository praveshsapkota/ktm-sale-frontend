import { gql } from "@apollo/client";

export const getProducts = gql`
	query getProducts {
		products {
			name
			price
			salePrice
			sku
			unit
			discount
			description
			image: Product_thumbnail
			SubCatagory {
				name
			}
		}
	}
`;

// export const filtered_products = gql``;
