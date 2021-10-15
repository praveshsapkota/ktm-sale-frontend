import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from "dotenv";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "../../../context/prismaContext";
import { PrismaClient } from "@prisma/client";
import adapter from "next-auth/adapters";
// import {Register} from "../../../graphql/Mutation/Register"
// import {client} from "../../../utils/ApolloClient"
dotenv.config();
// export const prisma = new PrismaClient();

let userAccount: any = null;

export default NextAuth({
// 	adapter: PrismaAdapter(prisma),
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
			},
			async authorize(credentials) {
				console.log("inside authorize", credentials);
// 				const user = await prisma.user.findFirst({
// 					where: {
// 						email: credentials.email,
// 						password: credentials.password,
// 					},
// 					select: {
// 						name: true,
// 						email: true,
// 						address: true,
// 						role: true,
// 						varified: true,
// 						contactNumber: true,
// 						status: true,
// 						emailVerified: true,
// 						image: true,
// 						billing: true,
// 						CartItem: true,
// 						sessions: true,
// 						accounts: true,
// 					},
// 				});
// 				if (user !== null) {
// 					userAccount = user;
// 					return user;
// 				} else {
// 					return null;
// 				}
			},
		}),
	],
	secret: process.env.AUTH_SECRET,
	cookie: {
		secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
	},
	// session: {
	// 	// jwt: true,
	// 	maxAge: 60,
	// 	jwt: false,
	// },
	jwt: {
		secret: process.env.JWT_SECRET,
		encryption: true,
	},
	pages : {
		signIn : "/Login",
		// error : "/auth/Errors"
	},
	theme :{
		colorScheme: "dark",
		logo : "/images/2.png"
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log("inside signin callback" , user);
			
			if (typeof user !== typeof undefined) {
				if (user.role === "ADMIN") {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		redirect : async({baseUrl,url})=>{
			console.log( "inside redirict",baseUrl , url);
			return baseUrl
		}
		// async jwt({ token, user, account, profile, isNewUser }) {
		// 	console.log("inside jwt", token, user);
		// 	if (typeof user !== typeof undefined) {
		// 		token.user = user;
		// 	}
		// 	return token;
		// },
		// async session({ session, token }) {
		// 	console.log("inside session", token, session);
		// 	if (userAccount !== null) {
		// 		session.user = userAccount;
		// 	}

		// 	else if (typeof token.user !== typeof undefined && (typeof session.user === typeof undefined
		// 		//@ts-expect-error
		// 		|| (typeof session.user !== typeof undefined && typeof session.user.userId === typeof undefined))) {
		// 			//@ts-expect-error
		// 		session.user = token.user;
		// 	}
		// 	else if (typeof token !== typeof undefined) {
		// 		session.token = token;
		// 	}
		// 	return session;
		// },
	},
});
