import { deletePaper } from "../services/papers/deletePaper";
import { usePapers } from "../context/paperContext";

const PaperItem = ({ paper }) => {
  const { deletePaper } = usePapers();

  return (
    <div>
      <h2> {paper[0]}</h2>
      <h2> {paper[1]}</h2>
      <p> {paper[2]}</p>
      <p> {paper[3]}</p>
      <p> {paper[4]}</p>
      <p> {paper[5]}</p>
      <p> {paper[6]}</p>
      <button>Editar</button>
      <button onClick={() => deletePaper(paper[0])}>Elminar</button>
    </div>
  );
};

export default PaperItem;
