import "../styles/globals.css";
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
						<AdminLayout />
						<Component {...pageProps} />
					</div>
				</ApolloProvider>
			</ThemeProvider>
		</React.Fragment>
	);
}
