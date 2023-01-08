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
      Papers Page
      {console.log(papers)}
      {
        // Formateamos los artículos (nos devuelve un array de arrays)
        papers.map((paper) => (
          <PaperItem paper={paper} key={paper[0]} />
        ))
      }
    </div>
  );
};

export default PapersPage;
