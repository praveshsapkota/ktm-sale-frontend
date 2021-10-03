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
} from "./AddProductFrom.styles";
import { Grid, TextField } from "@material-ui/core";
import Uploder from "../Uploder/Uploder";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { addProduct } from "../../graphql/Mutation/Product/AddProduct";
import { getS3Url } from "../../graphql/Query/getS3SignedUrl";
import { usedrawerStore } from "../../store/drawerStore";
import { DevTool } from "@hookform/devtools";
import Variants from "./Variants_FieldArray";
import { subCatagory_name } from "../../graphql/Query/subCatagory";

type props = any;
type FormValues = {
	name: string;
	subCatagory: string;
	description: string;
	MainImage: string[];
	variant: [
		{
			sku: string;
			varientName: string;
			price: number | null;
			no_of_stocks: number | null;
			salePrice: number | null;
			discountPercentage: number | null;
			attributes: any[];
		}
	];
};
const defaultValue: FormValues = {
	name: "pravesh",
	subCatagory: "toothpaste",
	description: "hero don",
	MainImage: ["ssda", "dasda"],
	variant: [
		{
			sku: "",
			varientName: "",
			price: null,
			no_of_stocks: null,
			salePrice: null,
			discountPercentage: null,
			attributes: [
				{
					attrName: "ddf",
					attrValue: "dffd",
				},
				{
					attrName: "ddf",
					attrValue: "dffd",
				},
			],
		},
	],
};

export const AddProductFrom: React.FC<props> = (props) => {
	const { data: subCatagoryData } = useQuery(subCatagory_name);
	const datas = props.data;
	// console.log(datas);
	const sleep = (ms: any) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};
	const [productDetails, { loading, error, data: addProductReturn }] =
		useMutation(addProduct);
	const [imgUrls, setImageUrls] = React.useState([] as any);
	const [imageAccessUrl, setimageAccessUrl] = React.useState([] as any);
	const [s3Uploadurl] = useLazyQuery(getS3Url, {
		onCompleted: async (d) => {
			console.log(d);
			setImageUrls([...imgUrls, d]);
			setimageAccessUrl([...imageAccessUrl, d.GetS3SecuredUrl.split("?")[0]]);
		},
	});

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

	// let imagefield: any = [];
	const imagefield = watch("MainImage");
	const value = watch();
	const PutFetch = async (url: any, photos: any) => {
		console.log("running put");
		photos.map(async (photos: any, i: any) => {
			await fetch(url[i].GetS3SecuredUrl, {
				method: "PUT",
				body: photos,
				headers: {
					"Content-Type": "image/jpeg",
				},
			});
			await sleep(1000);
			console.log(imageAccessUrl, imgUrls);
			if (imageAccessUrl.length == imgUrls.length) {
				console.log("triggered add product mutation");
				console.log(value);
				productDetails({
					variables: {
						name: value.name,
						price: value.price,
						sku: value.Sku,
						description: value.description,
						unit: value.unit,
						discount: value.discount,
						subCatagory: value.SubCatagory,
						salePrice: value.salePrice,
						productThumbnail: imageAccessUrl,
					},
				});
			}
		});
		await sleep(5000);
		setImageUrls([]);
		setimageAccessUrl([]);
	};

	React.useEffect(() => {
		console.log(JSON.stringify(value.variant));
	}, [value]);
	React.useEffect(() => {
		console.log("useeffect");
		if (imagefield) {
			if (imgUrls.length == imagefield.length && imgUrls.length != 0) {
				PutFetch(imgUrls, imagefield);
			}
		}
	}, [imgUrls]);

	const onSubmit: SubmitHandler<FormValues> = async (value: any) => {
		console.log("add product");
		// console.log(value);
		for (let f of imagefield) {
			s3Uploadurl({
				variables: {
					imgname: f.path,
				},
			});
			await sleep(2000);
		}
	};

	//Drawer control
	const usecloseDrawer = usedrawerStore((state) => state.toggleState);
	const closeDrawer = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		usecloseDrawer("CLOSE_DRAWER", null, null);
	};

	const handleUploader = (files: any) => {
		setValue("image", files);
		console.log(files);
	};

	// const catagoryData = () => {
	// 	if (loading) {
	// 		console.log("loading");
	// 		return null;
	// 	}
	// 	if (error) {
	// 		console.log(error);
	// 		return error;
	// 	}
	// 	// console.log(addProductReturn);
	// 	return addProductReturn;
	// };
	// catagoryData();
	return (
		<>
			<MainDiv>
				{/* {catagoryData} */}
				<TopDiv>
					<FormTitle>Add / Update Products</FormTitle>
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
												fontSize: "13px",
												fontWeight: 600,
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
											imageURL={datas ? datas.image : []}
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
							sx={{ margin: "2vw 2vh" }}
						>
							<FormFielsWrapper>
								<span>Enter necessary Information below</span>
								<Grid
									container
									rowSpacing={3}
									paddingY={3}
									paddingX={2}
									sx={{ alignItems: "center", justifyContent: "center" }}
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
														labelId="demo-simple-select-autowidth-label"
														id="demo-simple-select-autowidth"
														label="Sub catagory"
														onChange={onChange}
														value={value || ""}
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
								</Grid>
								<Grid
									container
									rowSpacing={3}
									paddingY={3}
									paddingX={2}
									sx={{ alignItems: "center", justifyContent: "center" }}
								>
									<Grid item xs={12} md={12} lg={12} sm={12}>
										<span>Add Products Varients Below</span>
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

						<Button
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
							Submit
						</Button>
					</BottomWrapper>
				</form>
				<DevTool control={control} />;
			</MainDiv>
		</>
	);
};
