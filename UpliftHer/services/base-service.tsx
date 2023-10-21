import axios, { AxiosError, AxiosResponse } from 'axios';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { IResponse } from './interfaces/IResponse';

const BASE_URL = process.env.REACT_APP_BASE_URL_DEV;

class BaseService {
    private static instance: BaseService;

    public constructor() {
        this.setupInterceptors();
    }

    static getInstance(): BaseService {
        if (!BaseService.instance) {
            BaseService.instance = new BaseService();
        }
        return BaseService.instance;
    }

    private setupInterceptors() {
        axios.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log("error 1 ", response);
                return response;
            },
            (error: AxiosError) => {
                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    console.error('Response Error:', error.response.status, error.response.data);
                    return Promise.reject(error.response);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('Request Error:', error.request);
                    return Promise.reject(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error Message:', error.message);
                    return Promise.reject(error.message);
                }
            }
        );
    }

    private handleResponse<T>(response: AxiosResponse<T>): IResponse<T> {
        return {
            isSuccess: true,
            data: response.data,
            error: undefined,
        };
    }

    private handleError<T>(error: AxiosError | unknown): IResponse<T> {
        console.log("axios error ", error);
        return {
            isSuccess: false,
            data: null,
            error: (error as AxiosError)?.message || 'An error occurred while processing the request.',
        };
    }

    private async getHeaders(): Promise<{ [key: string]: string }> {
        const headers: { [key: string]: string } = {
            'Content-Type': 'application/json',
        };

        const user = new PassageUser();
        const token = await user.getAuthToken();
        console.log("TOKEN ", token);
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    async get<T>(url: string): Promise<IResponse<T>> {
        try {
            const headers = await this.getHeaders();
            const response = await axios.get<T>(`${BASE_URL}${url}`, { headers });
            return this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async post<T>(url: string, data: any): Promise<IResponse<T>> {
        try {
            const headers = await this.getHeaders();
            const response = await axios.post<T>(`${BASE_URL}${url}`, data, { headers });
            return this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async put<T>(url: string, data: any): Promise<IResponse<T>> {
        try {
            const headers = await this.getHeaders();
            const response = await axios.put<T>(`${BASE_URL}${url}`, data, { headers });
            return this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async delete<T>(url: string): Promise<IResponse<T>> {
        try {
            const headers = await this.getHeaders();
            const response = await axios.delete<T>(`${BASE_URL}${url}`, { headers });
            return this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }
}

export default BaseService;
