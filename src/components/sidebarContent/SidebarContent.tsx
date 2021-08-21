import * as React from "react";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItemButton from "@material-ui/core/ListItemButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import SettingsIcon from "@material-ui/icons/Settings";

import Link from "next/link";

export default function SelectedListItem() {
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	const handleListItemClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		index: number
	) => {
		setSelectedIndex(index);
	};

	return (
		<Box
			sx={{
				width: "60vw",
				maxWidth: 260,
				bgcolor: "#11101d",
				color: "white",
				height: "100vh",
				paddingTop: "12vh",
				alignItems: "center",
			}}
		>
			<Divider color="grey" />
			<List
				component="nav"
				aria-label="main mailbox folders"
				sx={{
					height: "60vh",
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "column",
				}}
			>
				<Link href="/">
					<ListItemButton
						selected={selectedIndex === 0}
						onClick={(event) => handleListItemClick(event, 0)}
					>
						<ListItemIcon>
							<DashboardRoundedIcon style={{ color: "white", fontSize: 30 }} />
						</ListItemIcon>
						<ListItemText
							primary="Dashboard"
							primaryTypographyProps={{
								fontSize: 20,
								letterSpacing: 1,
								// fontWeight: 'medium',
							}}
						/>
					</ListItemButton>
				</Link>

				<Link href="/setting">
					<ListItemButton
						selected={selectedIndex === 1}
						onClick={(event) => handleListItemClick(event, 1)}
					>
						<ListItemIcon>
							<SettingsIcon style={{ color: "white", fontSize: 30 }} />
						</ListItemIcon>
						<ListItemText
							primary="Setting"
							primaryTypographyProps={{
								fontSize: 20,
								letterSpacing: 1,
								// fontWeight: 'medium',
							}}
						/>
					</ListItemButton>
				</Link>

				<Link href="/orders">
					<ListItemButton
						selected={selectedIndex === 2}
						onClick={(event) => handleListItemClick(event, 2)}
					>
						<ListItemIcon>
							<ShoppingCartOutlinedIcon
								style={{ color: "white", fontSize: 30 }}
							/>
						</ListItemIcon>
						<ListItemText
							primary="Orders"
							primaryTypographyProps={{
								fontSize: 20,
								letterSpacing: 1,
								// fontWeight: 'medium',
							}}
						/>
					</ListItemButton>
				</Link>

				<Link href="/products">
					<ListItemButton
						selected={selectedIndex === 3}
						onClick={(event) => handleListItemClick(event, 3)}
					>
						<ListItemIcon>
							<ShoppingBasketRoundedIcon
								style={{ color: "white", fontSize: 30 }}
							/>
						</ListItemIcon>
						<ListItemText
							primary="Products"
							primaryTypographyProps={{
								fontSize: 20,
								letterSpacing: 1,
								// fontWeight: 'medium',
							}}
						/>
					</ListItemButton>
				</Link>

				<Link href="/catagories">
					<ListItemButton
						selected={selectedIndex === 4}
						onClick={(event) => handleListItemClick(event, 4)}
					>
						<ListItemIcon>
							<ListAltRoundedIcon style={{ color: "white", fontSize: 30 }} />
						</ListItemIcon>
						<ListItemText
							primary="Catagories"
							primaryTypographyProps={{
								fontSize: 20,
								letterSpacing: 1,
								// fontWeight: 'medium',
							}}
						/>
					</ListItemButton>
				</Link>

				{/* <Link href="/"> */}
				<ListItemButton
					selected={selectedIndex === 5}
					onClick={(event) => handleListItemClick(event, 5)}
				>
					<ListItemIcon>
						<ExitToAppTwoToneIcon style={{ color: "white", fontSize: 30 }} />
					</ListItemIcon>
					<ListItemText
						primary="Logout"
						primaryTypographyProps={{
							fontSize: 20,
							letterSpacing: 1,
							// fontWeight: 'medium',
						}}
					/>
				</ListItemButton>
				{/* </Link> */}

				{/* <Divider color="white"/> */}
			</List>
		</Box>
	);
}
