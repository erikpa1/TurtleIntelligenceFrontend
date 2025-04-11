
import turxios, {Turxios} from "@Turtle/Api/Turxios";


//Generated with https://claude.ai/chat/4324fad1-62f8-4be3-8075-6ab90c87fee1

// Example of configuring Turxios globally on application start
export function configureAxios() {
    // Configure Turxios with custom options
    const apiConfig = {
        baseURL: "",
        timeout: 15000,
        headers: {
            // 'X-App-Version': process.env.REACT_APP_VERSION || '1.0.0',
        },
        authTokenKey: 'my_app_token', // Custom storage key
        refreshTokenKey: 'my_app_refresh_token', // Custom storage key
    };

    // You can either reconfigure the default instance
    Object.keys(apiConfig).forEach(key => {
        if (key === 'headers') {
            Object.keys(apiConfig.headers).forEach(headerKey => {
                turxios.setHeader(headerKey, apiConfig.headers[headerKey]);
            });
        } else if (key === 'baseURL') {
            turxios.instance.defaults.baseURL = apiConfig.baseURL;
        } else if (key === 'timeout') {
            turxios.instance.defaults.timeout = apiConfig.timeout;
        }
    });


    const handleLogin = async (credentials) => {
        try {
            const response = await turxios.post('/auth/login', credentials);
            const {token, refreshToken} = response.data;

            // Set tokens for future requests
            turxios.setAuthToken(token);
            turxios.setRefreshToken(refreshToken);

            return response.data.user;
        } catch (error) {
            // Error is handled by Turxios
            throw error;
        }
    };

    // Example of clearing tokens on logout
    const handleLogout = () => {
        turxios.clearTokens();
        window.location.href = '/login';
    };

    // Make these functions available globally (or through context/redux)
    (window as any).auth = {
        login: handleLogin,
        logout: handleLogout,
    };

    // Check if user has an existing token on app start
    const existingToken = localStorage.getItem(apiConfig.authTokenKey);
    if (existingToken) {
        turxios.setAuthToken(existingToken);

    }
}
