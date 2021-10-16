import React from "react";
import { signIn, signOut, useSession, getCsrfToken } from "next-auth/react";
import {gql , useQuery} from "@apollo/client"
import {useAuthStore} from "../store/authStore"
// export const setIteamLocalStorage = (k : string , v : string )=>{
// 	localStorage.setItem(k,v)
// }
// export const getIteamLocalStorage = (k : string)=>{
// 	return localStorage.getItem(k)
// }

const {getState}  = useAuthStore
const hellowQuery = gql`
query {
	Hellow
  }
`
interface props {}

const Home: React.FC<props> = () => {
	const {data,error,loading} = useQuery(hellowQuery)
	const session = useSession();
	React.useEffect(() => {
			// @ts-expect-error
		localStorage.setItem("Token",session.data?.user.apiAuthToken)
		console.log("inside useEffect",localStorage.getItem("Token"))
		//@ts-expect-error
	},[session?.data?.user?.apiAuthToken])
	return (
		<>
			<span>Login</span>
			<div>{session.status == "unauthenticated" ? <button onClick={()=>signIn()}>LogIN</button> : <button onClick={()=>signOut()}>LogOut</button>}</div>
		</>
	);
};

export default Home;
