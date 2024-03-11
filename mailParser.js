const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction pour traiter le fichier
function traiterFichier(nomFichier) {
  fs.readFile(nomFichier, 'utf8', (err, data) => {
    if (err) {
      console.error("Erreur de lecture du fichier:", err);
      return;
    }

    const adresses = data.split(',').map(adresse => adresse.trim());
    console.log("Liste des adresses e-mail:");
    adresses.forEach(adresse => console.log(adresse));
  });
}

// Demander le nom du fichier à l'utilisateur
rl.question('Veuillez entrer le chemin vers le fichier texte contenant les adresses e-mail: ', (nomFichier) => {
  traiterFichier(nomFichier);
  rl.close();
});