using System;
using System.Collections.Generic;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        // Chemin vers le fichier texte contenant les adresses e-mail
        string cheminFichier = "D:\Git\Mail-spamming-generator\mails.txt";

        // Liste pour stocker les adresses e-mail extraites
        List<string> adressesEmail = new List<string>();

        try
        {
            // Lecture du fichier
            using (StreamReader sr = new StreamReader(cheminFichier))
            {
                // Lecture de la ligne complète
                string ligne = sr.ReadLine();

                // Séparation des adresses e-mail en utilisant la virgule comme séparateur
                string[] adresses = ligne.Split(',');

                // Ajout des adresses e-mail à la liste
                foreach (string adresse in adresses)
                {
                    // Suppression des espaces avant et après l'adresse e-mail
                    string adresseNettoyee = adresse.Trim();
                    
                    // Vérification si l'adresse est non vide et est une adresse e-mail valide
                    if (!string.IsNullOrEmpty(adresseNettoyee) && IsValidEmail(adresseNettoyee))
                    {
                        adressesEmail.Add(adresseNettoyee);
                    }
                }
            }

            // Affichage des adresses e-mail extraites
            foreach (string email in adressesEmail)
            {
                Console.WriteLine(email);
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("Une erreur s'est produite : " + e.Message);
        }
    }

    // Méthode pour vérifier si une chaîne est une adresse e-mail valide
    static bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }
}