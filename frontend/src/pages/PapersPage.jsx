import { useEffect } from "react";
import PaperItem from "../components/PaperItem";
import { usePapers } from "../context/paperContext";

const PapersPage = () => {
  const { papers, loadPapers } = usePapers();

  // Traemos todos los artículos nada más cargue la página
  useEffect(() => {
    loadPapers();
  }, []);

  return (
    <div>
      <h1 className="text-5xl text-white font-bold text-center py-3">
        Artículos
      </h1>
      <div className="grid grid-cols-3 gap-2">
        {
          // Formateamos los artículos (nos devuelve un array de arrays)
          papers.map((paper) => (
            <PaperItem paper={paper} key={paper[0]} />
          ))
        }
      </div>
    </div>
  );
};

export default PapersPage;
