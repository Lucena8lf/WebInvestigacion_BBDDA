import { createContext, useContext, useState } from "react";
import { getAllPapers } from "../services/papers/getAllPapers";
import { deletePaper } from "../services/papers/deletePaper";

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
    // Función para cargar tareas que puede ser accedida por todos

    const response = await getAllPapers();
    // Guardamos los artículos en el estado
    setPapers(response.data);
  };

  const deletePaper = async (doi) => {
    // Función para borrar una tarea

    try {
      const response = await deletePaper(doi);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  // children será cualquier otro componente que quiera acceder al contexto
  // value será cualquier valor que los componentes hijos queramos que puedan acceder
  return (
    <PaperContext.Provider value={{ papers, loadPapers, deletePaper }}>
      {children}
    </PaperContext.Provider>
  );
};
