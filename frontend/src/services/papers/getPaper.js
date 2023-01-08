import axios from "axios";

export const getPaperRequest = async (doi) => {
  return await axios.get(`http://localhost:4000/papers/${doi}`);
};
