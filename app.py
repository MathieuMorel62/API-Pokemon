from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_mysqldb import MySQL
from werkzeug.exceptions import HTTPException


# Initialiser l'application Flask
app = Flask(__name__, static_url_path='', static_folder='static')

# Configuration de la connexion MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'votre-utilisateur'
app.config['MYSQL_PASSWORD'] = 'votre-mot-de-passe'
app.config['MYSQL_DB'] = 'pokemon_db'

# Initialiser la connexion MySQL
mysql = MySQL(app)


# Route pour servir le fichier HTML principal
@app.route('/')
def serve_html():
    return render_template('index.html')


# Endpoint pour récupérer les noms de tous les Pokémon (GET /pokemon)
@app.route('/pokemon', methods=['GET'])
def get_all_pokemon():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT name FROM pokemons")
        pokemons = cursor.fetchall()
        cursor.close()
        names = [pokemon[0] for pokemon in pokemons]
        return jsonify(names)
    except Exception as e:
        return jsonify({'message': 'Erreur lors de la récupération des Pokémon', 'error': str(e)}), 500


# Endpoint pour récupérer les informations d'un Pokémon spécifique (GET /pokemon/<name>)
@app.route('/pokemon/<name>', methods=['GET'])
def get_pokemon(name):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM pokemons WHERE BINARY name = %s", [name])
        pokemon = cur.fetchone()
        cur.close()
        if pokemon:
            return jsonify(
              {
                'id': pokemon[0],
                'name': pokemon[1],
                'type': pokemon[2],
                'height': pokemon[3],
                'weight': pokemon[4],
                'image_url': pokemon[5]
              }
            )
        else:
            return jsonify({'message': 'Pokemon introuvable'}), 404
    except Exception as e:
        return jsonify({'message': 'Erreur lors de la récupération du Pokémon', 'error': str(e)}), 500


# Endpoint pour vérifier l'existence d'un Pokémon (GET /pokemon_exists/<name>)
@app.route('/pokemon_exists/<name>', methods=['GET'])
def pokemon_exists(name):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT COUNT(*) FROM pokemons WHERE name = %s", [name])
        count = cur.fetchone()[0]
        cur.close()
        if count > 0:
            return jsonify({'exists': True})
        else:
            return jsonify({'exists': False}), 404
    except Exception as e:
        return jsonify({'message': 'Erreur lors de la vérification du Pokémon', 'error': str(e)}), 500


# Endpoint pour ajouter un nouveau Pokémon (POST /pokemon)
@app.route('/pokemon', methods=['POST'])
def add_pokemon():
    data = request.get_json()
    if not data or not all(k in data for k in ('name', 'type', 'height', 'weight', 'image_url')):
        return jsonify({'message': 'Tous les champs doivent être remplis'}), 400

    name = data['name']
    type = data['type']
    height = data['height']
    weight = data['weight']
    image_url = data['image_url']

    try:
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO pokemons (name, type, height, weight, image_url) VALUES (%s, %s, %s, %s, %s)", (name, type, height, weight, image_url))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Nouveau Pokémon ajouté'}), 201
    except Exception as e:
        return jsonify({'message': 'Erreur lors de l\'ajout du Pokémon', 'error': str(e)}), 500


# Endpoint pour mettre à jour un Pokémon existant (PUT /pokemon/<name>)
@app.route('/pokemon/<name>', methods=['PUT'])
def update_pokemon(name):
    data = request.get_json()
    if not data or not any(k in data for k in ('height', 'weight', 'image_url')):
        return jsonify({'message': 'Au moins un champ doit être rempli pour la mise à jour'}), 400

    height = data.get('height')
    weight = data.get('weight')
    image_url = data.get('image_url')

    try:
        cur = mysql.connection.cursor()
        cur.execute("UPDATE pokemons SET height = %s, weight = %s, image_url = %s WHERE name = %s", (height, weight, image_url, name))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Pokémon mis à jour'})
    except Exception as e:
        return jsonify({'message': 'Erreur lors de la mise à jour du Pokémon', 'error': str(e)}), 500


# Endpoint pour supprimer un Pokémon (DELETE /pokemon/<name>)
@app.route('/pokemon/<name>', methods=['DELETE'])
def delete_pokemon(name):
    if not name:
        return jsonify({'message': 'Le nom du Pokémon doit être fourni'}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM pokemons WHERE BINARY name = %s", [name])
        if cur.rowcount == 0:
            cur.close()
            return jsonify({'message': 'Pokemon introuvable'}), 404
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Pokémon supprimé'})
    except Exception as e:
        return jsonify({'message': 'Erreur lors de la suppression du Pokémon', 'error': str(e)}), 500


# Gestion des erreurs HTTP
@app.errorhandler(HTTPException)
def handle_exception(e):
    response = e.get_response()
    response.data = jsonify(code=e.code, name=e.name, description=e.description).get_data()
    response.content_type = "application/json"
    return response


# Gestion des erreurs générales
@app.errorhandler(Exception)
def handle_generic_exception(e):
    response = jsonify(code=500, name="Internal Server Error", description=str(e))
    return response, 500


if __name__ == '__main__':
    app.run(debug=False)
