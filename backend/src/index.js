import app from "./app.js";
import { config as dotenv } from "dotenv";

dotenv();

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on PORT ${PORT}`);
