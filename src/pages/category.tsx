import React from "react";
import Image from "next/image"
import { useQuery } from "@apollo/client";
import { Catagory } from "../graphql/Query/catagory";
import { subCatagory_name } from "../graphql/Query/subCatagory";
import {
	CatagoryWrapper,
	SubCatagoryWrapper,
	TopMenu,
	MainDiv,
	StatusFalse,
	StatusTrue,
} from "../styles/catagory.styles";
import {
	FormControl,
	Chip,
	InputLabel,
	MenuItem,
	Autocomplete,
	TextField,
	Grid,
	Select,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
} from "@material-ui/core";
import { usedrawerStore } from "../store/drawerStore";
import { Height } from "@material-ui/icons";
interface props { }

export const Catagories: React.FC<props> = () => {
	const [catagory, setCatagory] = React.useState("");
	const [subCatagory, setSubCatagorySelector] = React.useState("");
	const handleChangeCatagory = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setCatagory(event.target.value as string);
	};
	const handleChangeSubCatagory = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setSubCatagorySelector(event.target.value as string);
	};
	const {
		data: CatagoryData,
		error: CatagoryError,
		loading: CatagoryLoading,
	} = useQuery(Catagory);
	const {
		data: subCatagoryData,
		error: subCatagoryError,
		loading: subCatagoryLoading,
	} = useQuery(subCatagory_name);

	const useopenDrawer = usedrawerStore((state) => state.toggleState);

	const openAddCatagoryDrawer = () => {
		useopenDrawer("OPEN_DRAWER", "CATEGORY_FORM", null);
	};
	const openAddSubCatagoryDrawer = () => {
		useopenDrawer("OPEN_DRAWER", "SUBCATAGORY_FORM", null);
	};
	const openEditCatagoryDrawer = (data: any) => {
		useopenDrawer("OPEN_DRAWER", "CATEGORY_FORM", data);
	};
	const openEditSubCatagoryDrawer = (data: any) => {
		useopenDrawer("OPEN_DRAWER", "SUBCATAGORY_FORM", data);
	};

	return (
		<MainDiv>
			<TopMenu>
				<Paper elevation={6}>
					<Grid
						container
						rowSpacing="10"
						columnSpacing="10"
						sx={{
							justifyContent: "space-around",
							alignItems: "center",
							backgroundColor: "white",
							margin: "5px",
							padding: "20px 0px",
							width: "90vw",
						}}
					>
						<Grid item xs={8} sm={8} md={2} style={{}}>
							<span
								style={{
									fontFamily: "monospace",
									fontSize: "20px",
									fontWeight: "bold",
									color: "Black",
								}}
							>
								Catagory / SubCatagory
							</span>
						</Grid>
						<Grid item xs={8} sm={8} md={2} style={{}}>
							<div>
								<FormControl
									sx={{
										width: "100%",
										minWidth: 150,
										backgroundColor: "whitesmoke",
									}}
								>
									<InputLabel id="demo-simple-select-autowidth-label">
										Catagory
									</InputLabel>
									<Select
										labelId="demo-simple-select-autowidth-label"
										id="demo-simple-select-autowidth"
										value={subCatagory}
										onChange={handleChangeSubCatagory}
										// autoWidth
										label="Catagory"
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
								</FormControl>
							</div>
						</Grid>
						<Grid item xs={8} sm={8} md={2} style={{}}>
							<Autocomplete
								id="Search"
								freeSolo
								options={top100Films.map((option) => option.title)}
								renderInput={(params) => (
									<TextField {...params} label="Search" />
								)}
								sx={{ backgroundColor: "whitesmoke" }}
							/>
						</Grid>
						<Grid item xs={8} sm={8} md={2} style={{}}>
							<Button
								variant="contained"
								onClick={() => {
									console.log("clicked");
									openAddSubCatagoryDrawer();
								}}
								sx={{
									padding: "10px",
									color: "white",
									backgroundColor: "black",
									":hover": { backgroundColor: "#338610e8", color: "white" },
									fontWeight: "600",
									letterSpacing: 1,
									fontSize: "14px",
									// textTransform: "none",
								}}
							>
								Add Sub-Catagory
							</Button>
						</Grid>
						<Grid item xs={8} sm={8} md={2} style={{}}>
							<Button
								variant="contained"
								onClick={() => {
									console.log("clicked");
									openAddCatagoryDrawer();
									// openDrawer();
								}}
								sx={{
									padding: "10px",
									color: "white",
									backgroundColor: "black",
									":hover": { backgroundColor: "#3f9719", color: "white" },
									fontWeight: "600",
									letterSpacing: 1,
									fontSize: "14px",
									// textTransform: "none",
								}}
							>
								Add Catagory
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</TopMenu>
			<CatagoryWrapper>
				<div>
					<Paper elevation={8} sx={{ width: '100%', maxWidth: 1050, overflow: 'hidden' }}>
						<TableContainer sx={{ maxHeight: 400 }}>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										<TableCell align="center" colSpan={6}>
											Catagory
										</TableCell>
									</TableRow>
								</TableHead>
								<TableHead>
									<TableRow>
										<TableCell width={150} align="center">
											Image
										</TableCell>
										<TableCell width={200} align="center">
											Name
										</TableCell>
										<TableCell width={200} align="center">
											Slug
										</TableCell>
										<TableCell width={120} align="center">
											Status
										</TableCell>
										<TableCell width={250} align="center">
											Seo Tags
										</TableCell>
										<TableCell width={100} align="center">
											Edit
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{CatagoryData
										? CatagoryData.categories.map((iteam: any, index: any) => {
											return (
												<TableRow key={index}>
													<TableCell align="center">
														{iteam.image[0] ? <Image width={150} height={100} src={iteam.image[0]} alt={`${iteam.name} image `} /> : null}

													</TableCell>
													<TableCell align="center">{iteam.name}</TableCell>
													<TableCell align="center">{iteam.slug}</TableCell>
													<TableCell align="center">
														{iteam.status ? (
															<Button
																sx={{
																	backgroundColor: "#438a2d",
																	color: "black",
																	":hover": {
																		backgroundColor: "#438a2d",
																		color: "black",
																		cursor: "default",
																	},
																}}
															>
																{JSON.stringify(iteam.status)}
															</Button>
														) : (
															<Button
																sx={{
																	backgroundColor: "#e23f3f",
																	color: "white",
																	":hover": {
																		backgroundColor: "#e23f3f",
																		color: "white",
																		cursor: "default",
																	},
																}}
															>
																{JSON.stringify(iteam.status)}
															</Button>
														)}
													</TableCell>
													<TableCell align="center">
														{/* {iteam.tags.map(
															(chipIteam: any, index: number) => {
																return (
																	<Chip
																		sx={{ maxWidth: "6vw" }}
																		label={chipIteam}
																		variant="outlined"
																		key={index}
																	/>
																);
															}
														)} */}
														<span>
															{`[${iteam.tags}]`}
														</span>
													</TableCell>
													<TableCell align={"center"}>
														<Button
															sx={{
																backgroundColor: "black",
																color: "white",
																display: "flex",
																":hover": { backgroundColor: "green" },
															}}
															onClick={() => {
																openEditCatagoryDrawer(iteam);
															}}
														>
															Edit
														</Button>
													</TableCell>
												</TableRow>
											);
										})
										: ""}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</div>
			</CatagoryWrapper>
			<SubCatagoryWrapper>
				<div>
					<Paper elevation={8} sx={{ width: '100%', maxWidth: 1050, overflow: 'hidden' }}>
						<TableContainer sx={{ maxHeight: 400 }}>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										<TableCell align="center" colSpan={7}>
											Sub Catagory
										</TableCell>
									</TableRow>
								</TableHead>
								<TableHead>
									<TableRow>
										<TableCell width={150} align="center">
											Image
										</TableCell>
										<TableCell width={150} align="center">
											Name
										</TableCell>
										<TableCell width={150} align="center">
											Slug
										</TableCell>
										<TableCell width={200} align="center">
											Catagory
										</TableCell>
										<TableCell width={100} align="center">
											Status
										</TableCell>
										<TableCell width={250} align="center">
											Seo Tags
										</TableCell>
										<TableCell width={50} align="center">
											Edit
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{subCatagoryData
										? subCatagoryData.subCatagories.map(
											(iteam: any, index: any) => {
												return (
													<TableRow key={index}>
														<TableCell align="center">
															{iteam.image[0] ? <Image width={150} height={100} src={iteam.image[0]} alt={`${iteam.name} image `} /> : null}
														</TableCell>
														<TableCell align="center">{iteam.name}</TableCell>
														<TableCell align="center">{iteam.slug}</TableCell>
														<TableCell align="center">
															{iteam.category.name}
														</TableCell>
														<TableCell align="center">
															{iteam.status ? (
																<Button
																	sx={{
																		backgroundColor: "#438a2d",
																		color: "black",
																		":hover": {
																			backgroundColor: "#438a2d",
																			color: "black",
																			cursor: "default",
																		},
																	}}
																>
																	{JSON.stringify(iteam.status)}
																</Button>
															) : (
																<Button
																	sx={{
																		backgroundColor: "#e23f3f",
																		color: "white",
																		":hover": {
																			backgroundColor: "#e23f3f",
																			color: "white",
																			cursor: "default",
																		},
																	}}
																>
																	{JSON.stringify(iteam.status)}
																</Button>
															)}
														</TableCell>
														<TableCell align="center">
															{/* {iteam.tags.map(
																(chipIteam: any, index: number) => {
																	return (
																		<Chip
																			sx={{ maxWidth: "6vw" }}
																			label={chipIteam}
																			variant="outlined"
																			key={index}
																		/>
																	);
																}
															)} */}
															<span>
																{`[ ${iteam.tags} ]`}
															</span>
														</TableCell>
														<TableCell align={"center"}>
															<Button
																sx={{
																	backgroundColor: "black",
																	color: "white",
																	display: "flex",
																	":hover": { backgroundColor: "green" },
																}}
																onClick={() => {
																	openEditSubCatagoryDrawer(iteam);
																}}
															>
																Edit
															</Button>
														</TableCell>
													</TableRow>
												);
											}
										)
										: null}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</div>
			</SubCatagoryWrapper>
		</MainDiv >
	);
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
	{ title: "The Shawshank Redemption", year: 1994 },
	{ title: "The Godfather", year: 1972 },
	{ title: "The Godfather: Part II", year: 1974 },
	{ title: "The Dark Knight", year: 2008 },
	{ title: "12 Angry Men", year: 1957 },
	{ title: "Schindler's List", year: 1993 },
	{ title: "Pulp Fiction", year: 1994 },
	{
		title: "The Lord of the Rings: The Return of the King",
		year: 2003,
	},
	{ title: "The Good, the Bad and the Ugly", year: 1966 },
	{ title: "Fight Club", year: 1999 },
	{
		title: "The Lord of the Rings: The Fellowship of the Ring",
		year: 2001,
	},
	{
		title: "Star Wars: Episode V - The Empire Strikes Back",
		year: 1980,
	},
	{ title: "Forrest Gump", year: 1994 },
	{ title: "Inception", year: 2010 },
	{
		title: "The Lord of the Rings: The Two Towers",
		year: 2002,
	},
	{ title: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ title: "Goodfellas", year: 1990 },
	{ title: "The Matrix", year: 1999 },
	{ title: "Seven Samurai", year: 1954 },
	{
		title: "Star Wars: Episode IV - A New Hope",
		year: 1977,
	},
	{ title: "City of God", year: 2002 },
	{ title: "Se7en", year: 1995 },
	{ title: "The Silence of the Lambs", year: 1991 },
	{ title: "It's a Wonderful Life", year: 1946 },
	{ title: "Life Is Beautiful", year: 1997 },
	{ title: "The Usual Suspects", year: 1995 },
	{ title: "Léon: The Professional", year: 1994 },
	{ title: "Spirited Away", year: 2001 },
	{ title: "Saving Private Ryan", year: 1998 },
	{ title: "Once Upon a Time in the West", year: 1968 },
	{ title: "American History X", year: 1998 },
	{ title: "Interstellar", year: 2014 },
	{ title: "Casablanca", year: 1942 },
	{ title: "City Lights", year: 1931 },
	{ title: "Psycho", year: 1960 },
	{ title: "The Green Mile", year: 1999 },
	{ title: "The Intouchables", year: 2011 },
	{ title: "Modern Times", year: 1936 },
	{ title: "Raiders of the Lost Ark", year: 1981 },
	{ title: "Rear Window", year: 1954 },
	{ title: "The Pianist", year: 2002 },
	{ title: "The Departed", year: 2006 },
	{ title: "Terminator 2: Judgment Day", year: 1991 },
	{ title: "Back to the Future", year: 1985 },
	{ title: "Whiplash", year: 2014 },
	{ title: "Gladiator", year: 2000 },
	{ title: "Memento", year: 2000 },
	{ title: "The Prestige", year: 2006 },
	{ title: "The Lion King", year: 1994 },
	{ title: "Apocalypse Now", year: 1979 },
	{ title: "Alien", year: 1979 },
	{ title: "Sunset Boulevard", year: 1950 },
	{
		title:
			"Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
		year: 1964,
	},
	{ title: "The Great Dictator", year: 1940 },
	{ title: "Cinema Paradiso", year: 1988 },
	{ title: "The Lives of Others", year: 2006 },
	{ title: "Grave of the Fireflies", year: 1988 },
	{ title: "Paths of Glory", year: 1957 },
	{ title: "Django Unchained", year: 2012 },
	{ title: "The Shining", year: 1980 },
	{ title: "WALL·E", year: 2008 },
	{ title: "American Beauty", year: 1999 },
	{ title: "The Dark Knight Rises", year: 2012 },
	{ title: "Princess Mononoke", year: 1997 },
	{ title: "Aliens", year: 1986 },
	{ title: "Oldboy", year: 2003 },
	{ title: "Once Upon a Time in America", year: 1984 },
	{ title: "Witness for the Prosecution", year: 1957 },
	{ title: "Das Boot", year: 1981 },
	{ title: "Citizen Kane", year: 1941 },
	{ title: "North by Northwest", year: 1959 },
	{ title: "Vertigo", year: 1958 },
	{
		title: "Star Wars: Episode VI - Return of the Jedi",
		year: 1983,
	},
	{ title: "Reservoir Dogs", year: 1992 },
	{ title: "Braveheart", year: 1995 },
	{ title: "M", year: 1931 },
	{ title: "Requiem for a Dream", year: 2000 },
	{ title: "Amélie", year: 2001 },
	{ title: "A Clockwork Orange", year: 1971 },
	{ title: "Like Stars on Earth", year: 2007 },
	{ title: "Taxi Driver", year: 1976 },
	{ title: "Lawrence of Arabia", year: 1962 },
	{ title: "Double Indemnity", year: 1944 },
	{
		title: "Eternal Sunshine of the Spotless Mind",
		year: 2004,
	},
	{ title: "Amadeus", year: 1984 },
	{ title: "To Kill a Mockingbird", year: 1962 },
	{ title: "Toy Story 3", year: 2010 },
	{ title: "Logan", year: 2017 },
	{ title: "Full Metal Jacket", year: 1987 },
	{ title: "Dangal", year: 2016 },
	{ title: "The Sting", year: 1973 },
	{ title: "2001: A Space Odyssey", year: 1968 },
	{ title: "Singin' in the Rain", year: 1952 },
	{ title: "Toy Story", year: 1995 },
	{ title: "Bicycle Thieves", year: 1948 },
	{ title: "The Kid", year: 1921 },
	{ title: "Inglourious Basterds", year: 2009 },
	{ title: "Snatch", year: 2000 },
	{ title: "3 Idiots", year: 2009 },
];

export default Catagories;
