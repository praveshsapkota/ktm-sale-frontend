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
import { useQuery } from "@apollo/client";
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
	status: boolean;
};

//formSubmitHandler
const onSubmit: SubmitHandler<FormValues> = async (value: any) => {
	console.log(value);
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
	const closeDrawer = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		usecloseDrawer("CLOSE_DRAWER", null, null);
	};

	return (
		<>
			<AddSubCatagoryForm_Wrapper>
				{/* {catagoryData} */}
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
															value={value.name || ""}
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
															value={JSON.stringify(value) || ""}
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
								Add Sub Catagory
							</Button>
						) : (
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
