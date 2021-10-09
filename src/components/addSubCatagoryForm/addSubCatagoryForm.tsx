import { DevTool } from "@hookform/devtools";
import {
	IconButton,
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
	Button,
	Select,
	Grid,
} from "@material-ui/core";
import Uploder from "components/Uploder/Uploder";
import React from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Close } from "@material-ui/icons";
import {
	AddSubCatagoryForm_Wrapper,
	TopDiv,
	ImageUploadWrapper,
	BottomWrapper,
	FormFielsWrapper,
	FormTitle,
} from "./addSubCatagory.styles";
import { usedrawerStore } from "../../store/drawerStore";
import { useQuery, useMutation } from "@apollo/client";
import { addSubCatagory } from "../../graphql/Mutation/SubCatagory/addSubCatagory"
import { UpdateSubCatagoryWithImage, UpdateSubCatagoryWithoutImage } from "../../graphql/Mutation/SubCatagory/updateSubCatagory"
import { UploadImage } from "../../graphql/Mutation/imageUpload"
import { Catagory } from "../../graphql/Query/catagory";

interface props {
	data: any;
}

//formTypes
type FormValues = {
	name: string;
	slug: string;
	category: string;
	image: any[];
	tags: string[];
	status: string;
};


export const AddSubCatagoryForm: React.FC<props> = ({ data }) => {
	console.log(data);
	const { control, reset, watch, handleSubmit, setValue } = useForm<FormValues>(
		{
			defaultValues: data,
			mode: "all",
			shouldUnregister: false,
			reValidateMode: "onChange",
		}
	);
	//for the button click identification either its add or update
	const [ButtonState, SetButtonState] = React.useState("");

	const value = watch();
	React.useEffect(() => {
		console.log(value);
	}, [value]);

	//image upload handler from react DropZone
	const handleUploader = (files: any) => {
		setValue("image", files);
		console.log(files);
	};

	//catagoryDataFromQuery
	const {
		data: CatagoryData,
		error: CatagoryError,
		loading: CatagoryLoading,
	} = useQuery(Catagory);

	//Drawer control
	const usecloseDrawer = usedrawerStore((state) => state.toggleState);
	const closeDrawer = () => {
		usecloseDrawer("CLOSE_DRAWER", null, null);
	};

	//mutation to add Sub-catagory initialized here
	const [
		addSubCatagoryMutation,
		{ data: subCatagoryData, error: subCatagoryError, loading: subCatagoryLoading },
	] = useMutation(addSubCatagory);

	//mutation for update Sub-catagory with changed image initilized here
	const [
		Update_SubCatagoryWithImage,
		{ data: subCatagoryUpdateData,
			error: subCatagoryUpdateError,
			loading: subCatagoryUpdateLoading,
		},
	] = useMutation(UpdateSubCatagoryWithImage);

	//mutation for update Sub-catagory without changed image initilized here
	const [
		Update_SubCatagoryWithoutImage,
		{
			data: subCatagoryUpdateWithourImageData,
			error: subCatagoryUpdateWithourImageError,
			loading: subCatagoryUpdateWithourImageLoading,
		},
	] = useMutation(UpdateSubCatagoryWithoutImage);
	//mutation to add Images initialized here
	const [
		addImages,
		{
			data: ImagesLocationData,
			error: ImageUploadError,
			loading: ImageUploadLoading,
		},
	] = useMutation(UploadImage);


	//formSubmitHandler
	const onSubmit: SubmitHandler<FormValues> = async (value: any) => {
		console.log("submitted");
		console.log(value);
		ButtonState == "Add"
			?
			addImages({
				variables: {
					files: value.image,
				},
			}).then(
				async (res) => {
					console.log(res.data.S3ImageUpload);
					addSubCatagoryMutation({
						variables: {
							name: value.name,
							slug: value.slug,
							status: value.status,
							catagory: value.category,
							subCatagoryImage: res.data.S3ImageUpload,
							seoTags: value.tags,
						},
					}).then((res) => {
						console.log(res);
						closeDrawer();
					});
				},
				(err) => console.log(err)
			)
			:
			typeof value.image[0] == "object"
				?
				addImages({
					variables: {
						files: value.image,
					},
				}).then(
					async (res) => {
						console.log(res.data.S3ImageUpload);
						Update_SubCatagoryWithImage({
							variables: {
								subCatagoryImage: { set: res.data.S3ImageUpload },
								name: data.name,
								newName: { set: value.name },
								seoTags: { set: value.tags },
								slug: { set: value.slug },
								catagory: (value.category.name ? value.category.name : value.category),
								status: { set: value.status },
								// subCatagoryImage: res.data.S3ImageUpload,
								// name: data.name,
								// newName: value.name,
								// seoTags: value.tags,
								// slug: value.slug,
								// catagory: value.category,
								// status: value.status,
							},
						}).then((res) => {
							console.log(res);
							closeDrawer();
						});
					},
					(err) => console.log(err)
				)
				:
				Update_SubCatagoryWithoutImage({
					variables: {
						name: data.name,
						newName: { set: value.name },
						seoTags: { set: value.tags },
						slug: { set: value.slug },
						catagory: (value.category.name ? value.category.name : value.category),
						status: { set: value.status },
					},
				}).then((res) => {
					console.log(res);
					closeDrawer();
				});
	};


	return (
		<>
			<AddSubCatagoryForm_Wrapper>
				<TopDiv>
					{data ? (
						<FormTitle>Update Sub Catagory</FormTitle>
					) : (
						<FormTitle>Add Sub Catagory</FormTitle>
					)}
					<IconButton onClick={closeDrawer}>
						<Close fontSize="large" sx={{ justifyContent: "" }} />
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
											imageURL={data ? data.image : []}
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
							<Grid container columnGap={20} rowGap={3}>
								<Grid item xs={12} md={3} lg={4} sm={12}>
									<span
										style={{
											fontSize: "13px",
											fontWeight: 600,
											fontFamily: "monospace",
										}}
									>
										Enter necessary Information below
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
											<FormControl
												sx={{
													minWidth: "100%",
													backgroundColor: "whitesmoke",
												}}
											>
												<InputLabel sx={{ backgroundColor: "whitesmoke" }}>
													Category
												</InputLabel>
												<Controller
													name="category"
													control={control}
													rules={{ required: true }}
													render={({ field: { value, onChange } }) => (
														<Select
															id="demo-simple-select-autowidth"
															label="Sub catagory"
															onChange={onChange}
															defaultValue={data ? data.category.name : ""}
														// value={value.name}
														// value={value.name || ""}
														>
															{CatagoryData ? (
																CatagoryData.categories.map(
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
															label="Sub catagory"
															onChange={onChange}
															value={value || ""}
														>
															<MenuItem value={"true"}>true</MenuItem>
															<MenuItem value={"false"}>false</MenuItem>
														</Select>
													)}
												/>
											</FormControl>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
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

						{data == null ? (
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
								Add Sub Catagory
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
								Update Sub Catagory
							</Button>
						)}
					</BottomWrapper>
				</form>
				<DevTool control={control} />;
			</AddSubCatagoryForm_Wrapper>
		</>
	);
};
