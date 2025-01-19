// usercontent.js - Handles API requests for user interactions
const API_BASE_URL = "http://localhost:5000";

export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to register");
    }

    return data;
  } catch (error) {
    console.error("Signup error:", error.message);
    throw error;
  }
};

export const login = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to log in");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};
