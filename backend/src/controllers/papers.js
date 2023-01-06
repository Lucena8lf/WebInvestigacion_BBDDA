import oracledb from "oracledb";

export const getPapers = async (req, res, next) => {
  try {
    const conn = await oracledb.getConnection();
    const result = await conn.execute("SELECT * FROM ARTICULO");
    res.json(result.rows);
    await conn.close();
  } catch (error) {
    next(error);
  }
};

export const getPaper = async (req, res, next) => {
  try {
    const conn = await oracledb.getConnection();
    //const sql = "SELECT * FROM ARTICULO WHERE DOI = :a";
    //const binds = [req.params.doi];

    const result = await conn.execute(
      "SELECT * FROM ARTICULO WHERE DOI = :doi",
      [req.params.doi]
    );

    if (typeof result.rows !== "undefined" && result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res
        .status(404)
        .json({ message: "El artículo solicitado no ha sido encontrado" });
    }
    await conn.close();
  } catch (error) {
    next(error);
  }
};

export const createPaper = async (req, res, next) => {
  try {
    const conn = await oracledb.getConnection();

    const { doi, titulo, fecha, resumen, numColegiado, revista, numLinea } =
      req.body;
    const result = await conn.execute(
      "INSERT INTO ARTICULO(doi, titulo, fecha, resumen, numColegiado, revista, numLinea) VALUES (:d, :t, TO_DATE(:f,'DD/MM/YYYY'), :r, :n, :rv, :nl)",
      [doi, titulo, fecha, resumen, numColegiado, revista, numLinea],
      { autoCommit: true }
    );

    res.sendStatus(201);
    await conn.close();
  } catch (error) {
    next(error);
  }
};

export const updatePaper = async (req, res, next) => {
  try {
    const conn = await oracledb.getConnection();

    const result = await conn.execute(
      "UPDATE ARTICULO SET :b WHERE DOI=:doi",
      [req.body, req.params.doi],
      { autoCommit: true }
    );

    res.sendStatus(204);
    await conn.close();
  } catch (error) {
    next(error);
  }
};

export const deletePaper = async (req, res, next) => {
  try {
    const conn = await oracledb.getConnection();

    const result = await conn.execute(
      "DELETE FROM ARTICULO WHERE DOI=:doi",
      [req.params.doi],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0)
      return res.status(404).json({ message: "Artículo no encontrado" });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
