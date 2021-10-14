import "../styles/globals.css";
import { DrawerProvider } from "context/DrawerContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "../utils/ApolloClient";
import { Header } from "../layout/header/Header";

import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";
import AdminLayout from "layout/header/layout";
import { SessionProvider } from "next-auth/react";
import { getSession } from "next-auth/react";
import RouteGuard from "../utils/routeGuard";

export default function MyApp(props: AppProps) {
	const { Component, pageProps } = props;
	return (
		<React.Fragment>
			<Head>
				<title>KtmSale</title>
				<link href="/favicon.ico" rel="icon" />
				<meta
					content="minimum-scale=1, initial-scale=1, width=device-width"
					name="viewport"
				/>
			</Head>
			<SessionProvider session={pageProps.session}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<ApolloProvider client={client}>
						<div
							style={{
								backgroundColor: "whitesmoke",
								alignItems: "center",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
						>
							<RouteGuard>
								{/* <DrawerProvider>
							<Header />
							<Component {...pageProps} />
						</DrawerProvider> */}
								<AdminLayout />
								<Component {...pageProps} />
							</RouteGuard>
						</div>
					</ApolloProvider>
				</ThemeProvider>
			</SessionProvider>
		</React.Fragment>
	);
}
