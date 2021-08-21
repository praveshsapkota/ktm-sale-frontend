import React from "react";
import styled from "styled-components";
import image from "../../public/logo1.png";

const Catagorie = styled.div`
	/* background-color: whitesmoke; */
	overflow-x: scroll;
`;

interface props {}

export const Catagories: React.FC<props> = () => {
	return (
		<div style={{ display: "flex" }}>
			hellow
			{/* <img src={image} alt="" /> */}
		</div>
	);
};

export default Catagories;
