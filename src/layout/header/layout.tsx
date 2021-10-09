import React from "react";
import Topbar from "../header/Header";
import { DrawerItems } from "../../components/DrawerItems/DrawerItems";
import { SnackbarComponent } from "../../components/snackBar"
// import { DrawerProvider } from "../../context/DrawerContext";

type props = any;
const AdminLayout: React.FC<props> = ({ children }: any) => {
	return (
		<>
			<Topbar />
			<SnackbarComponent />
			<DrawerItems />

		</>
	);
};

export default AdminLayout;
