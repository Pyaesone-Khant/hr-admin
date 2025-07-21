import { BASE_URL } from "@/constants";
import { useUserStore } from "@/states/zustand/user";
import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import reactHook from "alova/react";
import { createApi, setApiToken } from "./api";
import { getJwtToken } from "./getJwtToken";

export const alovaInstance = createAlova({
    baseURL: BASE_URL,
    timeout: 10000,
    requestAdapter: adapterFetch(),
    responded: async (response) => {

        const { jwt, setJwtToken, removeJwtToken } = getJwtToken();
        const isAuthRoutes = response.url.includes('/auth/sign-in') || response.url.includes('/auth/refresh-token');

        // Handle token refresh if the response status is 401 and the request is not for authentication routes
        // This is to ensure that we only attempt to refresh the token when necessary
        if (response.status === 401 && !isAuthRoutes) {
            if (jwt && jwt.refreshToken) {
                try {
                    const newJwt = await ALOVA.refreshToken(jwt.refreshToken)
                    setJwtToken(newJwt);
                    useUserStore.getState().setJwt(newJwt);
                    setApiToken({
                        apiInstance: alovaInstance,
                        token: newJwt.accessToken,
                    });
                } catch (error) {
                    console.error("Token refresh failed:", error);
                    removeJwtToken();
                    useUserStore.getState().clearJwt();
                    throw new Error("Token refresh failed");
                }
            }
        }

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'An error occurred');
        }
        return response.json();
    },
    cacheFor: null,
    statesHook: reactHook,
    beforeRequest: (method) => {
        const jwt = getJwtToken().jwt;
        if (jwt && jwt.accessToken) {
            method.config.headers.Authorization = `Bearer ${jwt.accessToken}`;
        }
    },
})


export const ALOVA = createApi(alovaInstance)
