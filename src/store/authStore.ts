import { InterfaceImplementations } from "graphql/type/schema";
import zustand from "zustand/vanilla";
import { devtools } from "zustand/middleware";

const initialValue = {
	sessionToken: "",
};

type state = {
	sessionToken: string;
};

type authSessionType = {
	sessionValue: state;
	setSession: (sessionValue: string) => void;
};

export const useAuthStore = zustand<authSessionType>(
	devtools((set) => ({
		sessionValue: initialValue,
		setSession: (sessionValue: string) => {
			set({
				sessionValue: {
					sessionToken: sessionValue,
				},
			});
		},
	}))
);
