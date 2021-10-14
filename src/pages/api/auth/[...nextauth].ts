import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from "dotenv";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "../../../context/prismaContext";
import { PrismaClient } from "@prisma/client";
import adapter from "next-auth/adapters"
// import {Register} from "../../../graphql/Mutation/Register"
// import {client} from "../../../utils/ApolloClient"
dotenv.config();
export const prisma = new PrismaClient();

let userAccount: any = null

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		GoogleProvider({
			//@ts-ignore
			clientId: process.env.GOOGLE_CLIENT_ID,
			//@ts-ignore
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		//@ts-ignore
		CredentialsProvider({
			name: "Login",
			credentials: {
				email: {
					label: "email",
					type: "email",
					placeholder: "ktmsale@gmail.com",
				},
				password: {
					label: "password",
					type: "password",
					placeholder: "secure password",
				},
				// full_name: { label: "name", type: "text", placeholder: "your name" },
				// contact_no: {
				// 	label: "phone number",
				// 	type: "text",
				// 	placeholder: "mobile no",
				// },
				// address: { label: "address", type: "text", placeholder: "address" },
			},
			async authorize(credentials) {
				console.log("inside authorize", credentials);
				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email,
						password: credentials.password,
					},
					select: {
						name: true,
						email: true,
						address: true,
						role: true,
						varified: true,
						contactNumber: true,
						status: true,
						emailVerified: true,
						image: true,
						billing: true,
						CartItem: true,
						sessions: true,
						accounts: true
					}
				});
				// console.log("prismaUser" , user);
				if (user !== null) {
					userAccount = user;
					return user;
				}
				else {
					return null;
				}

			}

			// //@ts-ignore
			// async authorize(credentials, _req) {
			// 	console.log(credentials);
			// 	const Register_res = await client.mutate({
			// 		mutation : Register,
			// 		variables :{
			// 			name:  credentials.full_name,
			// 			email: 	credentials.email	,
			// 			password: credentials.password,
			// 			address: credentials.address,
			// 			contactNo: credentials.contact_no,
			// 		}
			// 	})
			// 	console.log("Register_response",Register_res );
			// You need to provide your own logic here that takes the credentials
			// submitted and returns either a object representing a user or value
			// that is false/null if the credentials are invalid.
			// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
			// You can also use the `req` object to obtain additional parameters
			// (i.e., the request IP address)
			// const res = await fetch("/your/endpoint", {
			// 	method: "POST",
			// 	body: JSON.stringify(credentials),
			// 	headers: { "Content-Type": "application/json" },
			// });
			// const user = await res.json();

			// // If no error and we have user data, return it
			// if (res.ok && user) {
			// 	return user;
			// }
			// // Return null if user data could not be retrieved
			// return null;
			// }
		}),
	],
	secret: process.env.AUTH_SECRET,
	cookie: {
		secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
	},
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		encryption: true,
	},
	pages: {
		signIn: "/test"
	},
	callbacks: {
		// async signIn({user, account, profile, email, credentials}) {
		//     if (typeof user.userId !== typeof undefined)
		//     {
		//         if (user.isActive === '1')
		//         {
		//             return true;
		//         }
		//         else
		//         {
		//             return false;
		//         }
		//     }
		//     else
		//     {
		//         return false;
		//     }
		// },
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log("inside user", token, user);
			if (typeof user !== typeof undefined) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			console.log("inside session", token, session);
			if (userAccount !== null) {
				session.user = userAccount;
			}
			else if (typeof token.user !== typeof undefined && (typeof session.user === typeof undefined
				|| (typeof session.user !== typeof undefined && typeof session.user!.userId === typeof undefined))) {
				session!.user = token.user;
			}
			else if (typeof token !== typeof undefined) {
				session.token = token;
			}
			return session;
		},
	}

});

// credentials: {
//     email: { label: "email", type: "email", placeholder: "ktmsale@gmail.com" },
//     password : { label: "password", type: "password", placeholder: "secure password" },
//     full_name : { label: "name", type: "text", placeholder: "your name" },
//     contact_no : { label: "phone number", type: "text", placeholder: "mobile no" },
//     address : { label: "address", type: "text", placeholder: "address" },
// },
