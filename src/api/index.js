import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

export const addNewProgram = async (newProgram) => {
  try {
    await API.post("programs", {
      ...newProgram,
    });
    return { severity: "success", message: "Basariyla eklendi" };
  } catch (error) {
    return { severity: "error", message: error.message };
  }
};
export const updateProgram = async (id, data) => {
  try {
    await API.patch(`programs/${id}`, data);
    return {
      severity: "info",
      message: "Basariyla guncellestirildi",
    };
  } catch (error) {
    return { severity: "error", message: error.message };
  }
};

export const deleteProgram = (id) => API.delete(`programs/${id}`);
