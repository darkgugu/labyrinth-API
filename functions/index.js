const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const labyrinth = require("./labyrinth.js");
const swaggerDocs = yaml.load((__dirname, "swagger.yaml"));

const app = express();
app.use(cors({ origin: true }));

app.get("/labyrinth", (req, res) => {
  try {
    const reponse = labyrinth(req.query.hauteur, req.query.largeur);
    res.json(reponse);
  } catch (error) {
    console.error("Error in labyrinth function:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Serve Swagger documentation at /api-docs
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, { explorer: true })
  );
  
  // Handle any undefined routes (404)
  app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found 404" });
  });
// Export the Express app as a Firebase function
exports.api = functions.https.onRequest(app);