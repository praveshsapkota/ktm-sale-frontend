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
	Divider,
	IconButton,
	InputAdornment,
	OutlinedInput,
} from "@material-ui/core";
import Image from "next/image";
import {
	signIn,
	signOut,
	useSession,
	getProviders,
	getCsrfToken,
} from "next-auth/react";
import {
	SocialLoginLinks,
	SocialLoginText,
	SocialLoginImage,
	SocialLinkContainer,
	CredentialsLogin,
} from "../styles/login.style";
import { VisibilityOff, Visibility } from "@material-ui/icons";

type FormValues = {
	email: string;
	password: string;
	csrfToken: string;
};

interface props {}

const Login: React.FC<props> = () => {
	// const { data, status } = useSession()
	const [providers, setProviders] = React.useState<any>();
	const [csrfToken, setCsrfToken] = React.useState<any>(async () => {
		const csrf = await getCsrfToken();
		console.log(csrf);
		setCsrfToken(csrf);
	});

	const [showPassword, setShowPassword] = React.useState(false);
	React.useEffect(() => {
		async function SetProvider() {
			const setupProvider = await getProviders();
			console.log("setupProvider", setupProvider);
			setProviders(setupProvider);
		}
		async function SetCsrfToken() {
			const setupCsrfToken = await getCsrfToken();
			console.log("setupProvider", setupCsrfToken);
			// setCsrfToken(setupCsrfToken);
		}
		SetProvider();
		// SetCsrfToken();
	}, []);
	const {
		register,
		handleSubmit,
		watch,
		control,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({});
	const value = watch();
	React.useEffect(() => {
		console.log(value);
		// console.log(Number(value.price));
	}, [value]);
	const onSubmit: SubmitHandler<FormValues> = async (value: any) => {
		const res = await fetch(
			"http://localhost:3000/api/auth/callback/credentials",
			{
				method: "post",
				body: value,
			}
		);
		console.log(res);
	};

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="LoginBackground">
			<div className="authPanal">
				<span
					style={{
						color: "white",
						fontFamily: "fantasy",
						fontSize: "35px",
						fontWeight: 600,
						letterSpacing: "4px",
						marginTop: "4vh",
					}}
				>
					Login
				</span>
				<SocialLinkContainer>
					{providers?.google ? (
						<SocialLoginLinks
							style={{ backgroundColor: "white" }}
							onClick={() => {
								signIn(providers.google.id);
							}}
						>
							<SocialLoginImage>
								<Image
									width="40px"
									height="40px"
									src="https://img.icons8.com/color/48/000000/google-logo.png"
									alt="G"
								/>
								<SocialLoginText style={{ color: "black" }}>
									Continue with Google
								</SocialLoginText>
							</SocialLoginImage>
						</SocialLoginLinks>
					) : null}

					{providers?.github ?  (
						<SocialLoginLinks
							style={{ backgroundColor: "white" }}
							onClick={() => {
								signIn(providers.github.id);
							}}
						>
							<SocialLoginImage>
								<Image
									width="40px"
									height="40px"
									src="https://img.icons8.com/color/48/000000/google-logo.png"
									alt="G"
								/>
								<SocialLoginText style={{ color: "black" }}>
									Continue with Github
								</SocialLoginText>
							</SocialLoginImage>
						</SocialLoginLinks>
					) : null}

					<SocialLoginLinks>
						<SocialLoginImage>
							<Image
								width="40px"
								height="40px"
								src="https://img.icons8.com/ios-filled/50/000000/mac-os.png"
								alt=" A"
							/>
							<SocialLoginText>Continue with Apple</SocialLoginText>
						</SocialLoginImage>
					</SocialLoginLinks>
					<SocialLoginLinks style={{ backgroundColor: "#3b5998" }}>
						<SocialLoginImage>
							{/* <Image width="40px" height="40px" src="https://img.icons8.com/ios/50/000000/facebook--v1.png" alt="f" /> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								width="40"
								height="45"
								viewBox="0 0 172 172"
								style={{ fill: "#000000" }}
							>
								<g
									fill="none"
									fillRule="nonzero"
									stroke="none"
									strokeWidth="1"
									strokeLinecap="butt"
									strokeLinejoin="miter"
									strokeMiterlimit="10"
									strokeDasharray=""
									strokeDashoffset="0"
									fontFamily="none"
									fontWeight="none"
									fontSize="none"
									textAnchor="none"
									style={{ mixBlendMode: "normal" }}
								>
									<path d="M0,172v-172h172v172z" fill="none"></path>
									<g id="original-icon" fill="#ffffff">
										<path d="M86,10.32c-41.796,0 -75.68,33.884 -75.68,75.68c0,37.9432 27.95,69.27128 64.36928,74.74432v-54.68568h-18.72392v-19.89352h18.72392v-13.23712c0,-21.91624 10.67776,-31.53792 28.89256,-31.53792c8.72384,0 13.33688,0.64672 15.52128,0.94256v17.36512h-12.42528c-7.73312,0 -10.43352,7.33064 -10.43352,15.59352v10.87384h22.66272l-3.07536,19.89352h-19.58736v54.84736c36.93872,-5.01208 65.43568,-36.59472 65.43568,-74.906c0,-41.796 -33.884,-75.68 -75.68,-75.68z"></path>
									</g>
								</g>
							</svg>
							<SocialLoginText style={{ color: "white" }}>
								Continue with Facebook
							</SocialLoginText>
						</SocialLoginImage>
					</SocialLoginLinks>
				</SocialLinkContainer>
				<div
					style={{
						color: "black",
						width: "60%",
						marginTop: "1vh",
						fontSize: "20px",
						fontFamily: "monospace",
					}}
				>
					<Divider variant="middle" color="white">
						or
					</Divider>
				</div>
				{providers?.credentials ? (
					<form
						method="post"
						action="http://localhost:3000/api/auth/callback/credentials"
					>
						<CredentialsLogin>
							<input
								{...register("csrfToken")}
								type="hidden"
								defaultValue={csrfToken}
							/>
							<div
								className="email"
								style={{
									backgroundColor: "white",
									borderRadius: "5px",
								}}
							>
								<Controller
									name="email"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<TextField
											fullWidth
											label="email"
											variant="outlined"
											placeholder="example@gmail.com"
											autoComplete="off"
											{...field}
										/>
									)}
								/>
							</div>
							<div>
								<FormControl
									fullWidth
									sx={{
										minWidth: "100%",
										backgroundColor: "white",
										borderRadius: "10px",
									}}
									variant="outlined"
								>
									<InputLabel htmlFor="outlined-adornment-password">
										Password
									</InputLabel>
									<Controller
										name="password"
										control={control}
										rules={{ required: true }}
										render={({ field: { value, onChange } }) => (
											<OutlinedInput
												id="outlined-adornment-password"
												fullWidth
												style={{ backgroundColor: "white" }}
												type={showPassword ? "text" : "password"}
												onChange={onChange}
												endAdornment={
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword}
															onMouseDown={handleMouseDownPassword}
															edge="end"
														>
															{showPassword ? (
																<VisibilityOff />
															) : (
																<Visibility />
															)}
														</IconButton>
													</InputAdornment>
												}
												label="Password"
											/>
										)}
									/>
								</FormControl>
							</div>
							<Button
								type="submit"
								style={{
									backgroundColor: "#e6e0e033",
									fontSize: "15px",
									color: "black",
									border: "1px solid #000000",
									marginTop: "5px",
								}}
							>
								Login
							</Button>
						</CredentialsLogin>
					</form>
				) : null}
			</div>
		</div>
	);
};

export default Login;
