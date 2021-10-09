import { gql } from "@apollo/client";

export const addProduct = gql`
	mutation addProduct(
		$name: String!
		$slug: String!
		$description: String!
		$subCategory: String!
		$productThumbnail: String!
		$productImage: [String!]!
		$status: String!
		$seoTags: String!
		$variants: [Json!]!
	) {
		createOneProduct(
			data: {
				name: $name
				slug: $slug
				description: $description
				subCatagory: { connect: { name: $subCategory } }
				product_thumbnail: $productThumbnail
				productImage: { set: $productImage }
				status: $status
				seoTags: $seoTags
				variants: { set: $variants }
			}
		) {
			name
			variants
		}
	}
`;
