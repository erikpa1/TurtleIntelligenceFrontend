//Generated via https://claude.ai/chat/4324fad1-62f8-4be3-8075-6ab90c87fee1
import axios, {Axios as OverrideAxios, AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {message} from 'antd';

// Define interface for Turxios configuration
interface TurxiosConfig extends AxiosRequestConfig {
    authTokenKey?: string;
    refreshTokenKey?: string;
    messageDuration?: number;
    showNetworkErrors?: boolean;
    showServerErrors?: boolean;
    showClientErrors?: boolean;
    autoRedirectOnAuthError?: boolean;
    redirectPath?: string;
}

export const Axios: OverrideAxios = axios.create();



// Interface for queued requests
interface QueueItem {
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
}

/**
 * Turxios - A global wrapper for Axios
 * Manages errors, auth, loading states, and more
 * Uses Ant Design message component for error display
 */
class Turxios {
    instance: AxiosInstance;

    refreshTokenKey: string;
    authTokenKey: string;
    isRefreshing: boolean = false;
    failedQueue: Array<QueueItem> = [];

    // Message settings
    private messageConfig: {
        duration: number;
        showNetworkErrors: boolean;
        showServerErrors: boolean;
        showClientErrors: boolean;
        autoRedirectOnAuthError: boolean;
        redirectPath: string;
    };

    constructor(config: TurxiosConfig = {}) {
        this.instance = axios.create({
            baseURL: config.baseURL || "",
            timeout: config.timeout || 30000,
            headers: {
                'Content-Type': 'application/json',
                ...config.headers,
            },
            ...config,
        });

        this.authTokenKey = config.authTokenKey || 'auth_token';
        this.refreshTokenKey = config.refreshTokenKey || 'refresh_token';

        // Initialize message settings
        this.messageConfig = {
            duration: config.messageDuration || 3,
            showNetworkErrors: config.showNetworkErrors !== false,
            showServerErrors: config.showServerErrors !== false,
            showClientErrors: config.showClientErrors !== false,
            autoRedirectOnAuthError: config.autoRedirectOnAuthError !== false,
            redirectPath: config.redirectPath || '/login',
        };

        this._initializeInterceptors();
    }

    /**
     * Set up request and response interceptors
     */
    private _initializeInterceptors(): void {
        // Request interceptor to add auth token
        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem(this.authTokenKey);

                if (token && config.headers) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor to handle errors and auth issues
        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error: AxiosError) => {
                if (!error.config) {
                    this._handleError(error);
                    return Promise.reject(error);
                }

                const originalRequest = error.config;

                // Handle 401 Unauthorized errors
                if (error.response && error.response.status === 401 && !(originalRequest as any)._retry) {
                    if (this.isRefreshing) {
                        return new Promise<string>((resolve, reject) => {
                            this.failedQueue.push({resolve, reject});
                        })
                            .then(token => {
                                if (originalRequest.headers) {
                                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                                }
                                return this.instance(originalRequest);
                            })
                            .catch(err => {
                                return Promise.reject(err);
                            });
                    }

                    (originalRequest as any)._retry = true;
                    this.isRefreshing = true;

                    try {
                        // Try to refresh the token
                        const refreshToken = localStorage.getItem(this.refreshTokenKey);

                        if (!refreshToken) {
                            this._handleLogout();
                            return Promise.reject(error);
                        }

                        const response = await axios.post(
                            `${this.instance.defaults.baseURL}/auth/refresh-token`,
                            {refreshToken}
                        );

                        if (response.data.token) {
                            const newToken = response.data.token;
                            localStorage.setItem(this.authTokenKey, newToken);

                            // Process failed requests in queue
                            this.processQueue(null, newToken);

                            // Retry original request with new token
                            if (originalRequest.headers) {
                                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                            }
                            return this.instance(originalRequest);
                        } else {
                            this._handleLogout();
                            return Promise.reject(error);
                        }
                    } catch (refreshError) {
                        this.processQueue(refreshError, null);
                        this._handleLogout();
                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                // Handle other common errors
                this._handleError(error);
                return Promise.reject(error);
            }
        );
    }

    /**
     * Process queued requests after token refresh
     */
    processQueue(error: any, token: string | null): void {
        this.failedQueue.forEach(promise => {
            if (error) {
                promise.reject(error);
            } else {
                promise.resolve(token);
            }
        });

        this.failedQueue = [];
    }

    /**
     * Handle the logout process
     */
    private _handleLogout(): void {
        localStorage.removeItem(this.authTokenKey);
        localStorage.removeItem(this.refreshTokenKey);

        // Use message instead of notification for session expiration
        message.warning('Your session has expired. Please login again.', this.messageConfig.duration);

        // Redirect to login page after a short delay
        if (this.messageConfig.autoRedirectOnAuthError) {
            setTimeout(() => {
                window.location.href = this.messageConfig.redirectPath;
            }, 1500); // Short delay to allow the message to be seen
        }
    }

    /**
     * Handle API errors with appropriate messages
     */
    private _handleError(error: AxiosError): void {
        console.log('Handling error in Turxios:', error);

        let errorMessage = 'Something went wrong. Please try again.';

        if (error.response) {
            // The request was made and the server responded with an error status
            const status = error.response.status;
            const data = error.response.data as any;

            // Handle client errors (4xx)
            if (status >= 400 && status < 500) {
                if (!this.messageConfig.showClientErrors) {
                    return;
                }

                switch (status) {
                    case 400:
                        errorMessage = data.message || 'Invalid request. Please check your data.';
                        break;
                    case 403:
                        errorMessage = 'You do not have permission to access this resource.';
                        break;
                    case 404:
                        errorMessage = 'The requested resource was not found.';
                        break;
                    case 409:
                        errorMessage = data.message || 'Conflict with current state of the resource.';
                        break;
                    case 422:
                        errorMessage = data.message || 'Validation failed. Please check your input.';
                        break;
                    default:
                        errorMessage = data.message || `Error ${status}: ${errorMessage}`;
                }
            }
            // Handle server errors (5xx)
            else if (status >= 500) {
                if (!this.messageConfig.showServerErrors) {
                    return;
                }

                errorMessage = 'Server error. Please try again later.';
            }
        } else if (error.request) {
            // The request was made but no response was received
            if (!this.messageConfig.showNetworkErrors) {
                return;
            }

            errorMessage = 'Network error. Please check your connection.';
        } else {
            // Something happened in setting up the request
            errorMessage = error.message || errorMessage;
        }

        // Skip notification for 401 errors as they're handled separately
        if (!error.response || error.response.status !== 401) {
            // Use Ant Design message component
            message.error(errorMessage, this.messageConfig.duration);
        }

        // Log error for debugging
        console.error('[Turxios Error]', error);
    }

    /**
     * Make a GET request
     */
    get<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.instance.get<T>(url, config);
    }

    /**
     * Make a POST request
     */
    post<T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.instance.post<T>(url, data, config);
    }

    /**
     * Make a PUT request
     */
    put<T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.instance.put<T>(url, data, config);
    }

    /**
     * Make a PATCH request
     */
    patch<T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.instance.patch<T>(url, data, config);
    }

    /**
     * Make a DELETE request
     */
    delete<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.instance.delete<T>(url, config);
    }

    /**
     * Upload a file using FormData
     */
    upload<T = any>(url: string, file: File, fieldName: string = 'file', config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        const formData = new FormData();
        formData.append(fieldName, file);

        return this.instance.post<T>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            ...config,
        });
    }

    /**
     * Download a file
     */
    download(url: string, filename: string, config: AxiosRequestConfig = {}): Promise<void> {
        return this.instance.get(url, {
            responseType: 'blob',
            ...config,
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }

    /**
     * Make multiple requests in parallel
     */
    all<T>(requests: Array<Promise<T>>): Promise<T[]> {
        return axios.all<T>(requests);
    }

    /**
     * Spread the response of multiple requests
     */
    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R {
        return axios.spread<T, R>(callback);
    }

    /**
     * Set a default header for all requests
     */
    setHeader(key: string, value: string): Turxios {
        this.instance.defaults.headers.common[key] = value;
        return this;
    }

    /**
     * Set the auth token
     */
    setAuthToken(token: string): Turxios {
        localStorage.setItem(this.authTokenKey, token);
        this.setHeader('Authorization', `Bearer ${token}`);
        return this;
    }

    /**
     * Set the refresh token
     */
    setRefreshToken(token: string): Turxios {
        localStorage.setItem(this.refreshTokenKey, token);
        return this;
    }

    /**
     * Clear auth tokens
     */
    clearTokens(): Turxios {
        localStorage.removeItem(this.authTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        delete this.instance.defaults.headers.common['Authorization'];
        return this;
    }

    /**
     * Show a success message
     */
    showSuccess(text: string): void {
        message.success(text, this.messageConfig.duration);
    }

    /**
     * Show an info message
     */
    showInfo(text: string): void {
        message.info(text, this.messageConfig.duration);
    }

    /**
     * Show a warning message
     */
    showWarning(text: string): void {
        message.warning(text, this.messageConfig.duration);
    }

    /**
     * Show an error message
     */
    showError(text: string): void {
        message.error(text, this.messageConfig.duration);
    }

    /**
     * Show a loading message
     * @returns A function that can be called to hide the loading message
     */
    showLoading(text: string = 'Loading...'): () => void {
        const key = Date.now().toString();
        message.loading({content: text, key, duration: 0});
        return () => message.destroy(key);
    }
}

// Create a default instance
const turxios = new Turxios();

export default turxios;
export {Turxios};