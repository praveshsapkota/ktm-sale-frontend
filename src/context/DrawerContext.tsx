import { useCreateContext } from "./create-context";
import { datass } from "./data";

const initialState = {
	isOpen: false,
	drawerComponent: null,
	data: null,
};

type State = typeof initialState;
type Action = any;
function reducer(state: State, action: Action) {
	console.log("inside reducer");
	switch (action.type) {
		case "OPEN_DRAWER":
			return {
				...state,
				isOpen: true,
				drawerComponent: action.drawerComponent,
				data: action.data,
			};
		case "CLOSE_DRAWER":
			return {
				...state,
				isOpen: false,
				drawerComponent: null,
				data: null,
			};
		default:
			return state;
	}
}
// eslint-disable-next-line react-hooks/rules-of-hooks
const [useDrawerState, useDrawerDispatch, DrawerProvider] = useCreateContext(
	initialState,
	reducer
);

export { useDrawerState, useDrawerDispatch, DrawerProvider };
