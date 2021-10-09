import * as React from "react";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import SettingsIcon from "@material-ui/icons/Settings";
import { SideBarText, SidebarContent } from "./sidebarContent.styles";
import Link from "next/link";
import { Button, List, Box, Divider } from "@material-ui/core";

interface props {
	DrawerToggle: () => void;
}

const content = [
	{
		icon: <DashboardRoundedIcon style={{ fontSize: "30px", color: "white" }} />,
		href: "/",
		name: "Dashboard",
	},
	{
		icon: <SettingsIcon style={{ fontSize: "30px", color: "white" }} />,
		href: "/setting",
		name: "Setting",
	},
	{
		icon: (
			<ShoppingBasketRoundedIcon style={{ fontSize: "28px", color: "white" }} />
		),
		href: "/orders",
		name: "Orders",
	},
	{
		icon: <ListAltRoundedIcon style={{ fontSize: "30px", color: "white" }} />,
		href: "/category",
		name: "Category",
	},
	{
		icon: (
			<ShoppingCartOutlinedIcon style={{ fontSize: "30px", color: "white" }} />
		),
		href: "/products",
		name: "Products",
	},
];

const SideBar: React.FC<props> = ({ DrawerToggle }) => {
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
				sx={{
					height: "60vh",
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "column",
				}}
			>
				{content.map((iteam, index) => {
					return (
						<SidebarContent key={index} onClick={() => DrawerToggle()}>
							<Link href={iteam.href} passHref={true}>
								<Button startIcon={iteam.icon} sx={{ alignItems: "center" }}>
									<SideBarText>{iteam.name}</SideBarText>
								</Button>
							</Link>
						</SidebarContent>
					);
				})}
			</List>
		</Box>
	);
};

export default SideBar;
