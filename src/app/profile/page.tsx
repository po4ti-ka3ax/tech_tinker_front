'use client'

import { signOut } from "next-auth/react";
import ProtectedMiddleware from "../components/middleware/middleware";

const Profile = () => {
    const Cookies = require('js-cookie')

    const handleSignOut = async () => {
        Cookies.remove('access_token')
        Cookies.remove('user_id')
        await signOut({redirect:true, callbackUrl:'/'})
    }
    return (
        <>
            <ProtectedMiddleware>
                <h1>profile</h1>

                <button onClick={() => handleSignOut()}>Sign out</button>
            </ProtectedMiddleware>
        </>
    );
}

export default Profile