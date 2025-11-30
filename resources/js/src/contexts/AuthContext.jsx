import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

// Auth Context
const AuthContext = createContext();

// Auth Actions
const AUTH_ACTIONS = {
    LOGIN_START: "LOGIN_START",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGOUT: "LOGOUT",
    SET_USER: "SET_USER",
    CLEAR_ERROR: "CLEAR_ERROR",
};

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

// Auth reducer
function authReducer(state, action) {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_START:
            return { ...state, isLoading: true, error: null };

        case AUTH_ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };

        case AUTH_ACTIONS.LOGIN_ERROR:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload,
            };

        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };

        case AUTH_ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload,
                isLoading: false,
            };

        case AUTH_ACTIONS.CLEAR_ERROR:
            return { ...state, error: null };

        default:
            return state;
    }
}

// Auth Provider Component
export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Check if user is authenticated on app load
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("admin_token");
            if (!token) {
                dispatch({ type: AUTH_ACTIONS.SET_USER, payload: null });
                return;
            }

            // Set token in axios defaults
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            const response = await axios.get("/api/v1/admin/me");
            dispatch({
                type: AUTH_ACTIONS.SET_USER,
                payload: response.data.user,
            });
        } catch (error) {
            // Remove invalid token
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_user");
            delete axios.defaults.headers.common["Authorization"];
            dispatch({ type: AUTH_ACTIONS.SET_USER, payload: null });
        }
    };

    const login = async (email, password) => {
        dispatch({ type: AUTH_ACTIONS.LOGIN_START });

        try {
            // Get CSRF cookie first for SPA authentication
            await axios.get("/sanctum/csrf-cookie");

            const response = await axios.post("/admin/login", {
                email,
                password,
            });

            // Store token and user data
            const { token, user } = response.data;
            localStorage.setItem("admin_token", token);
            localStorage.setItem("admin_user", JSON.stringify(user));

            // Set token in axios defaults
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            dispatch({
                type: AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: user,
            });
            return { success: true, data: response.data };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Login failed";
            dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem("admin_token");
            if (token) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                await axios.post("/admin/logout");
            }
        } catch (error) {
            console.warn("Logout error:", error);
        } finally {
            // Clear local storage and axios headers
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_user");
            delete axios.defaults.headers.common["Authorization"];
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
        }
    };

    const clearError = () => {
        dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
    };

    const value = {
        ...state,
        login,
        logout,
        clearError,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

// Custom hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthContext;
