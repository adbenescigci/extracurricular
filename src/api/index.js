import axios from "axios";

const API = axios.create({
  baseURL: "https://school-out-activities.herokuapp.com/",
});

export const addNewProgram = async (newProgram) => {
  try {
    const result = await API.post("programs", {
      ...newProgram,
    });
    return { result, severity: "success", message: "Basariyla eklendi" };
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
