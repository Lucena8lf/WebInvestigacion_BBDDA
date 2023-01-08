import axios from "axios";

export const deletePaper = async (doi) =>
  await axios.delete(`http://localhost:4000/papers/${doi}`);
