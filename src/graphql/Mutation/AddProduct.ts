import { gql } from "@apollo/client";

export const addProduct = gql`
	mutation (
		$name: String!
		$price: Int!
		$sku: String!
		$description: String!
		$unit: Int!
		$discount: Int!
		$subCatagory: String!
		$salePrice: Int!
		$productThumbnail: ProductCreateProduct_thumbnailInput # $ProductImage: [String]!
	) {
		createOneProduct(
			data: {
				name: $name
				price: $price
				sku: $sku
				description: $description
				unit: $unit
				discount: $discount
				SubCatagory: { connect: { name: $subCatagory } }
				Product_thumbnail: $productThumbnail
				salePrice: $salePrice
				# ProductImage: { createMany: { data: [

				# ] } }
			}
		) {
			name
			price
		}
	}
`;
