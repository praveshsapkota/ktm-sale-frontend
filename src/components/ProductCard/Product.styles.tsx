import styled from "styled-components";

export const ProductImageWrapper = styled.div`
	height: "240px";
	padding: "5px";
	position: "relative";
	overflow: "hidden";
	display: "flex";
	align-items: "center";
	justify-content: "center";

	@media only screen and (max-width: 767px) {
		height: "165px";
	}
`;

export const NameWrapper = styled.div``;

export const PriceWrapper = styled.div``;

// export const Image = styled.div`
// 	max-width: "100%";
// 	max-height: "100%";
// 	display: "inline-block";
// `;
