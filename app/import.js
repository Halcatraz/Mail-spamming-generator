
// Fonction pour traiter le fichier
function traiterFichier(data) {
    const adresses = data.split(',').map(adresse => adresse.trim());
    console.log("Liste des adresses e-mail:");
    adresses.forEach(adresse => console.log(adresse));
};
document.getElementById('listImport').addEventListener('change', function() {
    var file = this.files[0];
    var reader = new FileReader();

    console.log('Le fichier ' + file.name + ' a été uploadé.');

    reader.onload = function(event) {
    var fileContent = event.target.result;
    document.getElementById('fileContent').textContent = fileContent;
    document.getElementById('diffusion').textContent = fileContent;
    
    // utilisation contenu du fichier ici
    traiterFichier(document.getElementById('fileContent').textContent);
    };
    reader.onerror = function(event) {
        console.error("Une erreur s'est produite lors de la lecture du fichier");
    };

    reader.readAsText(file);
    // possibilité ajouter ici autres actions à effectuer une fois le fichier uploadé
    
    
});
        