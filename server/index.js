const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données
const database = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "reactnodesujet2",
});

// Route GET pour récupérer tous les utilisateurs
app.get("/api/get", (req, res) => {
  const request = "SELECT * FROM users";
  database.query(request, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

// Route POST pour ajouter un nouvel utilisateur
app.post("/api/add", (req, res) => {
  const { name, first_name } = req.body;

  // Vérification des champs nécessaires
  if (!name || !first_name) {
    return res.status(400).send("Le nom et le prénom sont requis !");
  }

  // Insertion du nouvel utilisateur dans la base de données
  const request = "INSERT INTO users (name, first_name) VALUES (?, ?)";
  database.query(request, [name, first_name], (error, result) => {
    if (error) {
      console.error("Erreur lors de l'ajout :", error);
      return res.status(500).send(error);
    }

    // Répondre avec l'utilisateur ajouté, y compris son ID généré
    const newUser = { id: result.insertId, name, first_name };
    res.status(201).send(newUser); // Code 201 : Créé
  });
});

// Route PUT pour mettre à jour un utilisateur
app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, first_name } = req.body;

  // Vérification des champs nécessaires
  if (!name || !first_name) {
    return res.status(400).send("Le nom et le prénom sont requis !");
  }

  // Mise à jour de l'utilisateur dans la base de données
  const request = `UPDATE users SET name = ?, first_name = ? WHERE id = ?`;
  database.query(request, [name, first_name, id], (error, result) => {
    if (error) {
      console.error("Erreur lors de la mise à jour:", error);
      return res.status(500).send(error);
    }

    // Si l'utilisateur a été trouvé et mis à jour
    if (result.affectedRows === 0) {
      return res.status(404).send("Utilisateur non trouvé.");
    }

    // Répond avec l'utilisateur mis à jour
    res.send({ id, name, first_name });
  });
});

// Route DELETE pour supprimer un utilisateur
app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;

  // Suppression de l'utilisateur dans la base de données
  const request = `DELETE FROM users WHERE id = ?`;
  database.query(request, [id], (error, result) => {
    if (error) {
      console.error("Erreur lors de la suppression :", error);
      return res.status(500).send(error);
    }

    // Si aucun utilisateur n'a été supprimé
    if (result.affectedRows === 0) {
      return res.status(404).send("Utilisateur non trouvé.");
    }

    // Répond avec un message de succès
    res.send({ message: "Utilisateur supprimé avec succès" });
  });
});

// Lancer le serveur
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
