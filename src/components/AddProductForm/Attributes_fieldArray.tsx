import {
	Box,
	Button,
	Divider,
	Icon,
	IconButton,
	Modal,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import React from "react";
import { useFieldArray } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import { DeleteForeverOutlined } from "@material-ui/icons";

let renderCount = 0;
interface props {
	VariantIndex: any;
	control: any;
	register: any;
	ModalState: any;
	handleClose: () => void;
	handleOpen: () => void;
	getValues: any;
	unregister: any;
	reset: any;
}

interface Column {
	id: "Attribute Name" | "Value";
	label: string;
	minWidth?: number;
	align?: "center" | "left";
}

const columns: readonly Column[] = [
	{
		id: "Attribute Name",
		label: "Attribute Name",
		minWidth: 150,
		align: "center",
	},
	{ id: "Value", label: "Value", minWidth: 150, align: "center" },
];

const AttributeModal: React.FC<props> = ({
	handleClose,
	handleOpen,
	ModalState,
	control,
	register,
	VariantIndex,
	getValues,
	unregister,
	reset,
}) => {
	// let name = `variant[${VariantIndex}].attributes`;
	// console.log(getValues(name).length);
	const [AttrIndex, SetAttrIndex] = React.useState(Number);
	const indexx = 1;
	const { fields, append, remove } = useFieldArray({
		control: control,
		name: `variants[${VariantIndex}].attributes` as "variants.0.attributes",
	});
	// console.log("Modal no" + VariantIndex);
	return (
		<div>
			{/* <IconButton onClick={() => console.log("Modal no" + VariantIndex)}>
				<Button
					sx={{
						backgroundColor: "black",
						color: "white",
						display: "flex",
						// justifyContent: "space-around",
						":hover": { backgroundColor: "green" },
					}}
					onClick={handleOpen}
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
						{getValues(`variant[${VariantIndex}].attributes`)
							? getValues(`variant[${VariantIndex}].attributes`).length
							: 0}
						]
					</span>
				</Button>
			</IconButton> */}
			{/* <Button onClick={handleOpen}>Open modal</Button> */}
			<Modal open={ModalState} onClose={handleClose}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						backgroundColor: "white",
						alignItems: "center",
						position: "absolute" as "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "45vw",
						height: "45vh",
					}}
				>
					<IconButton
						sx={{ margin: "5px 5px 15px auto" }}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>

					<Paper elevation={5} sx={{ width: "90%", overflow: "hidden" }}>
						<TableContainer sx={{ maxHeight: 250 }}>
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
										return (
											<TableRow
												key={row.id}
												hover
												role="checkbox"
												tabIndex={-1}
											>
												<TableCell align={"center"}>
													<input
														type="text"
														style={{
															outline: "none",
															padding: "10px ",
														}}
														{...register(
															`variants[${VariantIndex}].attributes[${index}].attrName`,
															{
																require: true,
															}
														)}
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
														{...register(
															`variants[${VariantIndex}].attributes[${index}].attrValue`,
															{
																require: true,
															}
														)}
													/>
												</TableCell>

												<TableCell align={"center"}>
													<IconButton
														onClick={() => {
															SetAttrIndex(index);
															console.log(
																"VariantIndex = " + VariantIndex,
																"AttributeIndex = " + index
															);
															console.log(
																"non ",
																getValues(`variants[${VariantIndex}].attributes`)
															);
															console.log(
																"filtered",
																getValues(
																	`variants[${VariantIndex}].attributes`
																).filter((iteam: any, Arrindex: any) => {
																	return Arrindex != index;
																})
															);
															// reset(
															// 	getValues(
															// 		`variant[${VariantIndex}].attributes`
															// 	).filter((iteam: any, Arrindex: any) => {
															// 		return Arrindex != index;
															// 	})
															// );
															// reset({ ...getValues(), attrValue: "" });

															remove(index);
														}}
													>
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

					<div
						style={{
							margin: "25px 0px 0px 5px",
							display: "flex",
							justifyContent: "space-around",
							width: "100%",
						}}
					>
						<div>
							<Button
								sx={{
									color: "white",
									backgroundColor: "black",
									":hover": { backgroundColor: "green" },
								}}
								onClick={() => {
									append({ attrName: "", attrValue: null });
								}}
							>
								Add Attributes
							</Button>
						</div>
						<div>
							<Button
								sx={{
									color: "white",
									backgroundColor: "black",
									":hover": { backgroundColor: "green" },
								}}
								onClick={() => {
									console.log("non ", getValues().variants);
									console.log(
										"filtered",
										getValues().variants.filter((iteam: any, index: any) => {
											return index != indexx;
										})
									);
									// reset({});
									// handleClose();
								}}
							>
								Reset Attributes
							</Button>
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default AttributeModal;
