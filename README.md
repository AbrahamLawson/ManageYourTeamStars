🌟 ManageYourTeamStar 🌟
Bienvenue dans ManageYourTeamStar ! Cette application est conçue pour aider les gestionnaires à organiser et suivre leur équipe efficacement. Elle fournit des outils de gestion pour ajouter, modifier et supprimer des membres d'équipe, ainsi que pour suivre les performances et les tâches.

📝 Fonctionnalités
🎉 Gestion des membres de l'équipe : Ajoutez, modifiez, et supprimez des membres facilement.
📊 Suivi des performances : Analysez les performances individuelles et globales.
🗓️ Organisation des tâches : Planifiez et assignez des tâches à vos membres d'équipe.
📈 Statistiques en temps réel : Visualisez les statistiques de l’équipe avec des graphiques.
⚙️ Prérequis
Avant de lancer l'application, assurer vous d'avoir installé les éléments suivants :

Node.js (version v23.1.0) 🌐
MySQL ou SQLite pour la base de données 💾
🚀 Installation
Voici comment installer et configurer l'application sur ton environnement local :

1. Clone le repository
bash
Copier le code
git clone https://github.com/ton-utilisateur/ManageYourTeamStar.git
cd ManageYourTeamStar
2. Configuration du Backend
Dans le dossier backend, acceder au fichiers index.js et modifier c'est valeurs avec les votre:
// Connexion à la base de données
const database = mysql2.createPool({
  host: "localhost",
  user: "*****",
  password: "*****",
  database: "reactnodesujet2",
});


bash
Copier le code
DATABASE_URL=mysql://username:password@localhost:3306/nom_de_la_base
⚠️ Remplace username, password, et nom_de_la_base avec les valeurs de ta base de données MySQL.

4. Installation des dépendances
Installe les dépendances pour le backend et le frontend :

bash
Copier le code
# Backend
cd sever
#Avec nodemon : nodemon index.js
- Server running on http://localhost:8000
#Sans nodemon :  node index.js
-Server running on http://localhost:8000

# Frontend
cd client
npm install
4. Lancer l'application
Lance l'application en deux étapes :

Backend : (API sur http://localhost:8001)

bash
Copier le code
cd backend
npm start
Frontend : (App sur http://localhost:5173)

bash
Copier le code
cd ../client/react-node-sujet2
npm start

📖 Utilisation
Accède au frontend via [http://localhost:5173](http://localhost:3000/).
Crée ton équipe et commence à ajouter des membres ! 👥
Utilise les différentes sections pour gérer les tâches, suivre les performances, et organiser ton équipe au mieux ! 🏆
📚 Stack Technologique
Frontend : React ⚛️, React Router, Cors
Backend : Node.js, Express 🚀, MySQL 💾
🛠️ Dépannage
Si tu rencontres des problèmes, assure-toi de vérifier :

Que toutes les dépendances sont bien installées avec npm install.
Que les services de MySQL sont bien démarrés pour le backend.
Verifier les infos concernant votre base de données.
📬 Contribuer
Les contributions sont les bienvenues ! N'hésite pas à faire un pull request ou à signaler des problèmes. 🤝

📄 Licence
Ce projet est sous licence MIT.

Merci d'utiliser ManageYourTeamStar ! 🚀






