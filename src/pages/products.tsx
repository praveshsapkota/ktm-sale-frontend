import React from "react";
import {
	Autocomplete,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@material-ui/core";
import { MainDiv } from "../styles/product.styles";
import { useQuery } from "@apollo/client";
import { getProducts } from "../graphql/Query/products";
import { usedrawerStore } from "store/drawerStore";
import { ProductTable } from "../components/ProductsTable/ProductTable"
interface props { }

export const Products: React.FC<props> = () => {
	const [catagory, setCatagory] = React.useState("");
	const [subCatagory, setSubCatagorySelector] = React.useState("");
	const useopenDrawer = usedrawerStore((state) => state.toggleState);
	const openDrawer = () => {
		useopenDrawer("OPEN_DRAWER", "CREATE_PRODUCT_FORM", null);
	};
	const {
		data: productsData,
		loading: productsLoading,
		error: productsError,
	} = useQuery(getProducts);

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

	return (
		<>
			<MainDiv>
				<Grid
					container
					rowSpacing="10"
					columnSpacing="10"
					sx={{
						justifyContent: "space-around",
						alignItems: "center",
						backgroundColor: "white",
						margin: "5px",
						marginBottom: "6vh",
						padding: "20px 0px",
						width: "90vw",
					}}
				>
					<Grid item xs={8} sm={8} md={2} style={{}}>
						<span
							style={{
								fontFamily: "sans-serif",
								fontSize: "20px",
								fontWeight: "bold",
								color: "Black",
							}}
						>
							Products
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
								<InputLabel
									id="demo-simple-select-autowidth-label"
									sx={{ backgroundColor: "whitesmoke" }}
								>
									Type
								</InputLabel>
								<Select
									labelId="demo-simple-select-autowidth-label"
									id="demo-simple-select-autowidth"
									value={catagory}
									onChange={handleChangeCatagory}
									label="Type"
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem value={10}>Twenty</MenuItem>
									<MenuItem value={21}>Twenty one</MenuItem>
									<MenuItem value={22}>Twenty one and a half</MenuItem>
								</Select>
							</FormControl>
						</div>
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
									label="Catagory"
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem value={10}>Twenty</MenuItem>
									<MenuItem value={21}>Twenty one</MenuItem>
									<MenuItem value={22}>Twenty one and a half</MenuItem>
								</Select>
							</FormControl>
						</div>
					</Grid>
					<Grid item xs={8} sm={8} md={2} style={{}}>
						<Autocomplete
							id="Search"
							freeSolo
							options={top100Films.map((option) => option.title)}
							renderInput={(params) => <TextField {...params} label="Search" />}
							sx={{ backgroundColor: "whitesmoke" }}
						/>
					</Grid>
					<Grid item xs={8} sm={8} md={2} style={{}}>
						<Button
							variant="contained"
							onClick={() => {
								console.log("clicked");
								openDrawer();
							}}
							sx={{
								padding: "10px",
								color: "white",
								backgroundColor: "black",
								boxShadow: "5px 5px 18px #726262, -5px -5px 18px #ffffff",
								":hover": { backgroundColor: "#3f9719", color: "white" },
								fontWeight: "600",
								letterSpacing: 1,
								fontSize: "14px",
								// textTransform: "none",
							}}
						>
							Add Product
						</Button>
					</Grid>
				</Grid>

				{productsData ? (
					// <Grid>
					// 	{productsData.products.map((iteam: any, index: any) => (
					// 		<Grid key={index}>
					// 			<ProductCard data={iteam} />
					// 		</Grid>
					// 	))}
					// </Grid>
					<ProductTable productData={productsData.products} />
				) : (
					console.log(productsError)
				)}
			</MainDiv>
		</>
	);
};
export default Products;

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
