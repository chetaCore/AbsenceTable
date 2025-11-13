import humps from "humps";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosProgressEvent,
} from "axios";

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
  progress?: number;
}

export interface RequestResult {
  result?: string;
  error?: string;
}

export interface RequestWrapperOptions {
  onUploadProgress?: (percent: number) => void;
  disableLoader?: boolean;
}

const api = axios.create({
  baseURL: "http://localhost/integration/odata/",
  headers: { "Content-Type": "application/json" },
  auth: {
    username: "Service User",
    password: "1Qwerty",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function requestWrapper<T>(
  request: (config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>,
  options?: RequestWrapperOptions
): Promise<ApiResult<T>> {
  try {
    const response = await request({
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (
          options?.onUploadProgress &&
          progressEvent.total &&
          progressEvent.loaded
        ) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          options.onUploadProgress(percent);
        }
      },
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
      progress: 100,
    };
  } catch (err: unknown) {
    let errorMessage = "Unexpected error";
    let status: number | undefined;

    if (axios.isAxiosError(err)) {
      status = err.response?.status;
      const responseData = err.response?.data as { Errors?: string };
      errorMessage = responseData?.Errors ?? err.message;
    }

    return {
      success: false,
      error: errorMessage,
      status,
      progress: 0,
    };
  }
}

/**
 * Универсальная обертка для OData-запросов.
 * Поддерживает GET и POST.
 * Приводит ключи:
 *  - В исходящих данных — к PascalCase
 *  - В ответе сервера — к camelCase
 */
export const callOdataMethod = <TRequest, TResponse>(
  methodPath: string,
  inputParameters: TRequest,
  method: "GET" | "POST" = "POST"
) =>
  requestWrapper<TResponse>(async () => {
    const normalizedInput =
      inputParameters != null
        ? humps.pascalizeKeys(
            inputParameters,
            (key: any, convert: (arg0: any) => any) => convert(key)
          )
        : undefined;

    const request =
      method === "GET"
        ? api.get<{ "@odata.context": string; value: TResponse }>(methodPath, {
            params: normalizedInput,
          })
        : api.post<{ "@odata.context": string; value: TResponse }>(methodPath, {
            inputParameters: normalizedInput,
          });

    const response = await request;

    const raw = response.data.value ?? response.data;
    let parsed: any;
    if (typeof raw === "string") {
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = raw;
      }
    } else {
      parsed = raw;
    }

    const normalizedData = humps.camelizeKeys(parsed);

    return {
      ...response,
      data: normalizedData,
    } as AxiosResponse<TResponse>;
  });

export default api;
