// 1. INPORTS --> NPM, MODULOS PROPIOS

const express = require("express");
require("dotenv").config();
// console.log(process.env);
const characterRouter = require("./api/characters/character.router");
const { connectMongo } = require("./utils/db");
const {
  notFoundHandler,
  errorHandler,
} = require("./api/middleware/error.middleware");

// 2. CONFIG
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

connectMongo();

// 3. ENDPOINTS
//app.get(ruta del endpoint, controlador)
app.get("/", (req, res) => {
  res.json({ message: "El servidor está funcionando" });
});

app.use("/characters", characterRouter);

// 4. MANEJO EXCEPCIONES / ERRORES

app.use(notFoundHandler);
app.use(errorHandler);

// 5. ACTIVAR
app.listen(PORT, () => {
  console.log(`El servidor se ha iniciado en el puerto: ${PORT}`);
});
