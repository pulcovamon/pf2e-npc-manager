import express, { Express } from "express";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import cors from "cors";
import sequelize from "./database";
import "./models/creature";
import "./models/trait";
import "./models/models";

const app: Express = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}))

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to sync database:", error);
  });
