# CyberGuard Insights

CyberGuard Insights est une application développée en JavaScript utilisant MSAL pour se connecter à un compte Outlook. L'objectif principal de cette application est de tester l'efficacité des filtres anti-spam en envoyant des courriels de test.

# Fonctionnalités

   1. Authentification via MSAL : Les utilisateurs peuvent se connecter à leur compte Outlook à l'aide de MSAL.
   2. Envoi de courriels de test : Une fois connectés, les utilisateurs peuvent envoyer des courriels de test pour évaluer les filtres anti-spam.

# Contenu
------------------------------------------------------------------------------------------------------------------
| Fichier/dossier  | Description                                                                                  |
|-------------------|---------------------------------------------------------------------------------------------|
| `app`             | Contient les fichiers sources de l'exemple                                                  |
| `authPopup.js`    | La logique d'authentification principale réside ici  (utilisation du flux Popup).           |
| `authRedirect.js` | Utilisez ceci au lieu de `authPopup.js` pour l'authentification avec le flux de redirection.|
| `authConfig.js`   | Contient les paramètres de configuration pour l'exemple.                                    |
| `graph.js`        | Fournit une fonction d'aide pour appeler l'API MS Graph.                                    |
| `graphConfig.js`  | Contient les points de terminaison de l'API MS Graph.                                       |
| `ui.js`           | Contient la logique d'interface utilisateur.                                                |
| `index.html`      | Contient l'interface utilisateur de l'exemple.                                              |
| `.gitignore`      | Définit ce qu'il faut ignorer au moment du commit.                                          |
| `package.json`    | Manifeste du package pour npm.                                                              |
| `server.js`       | Implémente un serveur Node simple pour servir index.html.                                   |
------------------------------------------------------------------------------------------------------------------

# Configuration requise

Avant de commencer à utiliser l'application, assurez-vous d'avoir les éléments suivants en fonction du mode d'installation :

   1. Un compte Microsoft Outlook valide.
   2. Les identifiants de l'application pour accéder à l'API Microsoft Graph.
   3. Node.js installé sur votre machine.

Ou alors
   1. Un compte Microsoft Outlook valide.
   2. Un compte docker hub pour pouvoir pull l'image
   3. Docker d'installer sur votre machine

# Installation 1

1. Clonez ce dépôt sur votre machine locale en utilisant la commande suivante : `git clone <lien_du_depot>`
2. Installez les dépendances Node.js en utilisant npm (Node Package Manager) : `npm install`

# Configuration 1

1. Lancez l'application en utilisant la commande suivante : `npm start`
2. Accédez à l'application dans votre navigateur à l'adresse http://localhost:3000.
3. Connectez-vous à votre compte Outlook en utilisant l'interface de connexion.
4. Une fois connecté, vous pouvez commencer à envoyer des courriels de test pour évaluer les filtres anti-spam.

# Installation 2

1. Télécharger l'image docker depuis Docker Hub : [https://hub.docker.com/repository/docker/halcatraz/cyber-guard-insights/general]
2. Exécuter la commande suivante pour lancer le container
##
      docker run -p 3000:3000 halcatraz/cyber-guard-insights
3. Ouvrir dans le navigateur ou se connecter à [http://localhost:3000/]

# Avertissement

Cette application est destinée à des fins de test uniquement. Assurez-vous de respecter toutes les lois et réglementations applicables avant d'utiliser cette application pour envoyer des courriels de test.
