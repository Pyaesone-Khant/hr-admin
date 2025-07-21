import { COOKIE_EXPIRED_TIME, COOKIE_USER_KEY } from "@/constants/cookies";
import cookies from "js-cookie";

export const getUserData = () => {
    let user;

    const _setUserToCookies = (user: string) => {
        cookies.set(
            COOKIE_USER_KEY,
            user,
            {
                expires: COOKIE_EXPIRED_TIME,
                path: "/",
            }
        )
    }

    const removeUserData = () => {
        cookies.remove(
            COOKIE_USER_KEY,
            {
                path: "/"
            }
        )
    }

    if (cookies.get(COOKIE_USER_KEY)) {
        const parsedUser = JSON.parse(cookies.get(COOKIE_USER_KEY) as string);

        if (parsedUser === '{}'
            || parsedUser === '[]'
            || parsedUser === '""'
        ) {
            removeUserData();
        } else {
            user = parsedUser;
        }
    }

    const setUserData = (newUserData: string | User) => {
        switch (true) {
            case typeof newUserData === "object":
                _setUserToCookies(JSON.stringify(newUserData));
                break;
            case typeof newUserData === "string":
                _setUserToCookies(newUserData);
                break;
        }
    }

    return {
        user,
        setUserData,
        removeUserData
    }
}