import axios from "axios";

export const getAllPapersRequest = async () =>
  await axios.get("http://localhost:4000/papers");
