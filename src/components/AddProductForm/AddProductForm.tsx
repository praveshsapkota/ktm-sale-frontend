import {
	Button,
	Drawer,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
} from "@material-ui/core";
import React from "react";
import CancelIcon from "@material-ui/icons/Close";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useDrawerState, useDrawerDispatch } from "../../context/DrawerContext";
import {
	TopDiv,
	FormTitle,
	MainDiv,
	ImageUploadWrapper,
	FormFielsWrapper,
	BottomWrapper,
} from "./AddProductFrom.styles";
import { Grid, TextField } from "@material-ui/core";
import Uploder from "../Uploder/Uploder";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { addProduct } from "../../graphql/Mutation/AddProduct";
import { getS3Url } from "../../graphql/Query/getS3SignedUrl";
// import { AnyStyledComponent } from "styled-components";

interface props {
	name?: string;
	image?: any;
	weight?: string;
	currency?: string;
	description?: string;
	price?: number;
	salePrice?: number;
	orderId?: number;
	discountInPercent?: number;
	data?: any;
}

type formType = {
	title: string;
	image: [any];
	descriptions: string;
	unit: number;
	price: number;
	salePrice: number;
	discount: number;
	productQuantity: number;
	subCatagory: string;
	catagory: string;
	Sku: string;
};

const datas = {
	title: "Toothpaste",
	descriptions: "sensodine toothpaste",
	image: [
		"https://ktmsale.s3.ap-south-1.amazonaws.com/wallpaperflare.com_wallpaper.jpg",
		"https://ktmsale.s3.ap-south-1.amazonaws.com/wallpaperflare.com_wallpaper.jpg",
	],
	weight: "200g",
	currency: "Rs.",
	unit: 1,
	catagory: "Electronics",
	Sku: "kkxz",
	salePrice: 135,
	subCatagory: "toothpaste",
	productQuantity: 25,
	price: 150,
	discount: 15,
};

export const AddProductFrom: React.FC<props> = (props) => {
	const sleep = (ms: any) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};
	const [productDetails, { loading, error, data: addProductReturn }] =
		useMutation(addProduct);
	const [imgUrls, setImageUrls] = React.useState([] as any);
	const [s3Uploadurl] = useLazyQuery(getS3Url, {
		onCompleted: async (d) => {
			console.log(d);
			setImageUrls([...imgUrls, d]);
		},
	});

	const {
		// register,
		handleSubmit,
		watch,
		control,
		setValue,
		formState: { errors },
	} = useForm<formType>({
		defaultValues: datas,
	});

	const imagefield = watch("image");
	const PutFetch = (url: any, photos: any) => {
		photos.map((photos: any, i: any) => {
			fetch(url[i].GetS3SecuredUrl, {
				method: "PUT",
				body: photos,
				headers: {
					"Content-Type": "image/jpeg",
				},
			});
			sleep(1000);
		});
	};
	React.useEffect(() => {
		console.log("useeffect");
		if (imgUrls.length == imagefield.length) {
			PutFetch(imgUrls, imagefield);
		}
	}, [imagefield, imgUrls]);

	const onSubmit: SubmitHandler<formType> = async (value: any) => {
		for (let f of imagefield) {
			s3Uploadurl({
				variables: {
					imgname: f.path,
				},
			});
			await sleep(1000);
		}

		// productDetails({
		// 	variables: {
		// 		name: value.title,
		// 		price: value.price,
		// 		sku: value.Sku,
		// 		description: value.descriptions,
		// 		unit: value.unit,
		// 		discount: value.discount,
		// 		subCatagory: value.subCatagory,
		// 		salePrice: value.salePrice,
		// 		productThumbnail: value.image,
		// 	},
		// });
	};

	//Drawer control
	const DrawerState = useDrawerState("isOpen");
	const dispatch = useDrawerDispatch();
	const closeDrawer = React.useCallback(
		() => dispatch({ type: "CLOSE_DRAWER" }),
		[dispatch]
	);

	const handleUploader = (files: any) => {
		setValue("image", files);
		console.log(files);
	};

	const catagoryData = () => {
		if (loading) {
			console.log("loading");
			return null;
		}
		if (error) {
			console.log(error);
			return error;
		}
		// console.log(addProductReturn);
		return addProductReturn;
	};
	catagoryData();
	return (
		<>
			<Drawer anchor={"right"} open={DrawerState} onClose={closeDrawer}>
				<MainDiv>
					{/* {catagoryData} */}
					<TopDiv>
						<FormTitle>Add / Update Products</FormTitle>
						<IconButton onClick={closeDrawer}>
							<CancelIcon fontSize="large" sx={{ justifyContent: "" }} />
						</IconButton>
					</TopDiv>
					<form onSubmit={handleSubmit(onSubmit)} noValidate>
						<Grid container columnSpacing={1} rowSpacing={10}>
							<Grid
								item
								xs={12}
								sm={12}
								md={12}
								lg={12}
								sx={{ alignItems: "center", margin: "3vw 2vh" }}
							>
								<ImageUploadWrapper>
									<Grid container columnGap={20} rowGap={3}>
										<Grid item xs={12} md={3} lg={4} sm={12}>
											<span
												style={{
													fontSize: "13px",
													fontWeight: "600",
													fontFamily: "monospace",
												}}
											>
												Upload your Image here
											</span>
										</Grid>

										<Grid
											item
											xs={12}
											md={6}
											lg={6}
											sm={12}
											sx={{
												backgroundColor: "white",
												padding: "10px",
												minHeight: "150px",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Uploder
												onChange={handleUploader}
												imageURL={datas.image[0]}
												control={control}
												name="image"
											/>
										</Grid>
									</Grid>
								</ImageUploadWrapper>
							</Grid>
							<Grid
								item
								xs={12}
								sm={12}
								md={12}
								lg={12}
								sx={{ margin: "3vw 2vh" }}
							>
								<FormFielsWrapper>
									<Grid container columnGap={20} rowGap={3}>
										<Grid item xs={12} md={3} lg={4} sm={12}>
											<span
												style={{
													fontSize: "13px",
													fontFamily: "monospace",
													fontWeight: "600",
												}}
											>
												Add your Product description and necessary information
												from here
											</span>
										</Grid>
										<Grid
											item
											xs={12}
											md={6}
											lg={6}
											sm={12}
											sx={{
												backgroundColor: "white",
												padding: "5px",
												margin: "5px",
												display: "flex",
											}}
										>
											<Grid container rowSpacing={3} paddingY={3} paddingX={2}>
												<Grid item xs={12} md={12} lg={12} sm={12}>
													<Controller
														name="title"
														control={control}
														defaultValue={datas.title}
														rules={{ required: true }}
														render={({ field }) => (
															<TextField
																fullWidth
																label="Name"
																variant="outlined"
																required
																style={{ backgroundColor: "whitesmoke" }}
																{...field}
															/>
														)}
													/>
												</Grid>
												<Grid item xs={12} md={12} lg={12} sm={12}>
													<Controller
														name="descriptions"
														control={control}
														defaultValue={datas.descriptions}
														rules={{ required: true }}
														render={({ field }) => (
															<TextField
																fullWidth
																label="Descriptions"
																variant="outlined"
																required
																style={{ backgroundColor: "whitesmoke" }}
																{...field}
															/>
														)}
													/>
												</Grid>
												<Grid item xs={12} md={12} lg={12} sm={12}>
													<Controller
														name="unit"
														control={control}
														// defaultValue={data.unit}
														rules={{ required: true }}
														render={({ field }) => (
															<TextField
																fullWidth
																label="Unit"
																variant="outlined"
																required
																style={{ backgroundColor: "whitesmoke" }}
																{...field}
															/>
														)}
													/>
												</Grid>
												<Grid item xs={12} md={12} lg={12} sm={12}>
													<Controller
														name="Sku"
														control={control}
														// defaultValue={data.unit}
														rules={{ required: true }}
														render={({ field }) => (
															<TextField
																fullWidth
																label="Sku"
																variant="outlined"
																required
																style={{ backgroundColor: "whitesmoke" }}
																{...field}
															/>
														)}
													/>
												</Grid>
												<Grid item xs={12} md={12} lg={12} sm={12}>
													<Controller
														name="price"
														control={control}
														// defaultValue={data.price}
														rules={{ required: true }}
														render={({ field }) => (
															<TextField
																fullWidth
																label="Price"
																variant="outlined"
																required
																style={{ backgroundColor: "whitesmoke" }}
																{...field}
															/>
														)}
													/>
												</Grid>
												<Grid item xs={12} md={12} lg={12} sm={12}>
													<Controller
														name="salePrice"
														control={control}
														// defaultValue={data.salePrice}
														rules={{ required: true }}
														render={({ field }) => (
															<TextField
																fullWidth
																label="Sale Price"
																variant="outlined"
																required
																style={{ backgroundColor: "whitesmoke" }}
																{...field}
															/>
														)}
													/>
												</Grid>
												<Grid item xs={12} md={12} lg={12} sm={12}>
													<Controller
														name="discount"
														control={control}
														// defaultValue={data.title}
														rules={{ required: true }}
														render={({ field }) => (
															<TextField
																fullWidth
																label="Discount Percent"
																variant="outlined"
																required
																style={{ backgroundColor: "whitesmoke" }}
																{...field}
															/>
														)}
													/>
												</Grid>
												<Grid item xs={12} md={12} lg={12} sm={12}>
													<Controller
														name="productQuantity"
														control={control}
														// defaultValue={data.productQuantity}
														rules={{ required: true }}
														render={({ field }) => (
															<TextField
																fullWidth
																label="productQuantity"
																variant="outlined"
																required
																style={{ backgroundColor: "whitesmoke" }}
																{...field}
															/>
														)}
													/>
												</Grid>
												<Grid item xs={12} md={12} lg={12} sm={12}>
													<FormControl
														sx={{
															minWidth: "100%",
															backgroundColor: "whitesmoke",
														}}
													>
														<InputLabel
															id="demo-simple-select-autowidth-label"
															sx={{ backgroundColor: "whitesmoke" }}
														>
															Sub Catagory
														</InputLabel>
														<Controller
															name="subCatagory"
															control={control}
															// defaultValue={data.subCatagory}
															rules={{ required: true }}
															render={({ field }) => (
																<Select
																	labelId="demo-simple-select-autowidth-label"
																	id="demo-simple-select-autowidth"
																	label="Sub catagory"
																	{...field}
																>
																	<MenuItem value="">
																		<em>None</em>
																	</MenuItem>
																	<MenuItem value={"toothpaste"}>
																		toothpaste
																	</MenuItem>
																	<MenuItem value={"SElectronics"}>
																		Sub Electronics
																	</MenuItem>
																	<MenuItem value={"Electronics"}>
																		Electronics
																	</MenuItem>
																</Select>
															)}
														/>
													</FormControl>
												</Grid>
												<Grid item xs={12} md={12} lg={12} sm={12}>
													<FormControl
														sx={{
															minWidth: "100%",
															backgroundColor: "whitesmoke",
														}}
													>
														<InputLabel
															id="demo-simple-select-autowidth-label"
															sx={{ backgroundColor: "whitesmoke" }}
														>
															Catagory
														</InputLabel>
														<Controller
															name="catagory"
															control={control}
															// defaultValue={data.}
															rules={{ required: true }}
															render={({ field }) => (
																<Select
																	labelId="demo-simple-select-autowidth-label"
																	id="demo-simple-select-autowidth"
																	label="Sub catagory"
																	{...field}
																>
																	<MenuItem value="">
																		<em>None</em>
																	</MenuItem>
																	<MenuItem value={"toothpaste"}>
																		sub Grocery
																	</MenuItem>
																	<MenuItem value={"SElectronics"}>
																		Sub Electronics
																	</MenuItem>
																	<MenuItem value={"Electronics"}>
																		Electronics
																	</MenuItem>
																</Select>
															)}
														/>
													</FormControl>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</FormFielsWrapper>
							</Grid>
						</Grid>
						<BottomWrapper>
							<Button
								variant="text"
								size="medium"
								sx={{ width: "30vw", color: "red" }}
								onClick={closeDrawer}
							>
								Cancle
							</Button>

							<Button
								variant="contained"
								type="submit"
								size="medium"
								sx={{
									width: "30vw",
									backgroundColor: "green",
									fontWeight: "600",
								}}
								onClick={closeDrawer}
							>
								Submit
							</Button>
						</BottomWrapper>
					</form>
				</MainDiv>
			</Drawer>
		</>
	);
};
