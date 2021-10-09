import { FC } from "react";
import create from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
	isOpen: false,
	drawerComponent: null,
	data: null,
};

export type state = {
	isOpen: boolean;
	drawerComponent: null;
	data: any;
};
export type DrawerType = {
	drawerState: state;
	toggleState: (Dstate: string, drawerComponent: any, data: any) => any;
};
export const usedrawerStore = create<DrawerType>(
	devtools((set) => ({
		drawerState: initialState,
		toggleState: (Dstate: string, drawerComponent: any, data: any) => {
			switch (Dstate) {
				case "OPEN_DRAWER":
					return set({
						drawerState: {
							isOpen: true,
							drawerComponent: drawerComponent,
							data: data,
						},
					});
				case "CLOSE_DRAWER":
					return set({
						drawerState: {
							isOpen: false,
							drawerComponent: null,
							data: null,
						},
					});
				default:
					return initialState;
			}
		},
	}))
);
