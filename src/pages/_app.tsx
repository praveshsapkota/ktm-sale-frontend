import "../styles/globals.css";
import type { AppProps } from "next/app";
// import dynamic from "next/dynamic";
import { DrawerProvider } from "context/DrawerContext";
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import { client } from "../utils/ApolloClient";
import { Header } from "../layout/header/Header";

function MyApp({ Component, pageProps }: AppProps) {
	// const Header = dynamic(() => import("../layout/header/Header"), {
	// 	ssr: false,
	// });
	// const getCatagories = gql`
	// 	query Catagory {
	// 		categories {
	// 			name
	// 		}
	// 	}
	// `;

	// const { loading, error, data } = useQuery(getCatagories);

	// const catagoryData = () => {
	// 	if (loading) {
	// 		console.log("loading");
	// 		return null;
	// 	}
	// 	if (error) {
	// 		console.log(error);
	// 		return error;
	// 	}
	// 	console.log(data);
	// 	return data;
	// };

	return (
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
				<DrawerProvider>
					<Header />
					<Component {...pageProps} />
				</DrawerProvider>
				{/* {catagoryData} */}
			</div>
		</ApolloProvider>
	);
}
export default MyApp;
