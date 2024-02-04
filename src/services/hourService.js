import axios from "axios";

const baseUrl = "/api/hours";

const getToken = () => {
  const loggedUser = window.localStorage.getItem("loggedInUser");
  if (loggedUser) {
    return JSON.parse(localStorage.getItem("loggedInUser")).token;
  }
};

const getHours = async () => {
  const res = await axios.get(baseUrl, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

const addHour = async (payload) => {
  const res = await axios.post(baseUrl, payload, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

const deleteHour = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export default { getHours, addHour, deleteHour };
