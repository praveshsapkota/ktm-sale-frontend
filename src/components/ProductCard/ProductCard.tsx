import { Box, Paper } from "@material-ui/core";
import React from "react";
import {
	ProductImageWrapper,
	NameWrapper,
	PriceWrapper,
} from "./Product.styles";

interface props {
	title: string;
	image: any;
	weight?: string;
	currency?: string;
	description?: string;
	price: number;
	salePrice?: number;
	orderId?: number;
	discountInPercent?: number;
	data: [any];
	form: () => void;
}
import { AddProductFrom } from "../AddProductForm/AddProductForm";

const Product = [
	{
		name: "jorden10",
		price: 100,
		discount: "20%",
		description:
			"fbshfshdkjksdj dkjhksdjhfksdkf dkjfksjdhf fjdskf kdjsfkjds dskfnskjdf sdfjsdfk skdjfhs",
		img: "https://ktmsale.s3.ap-south-1.amazonaws.com/wallpaperflare.com_wallpaper.jpg",
		quantity: "1pc(s)",
	},
];

export const ProductCard: React.FC<props> = ({
	title,
	image,
	weight,
	price,
	salePrice,
	discountInPercent,
	description,
	currency,
	data,
	orderId,

	...props
}) => {
	const [titlestate, setTitle] = React.useState(title);
	const [imagestate, setImage] = React.useState(image);
	const [weightstate, setWeight] = React.useState(weight);
	const [pricestate, setPrice] = React.useState(price);
	const [discountPercentstate, setDiscountPercent] =
		React.useState(discountInPercent);
	const [salePricestate, setSalePrice] = React.useState(salePrice);
	const [descriptionstate, setDescription] = React.useState(description);
	const [imageGallerystate, setImageGallery] = React.useState(data);
	let addForm;
	return (
		<div onClick={() => {}}>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					"& > :not(style)": {
						m: 1,
						width: 300,
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
					<img
						src={Product[0].img}
						alt={Product[0].name}
						style={{
							maxWidth: "100%",
							maxHeight: "100%",
							display: "inline-block",
						}}
					/>
					{/* </ProductImageWrapper> */}
					<NameWrapper>{Product[0].name}</NameWrapper>
					<PriceWrapper>RS.{Product[0].price}</PriceWrapper>
				</Paper>
			</Box>
			{addForm}
		</div>
	);
};
