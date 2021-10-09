import React, { useState } from "react";
import { SwipeableDrawer, IconButton } from "@material-ui/core";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import SidebarContent from "../sidebarContent/SidebarContent";
import { Menu } from "./Drawer.style";
interface props {}

export const Drawer: React.FC<props> = () => {
	const [open, setOpen] = useState(false);
	const closeDrawer = () => {
		setOpen(false);
	};

	return (
		<Menu>
			<IconButton
				edge="start"
				color="inherit"
				aria-label="open drawer"
				onClick={() => setOpen(true)}
			>
				<MenuRoundedIcon
					fontSize="large"
					sx={{
						color: "black",
					}}
				/>
			</IconButton>
			<SwipeableDrawer
				anchor="left"
				open={open}
				onClose={() => {
					setOpen(false);
				}}
				onOpen={() => {
					setOpen(true);
				}}
				disableDiscovery={true}
				// disableSwipeToOpen={true}
				transitionDuration={300}
			>
				<SidebarContent DrawerToggle={closeDrawer} />
			</SwipeableDrawer>
		</Menu>
	);
};

export default Drawer;
