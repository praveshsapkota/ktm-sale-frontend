import styled from "styled-components";

export const SocialLinkContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 160px;
	max-height: 350px;
	margin-top: 3vh;
	align-items: flex-start;
	justify-content: space-between;
`;

export const SocialLoginLinks = styled.div`
	display: flex;
	/* justify-content: space-around; */
	align-items: center;
	border: 1px solid #000000;
	border-radius: 5px;
	background: #4b47471a;
    /* background :  #3b5998; */
	backdrop-filter: blur(10px);
	width: 20vw;
	min-width: 250px;
	max-width: 300px;
	&:hover{
		cursor: pointer;
	}
`;
export const SocialLoginText = styled.span`
	display: flex;
	align-items: flex-start;
	margin-left: 10px;
	color: white;
	font-size: medium;
	font-weight: 500;
`;

export const SocialLoginImage = styled.div`
	margin: 3px 0px 2px 2px;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;
export const CredentialsLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
	margin-top: 2vh;
	width: 20vw;
	height: 180px;
	max-height: 220px;
	min-width: 250px;
	max-width: 300px;
`;
