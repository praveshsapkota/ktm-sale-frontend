import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	IconButton,
	Divider,
} from "@material-ui/core";
import React from "react";
import { Controller, ControllerProps, useFieldArray } from "react-hook-form";
import AttributeModal from "./Attributes_fieldArray";
import { DeleteForeverOutlined } from "@material-ui/icons";
import { datass } from "context/data";
let renderCount = 0;
interface Column {
	id:
	| "Variant Name"
	| "Sku"
	| "Price"
	| "Sale Price"
	| "Quantity"
	| "Discount Percentage"
	| "Attributes";
	label: string;
	minWidth?: number;
	align?: "center" | "left";
	subHeading?: string[];
}

const columns: readonly Column[] = [
	{ id: "Variant Name", label: "Variant Name", minWidth: 150, align: "center" },
	{ id: "Sku", label: "Sku", minWidth: 150, align: "center" },
	{
		id: "Price",
		label: "Price",
		minWidth: 80,
		align: "center",
	},
	{
		id: "Sale Price",
		label: "Sale\u00a0Price",
		minWidth: 80,
		align: "center",
	},
	{
		id: "Quantity",
		label: "Quantity",
		minWidth: 80,
		align: "center",
	},
	{
		id: "Discount Percentage",
		label: "Discount",
		minWidth: 80,
		align: "center",
	},
	{
		id: "Attributes",
		label: "Attributes",
		minWidth: 120,
		align: "center",
	},
];

const NumberInput = (arg: Omit<ControllerProps, "render">) => (
	<Controller
		{...arg}
		render={({ field }) => (
			<input
				autoComplete="off"
				type="number"
				width="20px"
				style={{
					padding: "10px",
				}}
				{...field}
				onChange={(e) =>
					field.onChange(
						Number.isNaN(parseFloat(e.target.value))
							? null
							: parseFloat(e.target.value)
					)
				}
			/>
		)}
	/>
);

export default function Fields({
	control,
	register,
	getValues,
	unregister,
	reset,
}: any) {
	const { fields, append, remove } = useFieldArray({
		control: control,
		name: "variants",
	});
	const [openAttrModal, setOpenAttrModal] = React.useState(false);
	const [indexState, SetindexState] = React.useState(Number);

	const handleOpen = () => setOpenAttrModal(true);
	const handleClose = () => setOpenAttrModal(false);
	renderCount++;
	const ModalForAttributes = () => {
		return (
			<AttributeModal
				// key={row.id}
				reset={reset}
				getValues={getValues}
				VariantIndex={indexState}
				ModalState={openAttrModal}
				handleClose={handleClose}
				handleOpen={handleOpen}
				control={control}
				register={register}
				unregister={unregister}
			/>
		);
	};

	return (
		<>
			<Paper elevation={5} sx={{ width: "98%", overflow: "hidden" }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader size="medium" aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => {
									return (
										<TableCell
											key={column.id}
											align={column.align}
											style={{ minWidth: column.minWidth }}
										>
											{column.label}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{fields.map((row, index) => {
								console.log(row);
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
										<TableCell align={"center"}>
											<input
												type="text"
												style={{
													outline: "none",
													padding: "10px ",
												}}
												{...register(`variants[${index}].varientName`, {
													require: true,
												})}
											/>
										</TableCell>
										<TableCell align={"center"}>
											<input
												type="text"
												autoComplete="off"
												style={{
													outline: "none",
													padding: "10px ",
												}}
												{...register(`variants[${index}].sku`, {
													require: true,
												})}
											/>
										</TableCell>
										<TableCell align={"center"}>
											<NumberInput
												control={control}
												name={`variants[${index}].price`}
											/>
										</TableCell>
										<TableCell align={"center"}>
											<NumberInput
												control={control}
												name={`variants[${index}].salePrice`}
											/>
										</TableCell>
										<TableCell align={"center"}>
											<NumberInput
												control={control}
												name={`variants[${index}].no_of_stocks`}
											/>
										</TableCell>
										<TableCell align={"center"}>
											<NumberInput
												control={control}
												name={`variants[${index}].discountPercentage`}
											/>
										</TableCell>
										<TableCell align={"center"}>
											<IconButton>
												<Button
													sx={{
														backgroundColor: "black",
														color: "white",
														display: "flex",
														":hover": { backgroundColor: "green" },
													}}
													onClick={() => {
														console.log(index);
														setOpenAttrModal(true);
														SetindexState(index);
													}}
												>
													Change
													<Divider
														orientation="vertical"
														sx={{
															color: "yellow",
															backgroundColor: "yellow",
															margin: "0px 5px 0px 5px",
														}}
														variant="fullWidth"
														flexItem
													/>
													<span>
														[
														{getValues(`variants[${index}].attributes`)
															? getValues(`variants[${index}].attributes`).length
															: 0}
														]
													</span>
												</Button>
											</IconButton>
											{
												openAttrModal ? ModalForAttributes() : "" // <AttributeModal
												// 	// key={row.id}
												// 	reset={reset}
												// 	getValues={getValues}
												// 	VariantIndex={indexState}
												// 	ModalState={openAttrModal}
												// 	handleClose={handleClose}
												// 	handleOpen={handleOpen}
												// 	control={control}
												// 	register={register}
												// 	unregister={unregister}
												// />
											}
											{console.log(ModalForAttributes())}
										</TableCell>
										<TableCell align={"center"}>
											<IconButton onClick={() => remove(index)}>
												<DeleteForeverOutlined />
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>

			<section
				style={{
					margin: "10px",
				}}
			>
				<Button
					sx={{
						color: "white",
						backgroundColor: "black",
						":hover": { backgroundColor: "green" },
					}}
					onClick={() => {
						append({
							varientName: "",
							sku: "",
							price: 0,
							salePrice: 0,
							no_of_stocks: 0,
							discountPercentage: 0,
						});
					}}
				>
					Add Variant
				</Button>
			</section>

			<span>Render Count: {renderCount}</span>
		</>
	);
}
