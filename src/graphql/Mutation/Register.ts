import { gql } from "@apollo/client";

export const Register = gql`
	mutation Signup(
		$signupName: String!
		$signupEmail: String!
		$signupPassword: String!
		$signupAddress: String!
		$signupContactNo: String
	) {
		signup(
			name: $signupName
			email: $signupEmail
			password: $signupPassword
			address: $signupAddress
			contactNo: $signupContactNo
		) {
			token
			user {
				name
                role
			}
		}
	}
`;
