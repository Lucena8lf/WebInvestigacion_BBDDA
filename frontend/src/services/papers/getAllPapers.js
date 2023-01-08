import axios from "axios";

export const getAllPapers = async () =>
  await axios.get("http://localhost:4000/papers");
