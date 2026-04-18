import {auth} from "@/app/auth";
import {NextResponse} from "next/server";

export default auth((req)=>{
    const isLoggedIn = !!req.auth
    const isOnSignInPage = req.nextUrl.pathname === "/signin"

    if(!isLoggedIn && !isOnSignInPage){
        return NextResponse.redirect(new URL("/signin", req.url))
    }
    if(isLoggedIn && isOnSignInPage){
        return NextResponse.redirect(new URL("/", req.url))
    }
    return NextResponse.next()

})
export const config = {
    matcher:  ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
