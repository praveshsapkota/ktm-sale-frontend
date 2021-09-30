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
	AddCatagoryForm_Wrapper,
	TopDiv,
	ImageUploadWrapper,
	BottomWrapper,
	FormTitle,
} from "./addCatagoryForm.styles";
import { useMutation } from "@apollo/client";
import { addCatagory } from "../../graphql/Mutation/Catagory/addCatagory";
import {
	UpdateCatagoryWithImage,
	UpdateCatagoryWithoutImage,
} from "../../graphql/Mutation/Catagory/updateCatagory";
import { UploadImage } from "../../graphql/Mutation/imageUpload";
import { usedrawerStore } from "../../store/drawerStore";

interface props {
	data: any;
}
//formTypes
type FormValues = {
	name: string;
	slug: string;
	image: any[];
	tags: any;
	status: string;
};

export const AddCatagoryForm: React.FC<props> = ({ data }) => {
	console.log("www", data);
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
		// if(typevalue[0] == )
		// if (typeof value.image[0] == "object") console.log("true its object")
		console.log(value);
	}, [value]);
	//image upload handler from react DropZone
	const handleUploader = (files: any) => {
		setValue("image", files);
		console.log(files);
	};

	//mutation to add product initialized here
	const [
		addCatagoryMutation,
		{ data: catagoryData, error: catagoryError, loading: catagoryLoading },
	] = useMutation(addCatagory);

	//mutation for update catagory with changed image initilized here
	const [
		UpdateCatagoryMutation,
		{
			data: catagoryUpdateData,
			error: catagoryUpdateError,
			loading: catagoryUpdateLoading,
		},
	] = useMutation(UpdateCatagoryWithImage);

	//mutation for update catagory without changed image initilized here
	const [
		UpdateCatagoryWithourImageMutation,
		{
			data: catagoryUpdateWithourImageData,
			error: catagoryUpdateWithourImageError,
			loading: catagoryUpdateWithourImageLoading,
		},
	] = useMutation(UpdateCatagoryWithoutImage);
	//mutation to add Images initialized here
	const [
		addImages,
		{
			data: ImagesLocationData,
			error: ImageUploadError,
			loading: ImageUploadLoading,
		},
	] = useMutation(UploadImage);

	//Drawer control
	const usecloseDrawer = usedrawerStore((state) => state.toggleState);
	const closeDrawer = (event?: { preventDefault: () => void }) => {
		console.log("inside close Drawer");
		// event.preventDefault();
		usecloseDrawer("CLOSE_DRAWER", null, null);
	};

	//formSubmitHandler
	const onSubmit: SubmitHandler<FormValues> = async (value: any) => {
		console.log("submitted");
		console.log(value);
		const StatusValue = () => {
			return new Promise((resolve) => {
				value.status === "false" ? resolve(false) : resolve(true);
			});
		};
		console.log("statusValue", await StatusValue());
		ButtonState == "Add"
			?
			addImages({
				variables: {
					files: value.image,
				},
			}).then(
				async (res) => {
					console.log(res.data.S3ImageUpload);
					addCatagoryMutation({
						variables: {
							name: value.name,
							slug: value.slug,
							status: value.status,
							catagoryImage: res.data.S3ImageUpload,
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
						UpdateCatagoryMutation({
							variables: {
								catagoryImage: { set: res.data.S3ImageUpload },
								name: data.name,
								newName: { set: value.name },
								seoTags: { set: value.tags },
								slug: { set: value.slug },
								status: { set: value.status },
								// name: data.name,
								// newName : value.name,
								// slug: value.slug,
								// status: await StatusValue(),
								// catagoryImage: res.data.S3ImageUpload,
								// seoTags: value.tags,
							},
						}).then((res) => {
							console.log(res);
							closeDrawer();
						});
					},
					(err) => console.log(err)
				)
				:
				UpdateCatagoryWithourImageMutation({
					variables: {
						name: data.name,
						newName: { set: value.name },
						seoTags: { set: value.tags },
						slug: { set: value.slug },
						status: { set: value.status },
						// name: data.name,
						// newName : value.name,
						// slug: value.slug,
						// status: await StatusValue(),
						// catagoryImage: res.data.S3ImageUpload,
						// seoTags: value.tags,
					},
				}).then((res) => {
					console.log(res);
					closeDrawer();
				});
	};
	return (
		<>
			<AddCatagoryForm_Wrapper>
				<TopDiv>
					{data ? (
						<FormTitle>Update Catagory</FormTitle>
					) : (
						<FormTitle>Add Catagory</FormTitle>
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
											<Controller
												name="tags"
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<TextField
														fullWidth
														label="SeoTags"
														variant="outlined"
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
															// value={value || ""}
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
								type="submit"
								variant="contained"
								size="medium"
								sx={{
									width: "30vw",
									backgroundColor: "green",
									fontWeight: "600",
								}}
							>
								Add Catagory
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
							>
								Update Catagory
							</Button>
						)}
					</BottomWrapper>
				</form>
				<DevTool control={control} />;
			</AddCatagoryForm_Wrapper>
		</>
	);
};
