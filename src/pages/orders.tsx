import React from "react";
import styled from "styled-components";
import { Grid, Paper } from "@material-ui/core";

interface props {}

// const OrdersDiv = styled.div`
// 	background-color: whitesmoke;
// 	display: flex;
// `;

// const TopGrid = styled.div`
// 	background-color: white;
// 	width: 70vw;
// `;

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		flexGrow: 1,
// 	},
// 	paper: {
// 		padding: theme.spacing(2),
// 		textAlign: "center",
// 		color: theme.palette.text.secondary,
// 	},
// }));

const Orders: React.FC<props> = () => {
	// return <OrdersDiv>hellow</OrdersDiv>;
	return (
		<div>
			<div></div>
			<Grid container>
				<h1>hellow</h1>
			</Grid>
		</div>
	);
};

export default Orders;
