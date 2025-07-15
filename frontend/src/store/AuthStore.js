import { create } from "zustand";
import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isCheckingAuth: false,
    signup:async(email,username,password) => {
        set({loading: true, error: null});
        try {
            await axios.post(`${BASE_URL}/auth/signup`, {
                email,
                username,
                password

            })
            set({user: { email, username }, isAuthenticated: true, loading: false});
        } catch (error) {
            set({error: error.response?.data?.message || "Signup failed", loading: false});
            throw error;
            
        }
    }
}))