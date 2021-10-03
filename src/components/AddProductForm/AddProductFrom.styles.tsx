import styled from "styled-components";

export const MainDiv = styled.div`
	background-color: whitesmoke;
	/* padding: 2px; */
	width: 85vw;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
`;

export const TopDiv = styled.div`
	padding: 8px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	background-color: whitesmoke;
	z-index: 100;
`;

export const FormTitle = styled.div`
	font-size: medium;
	font-weight: 600;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

export const ImageUploadWrapper = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	margin-top: "10vh";
`;

export const FormFielsWrapper = styled.div`
	width: 98%;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	justify-content: space-between;
`;

export const BottomWrapper = styled.div`
	/* height: 100px; */
	display: flex;
	padding: 3vh 0px;
	align-items: center;
	background-color: white;
	justify-content: space-around;
	position: -webkit-sticky;
	position: sticky;
	bottom: 0;
	z-index: 100;
	border-top: solid 3px whitesmoke;
`;
