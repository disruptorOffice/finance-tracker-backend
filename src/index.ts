import express, {Express} from "express";
import { authenticateJWT } from "./middlewares/authMiddleware";
import { routes } from './routes/app'
import { syncDatabase} from './database/database_define'
import { errorHandler } from "./errors/error.handler"
import cookieParser from 'cookie-parser'

const app: Express = express();


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(authenticateJWT)

routes(app)

app.use(errorHandler);

app.route("/").get((req, res) => {
  
  res.send("Finance Tracker API");
});

app.listen(3000, async () => {
  await syncDatabase()
  console.log("Server is running on http://localhost:3000");
});
