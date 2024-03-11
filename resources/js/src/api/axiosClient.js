import axios from "axios";
import { removeUserInfo } from "../redux/auth/auth.slice";

const axiosClient = (dispatch) => {
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        withCredentials: true,
        // Authorization: authToken ? authToken : "",
    };

    const client = axios.create({
        baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
        headers,
    });

    client.interceptors.request.use(async (config) => {
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        }

        return config;
    });

    client.interceptors.response.use(
        (response) => {
            if (response && response.data) {
                return response.data;
            }

            return response;
        },
        (error) => {
            const originalRequest = error.config;

            if (
                (error.response.status === 401 ||
                    error.response.status === 405) &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;

                // Perform token refresh or logout action
                // Example: await refreshToken(); or dispatch(removeUserInfo());
                // Retry the original request
                // return axiosClient(getNewToken()).request(originalRequest);
                dispatch(removeUserInfo());
            }

            // if (error.response.status === 403) {
            //     // Handle Forbidden error
            // }
        }
    );

    return client;
};

export default axiosClient;
