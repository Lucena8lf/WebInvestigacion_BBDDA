import axios from "axios";

export const createPaperRequest = async (paper) => {
  //Recibimos un articulo y lo enviamos al backend
  console.log(paper);
  return await axios.post("http://localhost:4000/papers", paper);
};
