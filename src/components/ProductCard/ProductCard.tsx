import { Box, Paper } from "@material-ui/core";
import React from "react";
import {
	ProductImageWrapper,
	NameWrapper,
	PriceWrapper,
} from "./Product.styles";
import { useDrawerDispatch, useDrawerState } from "../../context/DrawerContext";
import Image from "next/image";
import { usedrawerStore } from "../../store/drawerStore";
interface props {
	data: any;
	// onclose: () => void;
}

export const ProductCard: React.FC<props> = ({ data }) => {
	console.log(data);
	const DrawerState = usedrawerStore((state) => state.drawerState);
	const useopenDrawer = usedrawerStore((state) => state.toggleState);
	const openDrawer = () => {
		useopenDrawer("OPEN_DRAWER", "UPDATE_PRODUCT_FORM", data);
	};

	return (
		<div
			onClick={async () => {
				console.log("touched card");
				openDrawer();
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					"& > :not(style)": {
						m: 1,
						width: 300,
						// backgroundColor: "black",
						// height: 200,
						display: "flex",
						flexDirection: "column",
						// alignItems: "center",
						// justifyContent: "center",
					},
				}}
			>
				<Paper elevation={5} sx={{ ":hover": {} }}>
					{/* <ProductImageWrapper> */}
					<Image
						src={data.image ? data.image : null}
						alt={data.name}
						width={100}
						height={100}
					// layout="responsive"
					// sizes = {}
					// style={{
					// 	maxWidth: "100%",
					// 	maxHeight: "100%",
					// 	display: "inline-block",
					// }}
					/>
					{/* </ProductImageWrapper> */}
					<NameWrapper>{data.name}</NameWrapper>
					<PriceWrapper>RS.{data.price}</PriceWrapper>
				</Paper>
			</Box>
		</div>
	);
};
