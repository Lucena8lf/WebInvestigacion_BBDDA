import axios from "axios";

export const deletePaperRequest = async (doi) =>
  await axios.delete(`http://localhost:4000/papers/${doi}`);
