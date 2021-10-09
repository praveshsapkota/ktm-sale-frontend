import React from "react";
import {
	useForm,
	SubmitHandler,
	Controller,
	NestedValue,
} from "react-hook-form";
import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@material-ui/core";
import { DevTool } from "@hookform/devtools";
import {
	FormFielsWrapper,
	BottomWrapper,
} from "components/AddProductForm/AddProductFrom.styles";
import Variants from "../components/AddProductForm/Variants_FieldArray";
import { useQuery } from "@apollo/client";
import { subCatagory_name } from "../graphql/Query/subCatagory";

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
			attributes: [
				{
					attrName: any;
					attrValue: any;
				}
			];
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
			],
		},
	],
};

interface props {}

const Test1: React.FC<props> = () => {
	const { data: subCatagoryData } = useQuery(subCatagory_name);
	const {
		register,
		handleSubmit,
		watch,
		control,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: defaultValue,
	});
	const value = watch();
	React.useEffect(() => {
		console.log(value);
		// console.log(Number(value.price));
	}, [value]);
	const onSubmit: SubmitHandler<FormValues> = async (value: any) => {
		console.log(value);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<Grid container columnSpacing={1} rowSpacing={10}>
				<Grid item xs={12} sm={12} md={12} lg={12} sx={{ margin: "3vw 2vh" }}>
					<Grid container columnGap={20} rowGap={3}>
						<Grid item xs={12} md={12} lg={12} sm={12}>
							<span
								style={{
									fontSize: "18px",
									fontFamily: "monospace",
									fontWeight: "600",
								}}
							>
								Add your Product description and necessary information from here
							</span>
						</Grid>
						<Grid
							item
							xs={12}
							md={12}
							lg={12}
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
								<Grid item xs={12} md={12} lg={12} sm={12}>
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
											rules={{ required: true }}
											render={({ field: { value, onChange } }) => (
												<Select
													labelId="demo-simple-select-autowidth-label"
													id="demo-simple-select-autowidth"
													label="Sub catagory"
													onChange={onChange}
													value={value}
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
								<Grid item xs={12} md={12} lg={12} sm={12}>
									<div
										style={{
											fontSize: "16px",
											fontFamily: "monospace",
											padding: "10px 0px 20px 0px",
											fontWeight: "600",
										}}
									>
										Add Product Variants below
									</div>
									<Variants {...{ control, register }} />
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
					// onClick={closeDrawer}
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
					// onClick={closeDrawer}
				>
					Submit
				</Button>
			</BottomWrapper>
			<DevTool control={control} />
		</form>
	);
};

export default Test1;
