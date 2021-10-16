import React from "react";
import {useRouter} from "next/router"

interface props {}

const Error: React.FC<props> = () => {
    const router = useRouter()
	return (
		<div>
			Access Denied you are not a authorized user
			<button onClick={() => {
                router.push("/Login")
            }}>Sign IN</button>
		</div>
	);
};

export default Error;
