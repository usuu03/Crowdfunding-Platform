import { useEffect } from "react";
import useAxiosInstance from "./axiosInstance";

const loginUser = async (userData) => {
  try {
    const axiosInstance = useAxiosInstance();
    const response = await axiosInstance.post("/user/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const registerUser = async (userData) => {
  try {
    const axiosInstance = useAxiosInstance();
    const response = await axiosInstance.post("/user/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchUserData = async (userId) => {
  try {
    const axiosInstance = useAxiosInstance();
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const useUserApi = () => {
  // Use useEffect or other hooks if needed
  useEffect(() => {
    // Example: Perform side effects
    loginUser({
      /* user data */
    });
    // Other API calls...
  }, []);

  // Return the functions or data you want to expose
  return { loginUser, registerUser, fetchUserData };
};

export default useUserApi;
