import { create } from "zustand";
import axios from "axios";
import { useAppStore } from "@/lib/types";
import { toast } from "sonner";
import { BACKEND_URL } from "@/lib/backend_url";

export const useApp = create<useAppStore>((set) => ({
  user: null,
  signup: async (formData) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/signup`, formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      toast.error("Signup Failed");
    }
  },
  login: async (formData) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/login`, formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Logged In");
        set({ user: res.data });
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  },
  fetchUser: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/user/fetch-user`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        set({ user: res.data });
      }
    } catch (error) {
      set({ user: null });
    }
  },
  logout: async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        set({ user: null });
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  },
  addExperience: async (formData) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/add-experience`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error("Failed to add experience");
    }
  },
  updateProfile: async (formData) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/user/profile-update`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  }
}));
