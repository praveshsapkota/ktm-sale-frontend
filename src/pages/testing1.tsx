import React from "react";
import { useQuery } from "@apollo/client";
import { getProducts } from "../graphql/Query/products";
import { snackBarStore } from "../store/snackBarStore";

interface props { }

const ProductTesting: React.FC<props> = () => {
	const snackbarStore = snackBarStore((state) => state.toogleSnackBar);
	return (
		<>
			<button
				onClick={() => {
					snackbarStore("OPEN", "fuck you its error", "error");
					return;
				}}
			>
				error
			</button>
			<button
				onClick={() => {
					snackbarStore("OPEN", "fuck you its success", "success");
					return;
				}}
			>
				success
			</button>
			<button
				onClick={() => {
					snackbarStore("OPEN", "fuck you its info", "info");
					return;
				}}
			>
				info
			</button>
			<button
				onClick={() => {
					snackbarStore("OPEN", "fuck you its warning", "warning");
					return;
				}}
			>
				warning
			</button>
		</>
	);
};
export default ProductTesting;
