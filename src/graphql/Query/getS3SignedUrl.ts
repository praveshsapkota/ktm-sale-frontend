import { gql } from "@apollo/client";

export const getS3Url = gql`
	query ($imgname: String!) {
		GetS3SecuredUrl(imagename: $imgname)
	}
`;
