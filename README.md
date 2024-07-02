# <p align='center'>Pokémon Manager</p>

![pokemon](https://github.com/MathieuMorel62/API-Pokemon/assets/113856302/4e7c9b61-4b63-4dc6-bb9d-42242ac0b6c3)

Pokémon Manager est une application web développée avec Flask, conçue pour gérer une base de données de Pokémon. Elle permet aux utilisateurs d'ajouter, de mettre à jour, de supprimer et de visualiser les Pokémon dans une interface utilisateur simple.

## Ressources:

- [Flask](https://flask-fr.readthedocs.io/index.html)
- [API Avec Flask](https://datascientest.com/programmation-dapi-web-sous-python-avec-flask)
- [Request](https://tedboy.github.io/flask/generated/generated/flask.Request.html)
- [Jsonify](https://tedboy.github.io/flask/generated/flask.jsonify.html)
- [MySQLdb](https://pypi.org/project/Flask-MySQLdb/)
- [SQL](https://sql.sh)

## Technologies Utilisées

- `Backend` : Flask, Python
- `Frontend` : HTML, CSS, JavaScript
- `Base de données` : MySQL

## Fonctionnalités

- **Ajouter un Pokémon** : Ajoutez de nouveaux Pokémon à la base de données avec leur nom, type, taille, poids et une URL d'image.
- **Afficher les Pokémon** : Visualisez une liste de tous les Pokémon disponibles dans la base de données avec des badges colorés.
- **Détails d'un Pokémon** : Affichez les détails d'un Pokémon spécifique, y compris son image et ses statistiques.
- **Modifier un Pokémon** : Mettez à jour les informations d'un Pokémon existant.
- **Supprimer un Pokémon** : Supprimez un Pokémon de la base de données de manière permanente.
- **Vérification d'existence** : Vérifiez si un Pokémon existe déjà dans la base de données.
  
## Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/MathieuMorel62/API-Pokemon.git
```

2. Naviguez vers le dossier :

```bash
cd Api-demo
```

3. Installez les dépendances :

```bash
pip install -r requirements.txt
```

4. Configurez la base de données :

- Créez une base de données MySQL nommée `pokemon_db`.
- Exécutez le script SQL pour créer la table `pokemons` :

```bash
mysql -u votre-utilisateur -p pokemon_db < create_table.sql
```

5. Configurez les variables d'environnement pour la connexion à la base de données dans app.py :

```bash
export MYSQL_HOST=localhost
export MYSQL_USER=votre-utilisateur
export MYSQL_PASSWORD=votre-mot-de-passe
export MYSQL_DB=pokemon_db
```

6. Lancez l'application :

```bash
python3 app.py
```

7. Accédez à l'application dans votre navigateur à l'adresse `http://127.0.0.1:5000`.

https://github.com/MathieuMorel62/API-Pokemon/assets/113856302/647c6498-3876-4850-9581-8de9e278aa02

## 📬 Contact
- LinkedIn: [Mathieu Morel](https://www.linkedin.com/in/mathieumorel62/)
