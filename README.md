# Pokémon Manager

Une application Flask pour gérer une base de données de Pokémon.

## Ressources:

- [Flask](https://flask-fr.readthedocs.io/index.html)
- [API Avec Flask](https://datascientest.com/programmation-dapi-web-sous-python-avec-flask)
- [Request](https://tedboy.github.io/flask/generated/generated/flask.Request.html)
- [Jsonify](https://tedboy.github.io/flask/generated/flask.jsonify.html)
- [MySQLdb](https://pypi.org/project/Flask-MySQLdb/)
- [SQL](https://sql.sh)

## Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/votre-utilisateur/votre-repo.git
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

## Utilisation

L'application permet de :

- Ajouter un nouveau Pokémon.
- Afficher les détails d'un Pokémon spécifique.
- Modifier les informations d'un Pokémon.
- Supprimer un Pokémon.
- Afficher la liste de tous les Pokémon disponibles.

