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
  },
  updateExperience: async (formData, id) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/user/experience-update/${id}`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error("Failed to update work experience");
    }
  },
  deleteExperience: async (id) => {
    try {
      const res = await axios.delete(
        `${BACKEND_URL}/api/user/delete-experience/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.status) {
        toast.success("Deleted");
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  },
  postTask: async (formData) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/task/post`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error("Failed to post task");
    }
  },
  fetchPostedTasks: async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/task/my-posted-tasks`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        return response.data || [];
      }
    } catch (error) {
      return [];
    }
  },
  updateTaskStatus: async (status, id) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/task/change-task-status/${id}`,
        { status: status },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error("Failed to update task status");
    }
  },
  deleteTask: async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/task/delete-task/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error("Failed to delete task");
    }
  },
  fetchOpenTasks: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/task/open-tasks`, {
        withCredentials: true,
      });

      return response.data || [];
    } catch (error) {
      return [];
    }
  },
  fetchTask: async (id) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/task/get-task/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return null;
    }
  },
  createSubmisson: async (id, formData) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/submission/create-submission/${id}`,
        formData,
        { withCredentials: true }
      );
      if (response?.data?.success === true) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      //@ts-ignore
      const errorMessage = error?.response?.data?.msg || "Failed to submit work";
      toast.error(errorMessage);
    }
  },
  fetchAllSubmissions: async (id) => {

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/submission/all-submissions/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return null;
    }
  },
  acceptSubmission: async (id) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/submission/accept-submission/${id}`,
        {},
        { withCredentials: true }
      );
      if(res.data.success === true){
        toast.success(res.data.msg)
      }else{
        toast.error(res.data.msg)
      }
    } catch (error) {
      //@ts-ignore
      const errorMessage = error?.response?.data?.msg || "Failed to accept submission";
      toast.error(errorMessage);
    }
  },
  rejectSubmission: async (id) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/submission/reject-submission/${id}`,
        {},
        { withCredentials: true }
      );
      if(res.data.success === true){
        toast.success(res.data.msg)
      }else{
        toast.error(res.data.msg)
      }
    } catch (error) {
      //@ts-ignore
      const errorMessage = error?.response?.data?.msg || "Failed to reject submission";
      toast.error(errorMessage);
    }
  }
}));
