import { gql } from "@apollo/client";

export const UpdateProductWithbothImage = gql`
	mutation UpdateProduct(
		$name: String!
		$newSlug: String!
		$slug: String!
		$description: String!
		$subCatagory: String!
		$productThumbnail: String!
		$productImage: [String!]!
		$status: String!
		$seoTags: String!
		$variants: [Json!]!
	) {
		updateOneProduct(
			data: {
				name: { set: $name }
				slug: { set: $newSlug }
				description: { set: $description }
				subCatagory: { connect: { name: $subCatagory } }
				product_thumbnail: { set: $productThumbnail }
				productImage: { set: $productImage }
				status: { set: $status }
				seoTags: { set: $seoTags }
				variants: { set: $variants }
			}
			where: { slug: $slug }
		) {
			name
		}
	}
`;

export const UpdateProductWithOnlyThumbnail = gql`
	mutation UpdateProduct(
		$name: String!
		$newSlug: String!
		$slug: String!
		$description: String!
		$subCatagory: String!
		$productThumbnail: String!
		$status: String!
		$seoTags: String!
		$variants: [Json!]!
	) {
		updateOneProduct(
			data: {
				name: { set: $name }
				slug: { set: $newSlug }
				description: { set: $description }
				subCatagory: { connect: { name: $subCatagory } }
				product_thumbnail: { set: $productThumbnail }
				status: { set: $status }
				seoTags: { set: $seoTags }
				variants: { set: $variants }
			}
			where: { slug: $slug }
		) {
			name
		}
	}
`;

export const UpdateProductWithonlyProductImages = gql`
	mutation UpdateProduct(
		$name: String!
		$newSlug: String!
		$slug: String!
		$description: String!
		$subCatagory: String!
		$productImage: [String!]!
		$status: String!
		$seoTags: String!
		$variants: [Json!]!
	) {
		updateOneProduct(
			data: {
				name: { set: $name }
				slug: { set: $newSlug }
				description: { set: $description }
				subCatagory: { connect: { name: $subCatagory } }
				productImage: { set: $productImage }
				status: { set: $status }
				seoTags: { set: $seoTags }
				variants: { set: $variants }
			}
			where: { slug: $slug }
		) {
			name
		}
	}
`;

export const UpdateProductWithoutImage = gql`
	mutation UpdateProduct(
		$name: String!
		$newSlug: String!
		$slug: String!
		$description: String!
		$subCatagory: String!
		$status: String!
		$seoTags: String!
		$variants: [Json!]!
	) {
		updateOneProduct(
			data: {
				name: { set: $name }
				slug: { set: $newSlug }
				description: { set: $description }
				subCatagory: { connect: { name: $subCatagory } }
				status: { set: $status }
				seoTags: { set: $seoTags }
				variants: { set: $variants }
			}
			where: { slug: $slug }
		) {
			name
		}
	}
`;
