/**
 * API Client - Core HTTP layer
 * Handles all API communication with error handling, retries, and interceptors
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiErrorResponse {
  error: string;
  status: number;
  timestamp: string;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Default to same-origin `/api` so frontend and API in the same Next app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
const REQUEST_TIMEOUT = 30000; // 30 seconds

interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
}

class HttpClient {
  private baseUrl: string;
  private defaultTimeout: number;

  constructor(
    baseUrl: string = API_BASE_URL,
    timeout: number = REQUEST_TIMEOUT
  ) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = timeout;
  }

  private async fetchWithTimeout(
    url: string,
    config: RequestConfig = {}
  ): Promise<Response> {
    const { timeout = this.defaultTimeout, ...fetchConfig } = config;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchConfig,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError(408, "Request timeout");
      }
      throw error;
    }
  }

  private async retryRequest(
    url: string,
    config: RequestConfig = {},
    retries: number = 3
  ): Promise<Response> {
    const { retries: _, ...restConfig } = config;

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        return await this.fetchWithTimeout(url, restConfig);
      } catch (error) {
        if (attempt === retries - 1) throw error;

        // Exponential backoff: 100ms, 200ms, 400ms
        const delay = 100 * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw new Error("Max retries exceeded");
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = response.statusText;
      }

      throw new ApiError(response.status, response.statusText, errorData);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new ApiError(500, "Invalid response type");
    }

    return response.json();
  }

  async get<T>(path: string, config?: RequestConfig): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const retries = config?.retries ?? 3;

    const response = await this.retryRequest(
      url,
      { method: "GET", ...config },
      retries
    );
    return this.handleResponse<T>(response);
  }

  async post<T>(
    path: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const retries = config?.retries ?? 1; // Don't retry POST by default

    const response = await this.retryRequest(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...config?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      },
      retries
    );

    return this.handleResponse<T>(response);
  }

  async put<T>(
    path: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const retries = config?.retries ?? 1;

    const response = await this.retryRequest(
      url,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...config?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      },
      retries
    );

    return this.handleResponse<T>(response);
  }

  async patch<T>(
    path: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const retries = config?.retries ?? 1;

    const response = await this.retryRequest(
      url,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...config?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      },
      retries
    );

    return this.handleResponse<T>(response);
  }

  async delete<T>(path: string, config?: RequestConfig): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const retries = config?.retries ?? 1;

    const response = await this.retryRequest(
      url,
      { method: "DELETE", ...config },
      retries
    );

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new HttpClient();
