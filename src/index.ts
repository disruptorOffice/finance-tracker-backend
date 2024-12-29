import express, {Express} from "express";

import { routes } from './routes/app'
import { syncDatabase} from './database/database_define'

const app: Express = express();



routes(app)

app.route("/").get((req, res) => {
  
  res.send("Finance Tracker API");
});

app.listen(3000, async () => {
  await syncDatabase()
  console.log("Server is running on http://localhost:3000");
});
