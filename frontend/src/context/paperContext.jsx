import { createContext, useContext, useState } from "react";
import { getAllPapersRequest } from "../services/papers/getAllPapers";
import { deletePaperRequest } from "../services/papers/deletePaper";
import { getPaperRequest } from "../services/papers/getPaper";
import { updatePaperRequest } from "../services/papers/updatePaper";

// PaperContext nos servirá para que otros componentes accedan a este contexto
export const PaperContext = createContext();

// customHook para el contexto
export const usePapers = () => {
  const context = useContext(PaperContext);

  if (!context) {
    throw new Error(
      "El hook usePapers debe ser usado dentro de un PaperContextProvider"
    );
  }

  return context;
};

// PaperContextProvider agrupa todos los componentes
export const PaperContextProvider = ({ children }) => {
  const [papers, setPapers] = useState([]);

  const loadPapers = async () => {
    // Función para cargar artículos que puede ser accedida por todos

    const response = await getAllPapersRequest();
    // Guardamos los artículos en el estado
    setPapers(response.data);
  };

  const deletePaper = async (doi) => {
    // Función para borrar un artículo

    try {
      const response = await deletePaperRequest(doi);
      console.log(response);
      setPapers(papers.filter((paper) => paper[0] !== doi));
    } catch (error) {
      console.error(error);
    }
  };

  const getPaper = async (doi) => {
    // Función para traer un solo artículo

    try {
      const response = await getPaperRequest(doi);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePaper = async (doi, newFields) => {
    try {
      const response = await updatePaperRequest(doi, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  // children será cualquier otro componente que quiera acceder al contexto
  // value será cualquier valor que los componentes hijos queramos que puedan acceder
  return (
    <PaperContext.Provider
      value={{ papers, loadPapers, deletePaper, getPaper, updatePaper }}
    >
      {children}
    </PaperContext.Provider>
  );
};
