import { BASE_URL } from "@/constants";
import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import reactHook from "alova/react";
import { createApi } from "./api";

export const alovaInstance = createAlova({
    baseURL: BASE_URL,
    timeout: 5000,
    requestAdapter: adapterFetch(),
    responded: async (response) => {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "API request failed");
        }
        return response.json();
    },
    cacheFor: null,
    statesHook: reactHook,
    beforeRequest: (method) => {
        const tokenStr = localStorage.getItem("token");
        if (tokenStr) {
            try {
                const token = JSON.parse(tokenStr);
                if (token?.accessToken) {
                    method.config.headers.Authorization = `Bearer ${token.accessToken}`;
                }
            } catch (error) {
                console.error("Failed to parse token:", error);
            }
        }
    }
})

export const ALOVA = createApi(alovaInstance)
