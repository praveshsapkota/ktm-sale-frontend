import React, { ReactElement } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import Login from "../pages/Login"

const RouteGuard: FC = ({ children }) => {
    const { data, status } = useSession();
    const router = useRouter()
    const path = router.pathname
    React.useEffect(() => {
        if ((status === "unauthenticated" && path === "/test")) {
            router.push('/test')
        }
    }, [status, path])

    React.useEffect(() => {
        if (status === "authenticated") {
            if (path === "/test") {
                router.push("/")
            }
        }
    }, [path, status])

    console.log("routeGuard", data, status);
    if (status === "authenticated") {
        return children as ReactElement;
    }
    if (status === "loading") {
        return null;
    }
    return <Login />
};

export default RouteGuard;
