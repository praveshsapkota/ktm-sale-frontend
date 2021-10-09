import React from "react";
import { Headerdiv, Leftmenu, Logo } from "./Header.style";
import { Drawer } from "../../components/drawer/Drawer";
import AccountMenu from "../../components/accountMenu/AccountMenu";
import { AppBar } from "@material-ui/core";
import Link from "next/link";
interface props {}

export const Header: React.FC<props> = () => {
	return (
		//  <Headerdiv>
		<AppBar
			position="sticky"
			sx={{
				height: "12vh",
				width: "100vw",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				bgcolor: "white",
				alignItems: "center",
				boxShadow: "0 4px 8px 0px rgba(12, 8, 8, 0.2)",
			}}
		>
			<Drawer />
			<Link href="/">
				<img
					src="/images/2.png"
					alt="KtmSale"
					style={{ width: "150px", cursor: "pointer" }}
				/>
				{/* <Logo>KtmSale-Admin</Logo> */}
			</Link>
			<Leftmenu style={{ backgroundColor: "white" }}>
				<AccountMenu />
			</Leftmenu>
		</AppBar>
		//  </Headerdiv>
	);
};

export default Header;
