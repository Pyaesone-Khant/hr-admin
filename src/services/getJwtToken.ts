import { COOKIE_EXPIRED_TIME, COOKIE_TOKEN_KEY } from "@/constants/cookies";
import cookies from "js-cookie";

export const getJwtToken = () => {

    let jwt: JWT | null = null;

    const _setTokenToCookies = (jwtToken: string) => {
        cookies.set(
            COOKIE_TOKEN_KEY,
            jwtToken,
            {
                expires: COOKIE_EXPIRED_TIME,
                path: "/",
                sameSite: "strict", // Set SameSite attribute to prevent CSRF attacks
                secure: true,
            }
        )
    };

    const removeJwtToken = () => {
        cookies.remove(
            COOKIE_TOKEN_KEY,
            {
                path: "/"
            }
        );
    }

    if (cookies.get(COOKIE_TOKEN_KEY)) {
        const parsedJwt = JSON.parse(cookies.get(COOKIE_TOKEN_KEY) as string);

        if (parsedJwt === '{}'
            || parsedJwt === '[]'
            || parsedJwt === '""'
        ) {
            removeJwtToken()
        } else {
            jwt = parsedJwt;
        }
    };

    const setJwtToken = (jwtToken: string | JWT) => {
        switch (true) {
            case typeof jwtToken === "object":
                _setTokenToCookies(JSON.stringify(jwtToken));
                break;
            case typeof jwtToken === "string":
                _setTokenToCookies(jwtToken);
                break;
        }
    }

    return {
        jwt,
        setJwtToken,
        removeJwtToken
    }

}