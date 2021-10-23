/* eslint-disable @next/next/no-img-element */
import {
	Button,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
} from "@material-ui/core";
import React from "react";
import CancelIcon from "@material-ui/icons/Close";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import {
	TopDiv,
	FormTitle,
	MainDiv,
	ImageUploadWrapper,
	FormFielsWrapper,
	BottomWrapper,
} from "../AddProductForm/addProductFrom.styles";
import { Grid, TextField } from "@material-ui/core";
import Uploder from "../Uploder/Uploder";
import { useQuery, useMutation } from "@apollo/client";
import { addProduct } from "../../graphql/Mutation/Product/AddProduct";
import {
	UpdateProductWithOnlyThumbnail,
	UpdateProductWithonlyProductImages,
	UpdateProductWithoutImage,
	UpdateProductWithbothImage,
} from "../../graphql/Mutation/Product/UpdateProduct";
import { UploadImage } from "../../graphql/Mutation/imageUpload";
import { usedrawerStore } from "../../store/drawerStore";
import { DevTool } from "@hookform/devtools";
import Variants from "./variants_FieldArray";
import { subCatagory_name } from "../../graphql/Query/subCatagory";
import { snackBarStore } from "../../store/snackBarStore";

type props = any;
type FormValues = {
	name: string;
	subCatagory: object | string;
	description: string;
	thumbnail: string[];
	productImages: string[];
	slug: string;
	status: string;
	tags: string;
	variants: [
		{
			sku: string;
			varientName: string;
			varientImage: String;
			price: number | null;
			no_of_stocks: number | null;
			salePrice: number | null;
			discountPercentage: number | null;
			variantImage : string | null;
			attributes: [
				{
					attrName: string;
					attrValue: string | number | null;
				}
			];
		}
	];
};
// const defaultValue: FormValues = {
// 	name: "pravesh",
// 	subCatagory: "toothpaste",
// 	description: "hero don",
// 	thumbnail: "https://ktmsale.s3.ap-south-1.amazonaws.com/1.jpg",
// 	productImages: [
// 		"https://ktmsale.s3.ap-south-1.amazonaws.com/1.jpg",
// 		"https://ktmsale.s3.ap-south-1.amazonaws.com/1.jpg",
// 	],
// 	variants: [
// 		{
// 			sku: "",
// 			varientName: "",
// 			varientImage: "",
// 			price: null,
// 			no_of_stocks: null,
// 			salePrice: null,
// 			discountPercentage: null,
// 			attributes: [
// 				{
// 					attrName: "",
// 					attrValue: "",
// 				}
// 			],
// 		},
// 		{
// 			sku: "",
// 			varientName: "",
// 			varientImage: "",
// 			price: null,
// 			no_of_stocks: null,
// 			salePrice: null,
// 			discountPercentage: null,
// 			attributes: [
// 				{
// 					attrName: "ddf",
// 					attrValue: "dffd",
// 				},
// 				{
// 					attrName: "ddf",
// 					attrValue: "dffd",
// 				},
// 			],
// 		},
// 	],
// };

export const AddProductFrom: React.FC<props> = (props) => {
	const { data: subCatagoryData } = useQuery(subCatagory_name);

	//getting snackbar from the store
	const snackbarOpen = snackBarStore((state) => state.toogleSnackBar);

	//for the button click identification either its add or update
	const [ButtonState, SetButtonState] = React.useState("");

	const datas = props.data;
	// console.log("at product add form ", datas);
	const sleep = (ms: any) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};
	// FORM CONTROL AND INITIALIZITION
	const {
		handleSubmit,
		register,
		watch,
		control,
		setValue,
		reset,
		unregister,
		getValues,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: datas,
		// defaultValues: defaultValue,
		mode: "all",
		shouldUnregister: false,
		reValidateMode: "onChange",
	});
	const value = watch();
	React.useEffect(() => {
		console.log(value);
		// console.log(JSON.stringify(value.variant));
	}, [value]);

	//Drawer control
	const usecloseDrawer = usedrawerStore((state) => state.toggleState);
	const closeDrawer = () => {
		usecloseDrawer("CLOSE_DRAWER", null, null);
	};
	//handel Product Images dropzone to registered form
	const handleUploader = (files: any) => {
		setValue("productImages", files);
		console.log(files);
	};

	//handels product thumbnail dropzone to registered form
	const handThumbnailleUploader = (files: any) => {
		setValue("thumbnail", files);
		console.log(files);
	};

	//MUTATION FOR IMAGES UPLOAD
	const [
		addImages,
		{
			data: ImagesLocationData,
			error: ImageUploadError,
			loading: ImageUploadLoading,
		},
	] = useMutation(UploadImage);

	//mutation for add product
	const [
		addproduct,
		{ data: productdata, error: addProductError, loading: addProductLoading },
	] = useMutation(addProduct);

	//mutation for update product without Image
	const [updateProductWithoutImg] = useMutation(UpdateProductWithoutImage);

	//mutation for update product with both Image
	const [updateProductWithImg] = useMutation(UpdateProductWithbothImage);

	//mutation for update product with only thumbnail
	const [updateProductWithonlythumbnail] = useMutation(
		UpdateProductWithOnlyThumbnail
	);

	//mutation for update product with only Product Images
	const [updateProductWithonlyImg] = useMutation(
		UpdateProductWithonlyProductImages
	);

	//onSubmit Handler
	const onSubmit: SubmitHandler<FormValues> = async (value: any) => {
		console.log("onSubmit clicked");
		var thumbnailAccessUrls: any = null;
		if (ButtonState == "Add") {
			await sleep(1000);
			console.log("inside add product");
			addImages({
				variables: {
					files: value.thumbnail,
				},
			})
				.then((thumbRes) => {
					thumbnailAccessUrls = thumbRes.data.S3ImageUpload[0];
					addImages({
						variables: {
							files: value.productImages,
						},
					})
						.then((imagesRes) => {
							addproduct({
								variables: {
									name: value.name,
									slug: value.slug,
									description: value.description,
									subCategory: value.subCatagory,
									productThumbnail: thumbnailAccessUrls,
									productImage: imagesRes.data.S3ImageUpload,
									status: value.status,
									seoTags: value.tags,
									variants: value.variants,
								},
							})
								.then((res) => {
									console.log(res);
									closeDrawer();
									snackbarOpen("OPEN", "Added new Product", "success");
								})
								.catch((err) => {
									console.log(err, "error adding new product");
									snackbarOpen("OPEN", "error adding new product", "error");
								});
						})
						.catch((err) => {
							console.log(err, "unable to upload product Images");
							snackbarOpen("OPEN", "unable to upload product Images", "error");
						});
				})
				.catch((err) => {
					console.log(err, "unable to upload thumbnail");
					snackbarOpen("OPEN", "unable to upload thumbnail", "error");
				});
		} else {
			const mutationType = () => {
				if (
					typeof value.thumbnail == "string" &&
					typeof value.productImages[0] == "string"
				)
					return "withoutImage";
				else if (
					typeof value.thumbnail[0] == "object" &&
					typeof value.productImages[0] == "object"
				)
					return "withBothImage";
				else if (
					typeof value.thumbnail == "string" &&
					typeof value.productImages[0] == "object"
				)
					return "withOnlyProductImage";
				else
					typeof value.thumbnail[0] == "object" &&
						typeof value.productImages[0] == "string";
				return "withOnlyProductThumbnail";
			};
			console.log("inside update");
			switch (mutationType()) {
				case "withoutImage": {
					console.log("inside without image ");
					return updateProductWithoutImg({
						variables: {
							name: value.name,
							newSlug: value.slug,
							slug: datas.slug,
							description: value.description,
							subCatagory: value.subCatagory.name
								? value.subCatagory.name
								: value.subCatagory,
							status: value.status,
							seoTags: value.tags,
							variants: value.variants,
						},
					})
						.then((res) => {
							console.log("sss", res.data);
							closeDrawer();
							snackbarOpen(
								"OPEN",
								`updated Product ${res.data.updateOneProduct.name}`,
								"success"
							);
						})
						.catch((err) => {
							console.log(err, "error updating  product withoutImages");
							snackbarOpen(
								"OPEN",
								"unable to update product server error",
								"error"
							);
						});
				}
				case "withBothImage": {
					console.log("inside both image");
					return addImages({
						variables: {
							files: value.thumbnail,
						},
					})
						.then((thumbRes) => {
							thumbnailAccessUrls = thumbRes.data.S3ImageUpload[0];
							addImages({
								variables: {
									files: value.productImages,
								},
							})
								.then((imagesRes) => {
									updateProductWithImg({
										variables: {
											name: value.name,
											newSlug: value.slug,
											slug: datas.slug,
											description: value.description,
											subCatagory: value.subCatagory.name
												? value.subCatagory.name
												: value.subCatagory,
											productThumbnail: thumbnailAccessUrls,
											productImage: imagesRes.data.S3ImageUpload,
											status: value.status,
											seoTags: value.tags,
											variants: value.variants,
										},
									})
										.then((res) => {
											console.log(res);
											closeDrawer();
										})
										.catch((err) => {
											console.log(err, "error updating  product");
										});
								})
								.catch((err) => {
									console.log(err, "unable to upload product Images");
								});
						})
						.catch((err) => {
							console.log(err, "unable to upload thumbnail");
						});
				}
				case "withOnlyProductImage": {
					console.log("inside productImage only");
					return addImages({
						variables: {
							files: value.productImages,
						},
					})
						.then((imagesRes) => {
							updateProductWithonlyImg({
								variables: {
									name: value.name,
									newSlug: value.slug,
									slug: datas.slug,
									description: value.description,
									subCatagory: value.subCatagory.name
										? value.subCatagory.name
										: value.subCatagory,
									productImage: imagesRes.data.S3ImageUpload,
									status: value.status,
									seoTags: value.tags,
									variants: value.variants,
								},
							})
								.then((res) => {
									console.log(res);
									closeDrawer();
								})
								.catch((err) => {
									console.log(err, "error updating  product");
								});
						})
						.catch((err) => {
							console.log(err, "unable to upload product Images");
						});
				}
				case "withOnlyProductThumbnail": {
					console.log("inside thumbnail only");
					return addImages({
						variables: {
							files: value.thumbnail,
						},
					})
						.then((thumbRes) => {
							thumbnailAccessUrls = thumbRes.data.S3ImageUpload[0];
							updateProductWithonlythumbnail({
								variables: {
									name: value.name,
									newSlug: value.slug,
									slug: datas.slug,
									description: value.description,
									subCatagory: value.subCatagory.name
										? value.subCatagory.name
										: value.subCatagory,
									productThumbnail: thumbnailAccessUrls,
									status: value.status,
									seoTags: value.tags,
									variants: value.variants,
								},
							})
								.then((res) => {
									console.log(res);
									closeDrawer();
								})
								.catch((err) => {
									console.log(err, "error updating  product");
								});
						})
						.catch((err) => {
							console.log(err, "unable to upload thumbnail");
						});
				}

				default: {
					console.log(
						"a",
						typeof value.thumbnail,
						typeof value.productImages[0]
					);
				}
			}
		}
	};

	return (
		<>
			<MainDiv>
				{/* {catagoryData} */}
				<TopDiv>
					{datas ? (
						<FormTitle>Update Product</FormTitle>
					) : (
						<FormTitle>Add Product</FormTitle>
					)}
					<IconButton onClick={closeDrawer}>
						<CancelIcon fontSize="large" sx={{ justifyContent: "" }} />
					</IconButton>
				</TopDiv>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<Grid container columnSpacing={1} rowSpacing={5}>
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
												fontSize: "18px",
												fontWeight: 600,
												fontFamily: "monospace",
											}}
										>
											Images Section
										</span>
									</Grid>
									<Grid container columnGap={20} rowGap={8}>
										<Grid container rowGap={1}>
											<Grid item xs={12} md={4} lg={4} sm={12}>
												<span
													style={{
														fontSize: "12px",
														fontWeight: 600,
														fontFamily: "monospace",
														marginBottom: "1rem",
													}}
												>
													Product Thumbnail / main Display photo
												</span>
											</Grid>
											<Grid
												item
												xs={12}
												md={12}
												lg={8}
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
												{/* <div>
													<input
														type="file"
														{...register("thumbnail", { required: true })}
														onChange={(e) => {
															e.target.files[0]
																? setproductThumbnail({
																	image: URL.createObjectURL(
																		e.target.files[0]
																	),
																})
																: null;
														}}
													/>
													{productThumbnail.image ? (
														<Thumb>
															<img
																width="150px"
																height="100px"
																src={productThumbnail.image}
																alt="productThumbnail"
															/>
														</Thumb>
													) : null}
												</div> */}
												<Uploder
													onChange={handThumbnailleUploader}
													imageURL={datas ? [datas.thumbnail] : []}
													control={control}
													name="thumbnail"
												/>
											</Grid>
										</Grid>
										<Grid container rowGap={1}>
											<Grid item xs={12} md={4} lg={4} sm={12}>
												<span
													style={{
														fontSize: "12px",
														fontWeight: 600,
														fontFamily: "monospace",
													}}
												>
													Upload Product Images Below
												</span>
											</Grid>
											<Grid
												item
												xs={12}
												md={12}
												lg={8}
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
													imageURL={datas ? datas.productImages : []}
													control={control}
													name="productImages"
												/>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</ImageUploadWrapper>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={12} sx={{ margin: "1vh" }}>
							<FormFielsWrapper>
								<span
									style={{
										fontSize: "18px",
										fontWeight: 600,
										fontFamily: "monospace",
									}}
								>
									Enter necessary Information below
								</span>
								<Grid
									container
									rowSpacing={3}
									paddingY={3}
									paddingX={2}
									// sx={{
									// 	backgroundColor: "white",
									// 	width: "90%",
									// 	// padding: "10px",
									// 	// minHeight: "150px",
									// 	// display: "flex",
									// 	justifyContent: "center",
									// 	alignItems: "center",
									// }}
									sx={{
										alignItems: "center",
										justifyContent: "center",
										color: "white",
									}}
								>
									<Grid item xs={12} md={12} lg={11} sm={12}>
										<Controller
											name="name"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<TextField
													fullWidth
													label="Name"
													variant="outlined"
													style={{ backgroundColor: "whitesmoke" }}
													{...field}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} md={12} lg={11} sm={12}>
										<Controller
											name="slug"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<TextField
													fullWidth
													label="Slug"
													variant="outlined"
													autoComplete="off"
													style={{ backgroundColor: "whitesmoke" }}
													{...field}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} md={12} lg={11} sm={12}>
										<Controller
											name="description"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<TextField
													fullWidth
													label="Description"
													variant="outlined"
													autoComplete="off"
													style={{ backgroundColor: "whitesmoke" }}
													{...field}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} md={12} lg={11} sm={12}>
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
												rules={{ required: true }}
												render={({ field: { value, onChange } }) => (
													<Select
														id="demo-simple-select-autowidth"
														label="Sub catagory"
														onChange={onChange}
														// value={value || ""}
														defaultValue={datas ? datas.subCatagory.name : ""}
													>
														{subCatagoryData ? (
															subCatagoryData.subCatagories.map(
																(iteam: any, index: any) => {
																	return (
																		<MenuItem key={index} value={iteam.name}>
																			<em>{iteam.name}</em>
																		</MenuItem>
																	);
																}
															)
														) : (
															<MenuItem value={undefined}>
																<em>None</em>
															</MenuItem>
														)}
													</Select>
												)}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={12} md={12} lg={11} sm={12}>
										<Controller
											name="tags"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<TextField
													fullWidth
													label="SeoTags"
													variant="outlined"
													autoComplete="off"
													style={{ backgroundColor: "whitesmoke" }}
													{...field}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} md={12} lg={11} sm={12}>
										<FormControl
											sx={{
												minWidth: "100%",
												backgroundColor: "whitesmoke",
											}}
										>
											<InputLabel>Status</InputLabel>
											<Controller
												name="status"
												control={control}
												rules={{ required: true }}
												render={({ field: { value, onChange } }) => (
													<Select
														id="demo-simple-select-autowidth"
														label="status"
														onChange={onChange}
														defaultValue={value || ""}
													>
														<MenuItem value={"true"}>true</MenuItem>
														<MenuItem value={"false"}>false</MenuItem>
													</Select>
												)}
											/>
										</FormControl>
									</Grid>
								</Grid>
								<Grid
									container
									rowSpacing={3}
									paddingY={3}
									paddingX={2}
									sx={{ alignItems: "center", justifyContent: "center" }}
								>
									<Grid item xs={12} md={12} lg={12} sm={12}>
										<span
											style={{
												fontSize: "12px",
												fontWeight: 600,
												fontFamily: "monospace",
											}}
										>
											Add Products Varients Below
										</span>
									</Grid>
									<Grid item xs={12} md={12} lg={12} sm={12}>
										<Variants
											{...{ control, register, getValues, unregister, reset }}
										/>
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
							Cancel
						</Button>
						{datas == null ? (
							<Button
								onClick={() => SetButtonState("Add")}
								variant="contained"
								type="submit"
								size="medium"
								sx={{
									width: "30vw",
									backgroundColor: "green",
									fontWeight: "600",
								}}
							>
								Add Product
							</Button>
						) : (
							<Button
								onClick={() => SetButtonState("Update")}
								variant="contained"
								type="submit"
								size="medium"
								sx={{
									width: "30vw",
									backgroundColor: "green",
									fontWeight: "600",
								}}
							// onClick={closeDrawer}
							>
								Update Product
							</Button>
						)}
					</BottomWrapper>
				</form>
				<DevTool control={control} />;
			</MainDiv>
		</>
	);
};
