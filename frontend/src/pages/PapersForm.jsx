import { Formik, Form } from "formik";
import { createPaper } from "../services/papers/createPaper";
import { usePapers } from "../context/paperContext";

const PapersForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          doi: "",
          titulo: "",
          fecha: "",
          resumen: "",
          numColegiado: "",
          revista: "",
          numLinea: "",
        }}
        onSubmit={async (values) => {
          try {
            //values es el articulo
            const response = await createPaper(values);
            console.log(response);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label>DOI</label>
            <input
              type="number"
              name="doi"
              placeholder="Escriba el DOI"
              onChange={handleChange}
            />
            <label>Título</label>
            <input
              type="text"
              name="titulo"
              placeholder="Escriba un título"
              onChange={handleChange}
            />
            <label>Fecha</label>
            <input type="date" name="fecha" onChange={handleChange} />

            <label>Resumen</label>
            <input
              type="textarea"
              name="resumen"
              placeholder="Escriba un resumen del artículo"
              onChange={handleChange}
            />

            <label>Número de colegiado</label>
            <input type="number" name="numColegiado" onChange={handleChange} />

            <label>Revista</label>
            <input
              type="text"
              name="revista"
              placeholder="Indica el nombre de la revista a la que se enviará"
              onChange={handleChange}
            />

            <label>Número de línea de investigación</label>
            <input
              type="number"
              name="numLinea"
              placeholder="Indica la línea de investigación a la que pertenece"
              onChange={handleChange}
            />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PapersForm;
