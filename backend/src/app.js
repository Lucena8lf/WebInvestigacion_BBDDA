import express from "express";
import cors from "cors";
import "./database.js"; // Nos conectamos a la pool al iniciar la app
import { handleError } from "./middlewares/handleError.js";
import { notFound } from "./middlewares/notFound.js";
import papersRoutes from "./routes/papers.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(papersRoutes);

// Manejo de errores
app.use(notFound);
app.use(handleError);

export default app;
