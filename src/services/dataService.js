import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

const dataService = {
  getData: async () => {
    try {
      const response = await axios.get(`${BASE_URL}posts`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  },

  createData: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}posts`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating data:", error);
      throw error;
    }
  },

  updateData: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}posts/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  },

  deleteData: async (data) => {
    try {
      const response = await axios.delete(`${BASE_URL}posts/${data}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  },
};

export default dataService;
