import { BASE_URL } from "@/constants";
import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import reactHook from "alova/react";
import { createApi } from "./api";

export const alovaInstance = createAlova({
    baseURL: BASE_URL,
    timeout: 5000,
    requestAdapter: adapterFetch(),
    responded: (response) => response.json(),
    cacheFor: {
        GET: 1000 * 60 * 5, // 5 minutes
    },
    statesHook: reactHook,
    beforeRequest: (method) => {
        const token = localStorage.getItem("token") !== null ? JSON.parse(localStorage.getItem("token") as string) : null;

        if (token !== null && "accessToken" in token) {
            method.config.headers.Authorization = `Bearer ${token.accessToken}`;
        }
    }
})

export const ALOVA = createApi(alovaInstance)
