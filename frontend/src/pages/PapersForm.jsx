import { Formik, Form } from "formik";
import { createPaperRequest } from "../services/papers/createPaper";
import { usePapers } from "../context/paperContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PapersForm = () => {
  const { getPaper, updatePaper } = usePapers();

  const [paper, setPaper] = useState({
    // useState para rellenar los campos al modificar un artículo
    doi: "",
    titulo: "",
    fecha: "",
    resumen: "",
    numColegiado: "",
    revista: "",
    numLinea: "",
  });

  // Si tenemos parámetros el usuario está editando un artículo ya existente
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (params.doi) {
        // params nos lo transforma a string por lo que hay que convertirlo a entero
        const paperRes = await getPaper(params.doi);
        setPaper({
          doi: paperRes[0][0],
          titulo: paperRes[0][1],
          fecha: paperRes[0][2],
          resumen: paperRes[0][3],
          numColegiado: paperRes[0][4],
          revista: paperRes[0][5],
          numLinea: paperRes[0][6],
        });
      }
    };
    loadTask();
  }, []);

  return (
    <div>
      <Formik
        initialValues={paper}
        enableReinitialize={true}
        onSubmit={async (values) => {
          if (params.doi) {
            await updatePaper(params.doi, values);
          } else {
            try {
              //values es el articulo
              const response = await createPaperRequest(values);
              console.log(response);
            } catch (error) {
              console.error(error);
            }
          }
          navigate("/");
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.doi ? "Editar Artículo" : "Crear Artículo"}
            </h1>
            <label className="block">DOI</label>
            <input
              type="number"
              name="doi"
              className="px-2 py-1 rounded-sm w-full"
              placeholder="Escriba el DOI"
              onChange={handleChange}
              value={values.doi}
            />
            <label className="block">Título</label>
            <input
              type="text"
              name="titulo"
              className="px-2 py-1 rounded-sm w-full"
              placeholder="Escriba un título"
              onChange={handleChange}
              value={values.titulo}
            />
            <label className="block">Fecha</label>
            <input
              type="date"
              name="fecha"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.fecha}
            />

            <label className="block">Resumen</label>
            <textarea
              name="resumen"
              className="px-2 py-1 rounded-sm w-full"
              rows="3"
              placeholder="Escriba un resumen del artículo"
              onChange={handleChange}
              value={values.resumen}
            />

            <label className="block">Número de colegiado</label>
            <input
              type="number"
              name="numColegiado"
              className="px-2 py-1 rounded-sm w-full"
              placeholder="Indica el número de colegiado del investigador"
              onChange={handleChange}
              value={values.numColegiado}
            />

            <label className="block">Revista</label>
            <input
              type="text"
              name="revista"
              className="px-2 py-1 rounded-sm w-full"
              placeholder="Indica el nombre de la revista a la que se enviará"
              onChange={handleChange}
              value={values.revista}
            />

            <label className="block">Número de línea de investigación</label>
            <input
              type="number"
              name="numLinea"
              className="px-2 py-1 rounded-sm w-full"
              placeholder="Indica la línea de investigación a la que pertenece"
              onChange={handleChange}
              value={values.numLinea}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md"
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PapersForm;
