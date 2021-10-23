import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

const prisma = new PrismaClient();

export default async function auth(req: any, res: any) {
	// console.log("inside auth function" , req,res);
	let userAccount: any = null;
	return await NextAuth(req, res, {
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
						placeholder: "your password",
					},
				},
				async authorize(credentials) {
					console.log("inside authorize", credentials);
					const hashedpassword = await hash(
						credentials.password,
						//@ts-expect-error
						process.env.secret
					);
					const user = await prisma.user.findFirst({
						where: {
							email: credentials.email,
						},
						select: {
							name: true,
							email: true,
							address: true,
							role: true,
							varified: true,
							contactNumber: true,
							status: true,
							password: true,
							emailVerified: true,
							image: true,
							billing: true,
							CartItem: true,
							sessions: true,
							accounts: true,
						},
					});
					if (user !== null) {
						const passwordValidity = await compare(
							hashedpassword,
							//@ts-expect-error
							user.password
						);
						if (passwordValidity) {
							return user;
						}
						return null;
					} else {
						return null;
					}
				},
			}),
		],
		secret: process.env.AUTH_SECRET,
		// cookie: {
		// 	secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
		// },
		session: {
			// jwt: true,
			maxAge: 60 * 60,
			updateAge: 60 * 60 * 24,
			// jwt: false,
		},
		jwt: {
			secret: process.env.JWT_SECRET,
			encryption: true,
		},
		pages: {
			signIn: "/Login",
		},
		theme: {
			colorScheme: "dark",
			logo: "/images/2.png",
		},
		callbacks: {
			signIn: async ({ user }) => {
				console.log("inside signin callback", user);
				return true
				// if (typeof user !== typeof undefined) {
				// 	if (user.role === "ADMIN") {
				// 		return true;
				// 	} else {
				// 		return false;
				// 	}
				// } else {
				// 	return false;
				// }
			},
			redirect: async ({ baseUrl, url }) => {
				return baseUrl;
			},
			session: async ({ session, token, user }) => {
				if (userAccount !== null) {
					session.user = userAccount;
				}
				//@ts-ignore
				session.user.role = user.role;
				//@ts-expect-error
				const signed_jwt = sign(session, process.env.JWT_BACKEND_SECRET);
				//@ts-expect-error
				session.user.apiAuthToken = signed_jwt;
				return session;
			},
		},
	});
}
