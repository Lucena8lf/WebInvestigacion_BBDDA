import { usePapers } from "../context/paperContext";
import { useNavigate } from "react-router-dom";

const PaperItem = ({ paper }) => {
  const { deletePaper } = usePapers();
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-700 text-white rounded-md p-4">
      <h2 className="text-sm font-bold italic"> {paper[0]}</h2>
      <h2 className="text-sm font-bold"> {paper[1]}</h2>
      <p className="text-xs"> {paper[2]}</p>
      <p className="text-xs"> {paper[3]}</p>
      <br />
      <p className="text-sm"> {"Investigador: " + paper[4]}</p>
      <p className="text-sm"> {"Revista: " + paper[5]}</p>
      <p className="text-sm"> {"Línea de investigación: " + paper[6]}</p>
      <br />
      <div className="flex gap-x-2">
        <button
          className="bg-slate-300 px-2 py-1 text-black"
          onClick={() => navigate(`/edit/${paper[0]}`)}
        >
          Editar
        </button>
        <button
          className="bg-red-500 px-2 py-1 text-black"
          onClick={() => deletePaper(paper[0])}
        >
          Elminar
        </button>
      </div>
    </div>
  );
};

export default PaperItem;
