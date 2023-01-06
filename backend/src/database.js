import oracledb from "oracledb";
import { config as dotenv } from "dotenv";

dotenv();

try {
  oracledb.fetchAsString = [oracledb.CLOB]; // Para trabajar con clobs como strings
  await oracledb.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionString: process.env.DB_SERVER,
  });

  console.log("connected to database");
} catch (err) {
  console.log(err);
}
