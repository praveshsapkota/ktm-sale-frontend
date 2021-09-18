import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { usedrawerStore } from "../../store/drawerStore";
/** Drawer Components */
// import ProductForm from '../ProductForm/ProductForm';
// import ProductUpdateForm from '../ProductForm/ProductUpdateForm';
// import CampaingForm from '../CampaingForm/CampaingForm';
// import CategoryForm from '../CategoryForm/CategoryForm';
// import StaffMemberForm from '../StaffMemberForm/StaffMemberForm';
// import Sidebar from '../Layout/Sidebar/Sidebar';
// import { AddProductFrom } from "../AddProductForm/product_AddForm";
import { AddProductFrom } from "../AddProductForm/product_AddForm copy";
import { AddCatagoryForm } from "../addCatagoryForm/addCatagoryForm";
import { AddSubCatagoryForm } from "../addSubCatagoryForm/addSubCatagoryForm";

/** Components Name Constants */
const DRAWER_COMPONENTS = {
	CREATE_PRODUCT_FORM: AddProductFrom,
	UPDATE_PRODUCT_FORM: AddProductFrom,
	CATEGORY_FORM: AddCatagoryForm,
	SUBCATAGORY_FORM: AddSubCatagoryForm,
	// CAMPAING_FORM: CampaingForm,
	// STAFF_MEMBER_FORM: StaffMemberForm,
	// SIDEBAR: Sidebar,
};

type props = any;

// const CloseButton = styled('button', ({ $theme }) => ({
//   ...$theme.typography.fontBold14,
//   color: $theme.colors.textNormal,
//   lineHeight: 1.2,
//   outline: '0',
//   border: 'none',
//   padding: '0',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   position: 'absolute',
//   top: '10px',
//   left: '-30px',
//   right: 'auto',
//   cursor: 'pointer',
//   backgroundColor: '#ffffff',
//   width: '20px',
//   height: '20px',
//   borderRadius: '50%',

//   '@media only screen and (max-width: 767px)': {
//     left: 'auto',
//     right: '30px',
//     top: '29px',
//   },
// }));

export const DrawerItems: React.FC<props> = () => {
	const isOpen = usedrawerStore((state) => state.drawerState.isOpen);
	const drawerComponents = usedrawerStore(
		(state) => state.drawerState.drawerComponent
	);
	const data = usedrawerStore((state) => state.drawerState.data);

	const usecloseDrawer = usedrawerStore((state) => state.toggleState);
	const closeDrawer = () => {
		usecloseDrawer("CLOSE_DRAWER", null, null);
	};
	if (!drawerComponents) {
		return null;
	}
	const SpecificContent: any = DRAWER_COMPONENTS[drawerComponents];

	return (
		<div>
			<Drawer
				anchor={"right"}
				open={isOpen}
				onClose={closeDrawer}
				transitionDuration={10000}
			>
				<SpecificContent onClose={closeDrawer} data={data} />
			</Drawer>
		</div>
	);
};
