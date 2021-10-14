import React from "react";
import { signIn, signOut, useSession, getCsrfToken } from "next-auth/react";
interface props {}

const Home: React.FC<props> = () => {
	const session = useSession();
    console.log(session);
	return (
		<>
			<span>Login</span>
			<div>{session.status == "unauthenticated" ? <button onClick={()=>signIn()}>LogIN</button> : <button onClick={()=>signOut()}>LogOut</button>}</div>
		</>
	);
};

export default Home;
