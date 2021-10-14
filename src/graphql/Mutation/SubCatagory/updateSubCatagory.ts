import { gql } from "@apollo/client";

export const UpdateSubCatagoryWithImage = gql`
	mutation UpdateSubcatagory(
		$name: String!
		$newName: StringFieldUpdateOperationsInput!
		$status: StringFieldUpdateOperationsInput!
		$slug: StringFieldUpdateOperationsInput!
		$subCatagoryImage: sub_catagoryUpdatesubCatagoryImageInput!
		$seoTags: StringFieldUpdateOperationsInput!
		$catagory: String!
	) {
		updateOnesub_catagory(
			data: {
				name: $newName 
				slug: $slug 
				status: $status 
				seoTags: $seoTags
				Catagory: { connect: { name: $catagory } }
				subCatagoryImage: $subCatagoryImage 
			}
			where: { name: $name }
		) {
			name
		}
	}
`;

export const UpdateSubCatagoryWithoutImage = gql`
	mutation UpdateSubcatagory(
		$name: String!
		$newName: StringFieldUpdateOperationsInput!
		$status: StringFieldUpdateOperationsInput!
		$slug: StringFieldUpdateOperationsInput!
		$seoTags: StringFieldUpdateOperationsInput!
		$catagory: String!
	) {
		updateOnesub_catagory(
			data: {
				name: $newName
				slug: $slug
				status: $status
				seoTags: $seoTags
				Catagory: { connect: { name: $catagory } }
			}
			where: { name: $name }
		) {
			name
		}
	}
`;
