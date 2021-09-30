import { gql } from "@apollo/client";

export const UpdateCatagoryWithImage = gql`
	mutation updateCatagory(
		$name: String!
		$newName: StringFieldUpdateOperationsInput!
		$status: StringFieldUpdateOperationsInput
		$slug: StringFieldUpdateOperationsInput!
		$catagoryImage: CategoryUpdatecatagoryImageInput!
		$seoTags: StringFieldUpdateOperationsInput!
	) {
		updateOneCategory(
			data: {
				name: $newName
				status: $status
				slug: $slug
				catagoryImage: $catagoryImage
				seoTags: $seoTags
			}
			where: { name: $name }
		) {
			name
			slug
		}
	}
`;

export const UpdateCatagoryWithoutImage = gql`
	mutation updateCatagory(
		$name: String!
		$newName: StringFieldUpdateOperationsInput!
		$status: StringFieldUpdateOperationsInput
		$slug: StringFieldUpdateOperationsInput!
		$seoTags: StringFieldUpdateOperationsInput!
	) {
		updateOneCategory(
			data: {
				name: $newName
				status: $status
				slug: $slug
				seoTags: $seoTags
			}
			where: { name: $name }
		) {
			name
			slug
		}
	}
`;
