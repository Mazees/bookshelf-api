import express from "express";
import routes from "../routes/index.js";
import NotFoundError from "../exceptions/not-found-error.js";
import ErrorHandler from "../middlewares/error.js";

const app = express();

app.use(express.json());
app.use(routes);
app.use((req, res, next) => {
  next(new NotFoundError("Route tidak ditemukan"));
});
app.use(ErrorHandler);

export default app;
