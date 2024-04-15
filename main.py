#importation necessaire

# only needed if run directly on computer
# by using container docker, we don't need it just install the requirement in dockerfile
# import subprocess
#definition des variables de librairies, des chemins des fichiers necessaires
# libraries = ['transformers', 'tensorflow','torch', 'flask']
# # libraries = ['AutoTokenizer', 'tensorflow','torch', 'AutoModelForCausalLM']


# #installation des librairies et importation des pacquages necessaires
# for lib in libraries:
#     try:
#         __import__(lib)
#     except ImportError:
#         subprocess.run(['pip', 'install', lib])

import random
from transformers import AutoTokenizer, AutoModelForCausalLM

def generate_text():
    file_path = "exp_entry.txt"
    output_dir = "output"
    longueur= 50
    # Recuperation des potentielles entrées de l'IA
    lines=[]
    with open(file_path, 'r') as file:
        lines = file.read().split(sep='\n')

    #recuperation du model (IA) et du tokenizer (il permet de decoupper une expression en mot séparer ou en lettre, ca dépend du concepteur de l'IA)
    tokenizer = AutoTokenizer.from_pretrained(output_dir)
    model = AutoModelForCausalLM.from_pretrained(output_dir)


    # Tokeniser le texte d'entrée
    input_ids = tokenizer.encode(random.choice(lines), return_tensors="pt")

    # Faire des prédictions
    output = model.generate(input_ids, max_length=longueur, num_return_sequences=1, pad_token_id=50256)

    # Décoder les tokens générés en texte
    decoded_output = tokenizer.decode(output[0], skip_special_tokens=True)

    # Afficher le texte généré
    print(decoded_output)
    return decoded_output

if __name__ == '__main__':
    generate_text()
