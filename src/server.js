import app from "./server/index.js";
import "dotenv/config";
import { Pool } from "pg";

const port = 9000;
const host = "localhost";

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
