import express, { Express } from "express";
import router from "./routes";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
