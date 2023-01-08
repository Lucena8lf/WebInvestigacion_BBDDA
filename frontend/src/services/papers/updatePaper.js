import axios from "axios";

export const updatePaperRequest = async (doi, newFields) =>
  await axios.put(`http://localhost:4000/papers/${doi}`, newFields);
