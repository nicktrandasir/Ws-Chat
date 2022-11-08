import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { isClient, isDev } from "../common/constants/variables";

const baseUrl = "http://localhost:3300";

type HttpMethod = "get" | "post" | "put" | "delete";
type Params = [string, (unknown | AxiosRequestConfig)?, AxiosRequestConfig?];
type Options = AxiosRequestConfig & { url?: string };

type BaseQueryParams = { baseUrl: string };

type AxiosBaseQuery = <T = any>(
  params?: BaseQueryParams
) => BaseQueryFn<AxiosRequestConfig<T> & { url: string; method?: HttpMethod }, unknown, unknown>;

const axios = Axios.create();

const config = (params?: AxiosRequestConfig) => ({
  headers: { "content-type": "application/json; charset=UTF-8" },
  ...params,
});

const fetch = (url: string, method: HttpMethod, { data, ...options }: Options = {}) => {
  const path = (options.url || process.env.SERVER_URL || "") + url;

  if (isDev) console.log(`%c ${method?.toUpperCase()}: `, "color: #29acf2;", path);

  const params: Params = [path];
  data && params.push(data);
  params.push(config(options));

  return axios[method](...params)
    .then(onSuccess)
    .catch(handleError);
};

const onSuccess = <T>({ data }: AxiosResponse<T>) => {
  return { data };
};

const handleError = (e: unknown) => {
  const err = e as AxiosError;
  if (isClient) {
    const evt = new CustomEvent("requestError", { bubbles: true, cancelable: true, detail: e });
    document.dispatchEvent(evt);
  } else {
    console.log(`\x1b[37m Error: ${e}`);
  }

  return { error: { status: err.response?.status, data: err.response?.data || err.message } };
};

export const api = {
  get: (uri: string, options?: Options) => fetch(uri, "get", options),
  post: (uri: string, options?: Options) => fetch(uri, "post", options),
  put: (uri: string, options?: Options) => fetch(uri, "put", options),
  delete: (uri: string, options?: Options) => fetch(uri, "delete", options),
  config,
};

export const axiosBaseQuery: AxiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  ({ url, method = "get", data, params }) =>
    fetch(baseUrl + url, method, { data, params });

export const rtkApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl }),
  tagTypes: ["Users"],
  endpoints: () => ({}),
});

export const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

mock.onGet(/teams.*/).reply(200, {
  data: [
    { id: 1, title: "Spartak", status: "onRest" },
    { id: 2, title: "Zenit", status: "onField" },
  ],
});
