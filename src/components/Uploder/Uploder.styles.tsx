import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	outline: none;
	padding: 4vh 8vw;
	/* width: auto; */
	justify-content: center;
	border: #ccc3c3 2px dotted;
`;

export const ThumbsContainer = styled.div`
	padding-top: 2vh;
	display: flex;
	justify-content: space-around;
`;

export const Thumb = styled.div`
	padding: 1px;
	display: inline-flex;
	border: solid grey;
`;
