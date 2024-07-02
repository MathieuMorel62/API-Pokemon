// Variable pour stocker l'action en cours (ajout ou modification)
let currentAction = '';

// Variable pour stocker les données du Pokémon original lors de la mise à jour
let originalPokemon = {};


// Fonction pour générer une couleur aléatoire
function RandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Exécute cette fonction lorsque le document est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    loadPokemonList();
});

// Fonction pour charger la liste des Pokémon depuis le serveur
function loadPokemonList() {
    fetch('/pokemon', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const pokemonList = document.getElementById('pokemon-list');
        pokemonList.innerHTML = '<h2>Liste des Pokémon disponibles:</h2>';
        const ul = document.createElement('ul');
        ul.id = 'pokemon-ul';
        ul.style.listStyleType = 'none';
        ul.style.fontSize = '1em';
        ul.style.display = 'flex';
        ul.style.flexWrap = 'wrap';
        ul.style.gap = '10px';
        data.forEach(name => {
            const li = createPokemonListItem(name);
            ul.appendChild(li);
        });
        pokemonList.appendChild(ul);
    });
}

// Fonction pour créer un élément de la liste de Pokémon avec une couleur aléatoire
function createPokemonListItem(name) {
    const li = document.createElement('li');
    li.textContent = name;
    li.style.backgroundColor = RandomColor();
    li.style.padding = '10px';
    li.style.borderRadius = '50px';
    li.style.color = 'white';
    li.style.textAlign = 'center';
    li.style.width = '90px';
    li.style.fontWeight = 'bold';
    li.id = `pokemon-${name}`;
    return li;
}

// Fonction pour masquer tous les formulaires et le conteneur de résultats
function hideAll() {
    document.getElementById('pokemon-form').style.display = 'none';
    document.getElementById('pokemon-update-form').style.display = 'none';
    document.getElementById('result').innerHTML = '';
}

// Fonction pour afficher le formulaire d'ajout ou de modification
function showForm(action) {
    hideAll();
    currentAction = action;
    if (action === 'add') {
        document.getElementById('pokemon-form').style.display = 'block';
        document.getElementById('form-title').innerText = 'Ajouter un Pokémon';
    }
}

// Fonction pour afficher le formulaire de mise à jour avec les données actuelles du Pokémon
function showUpdateForm() {
    hideAll();
    const name = prompt("Nom du Pokémon à modifier:");
    if (!name) {
        return; 
    }

    fetch(`/pokemon/${name}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Pokémon introuvable');
        }
        return response.json();
    })
    .then(data => {
        originalPokemon = data;
        document.getElementById('update-form-title').innerText = `Modifier ${data.name}`;
        document.getElementById('update-pokemon-height').value = data.height;
        document.getElementById('update-pokemon-weight').value = data.weight;
        document.getElementById('update-pokemon-image-url').value = data.image_url;
        document.getElementById('pokemon-update-form').style.display = 'block';
    })
    .catch(error => {
        displayMessage('Pokémon introuvable', false);
    });
}

// Fonction pour masquer le formulaire d'ajout
function hideForm() {
    document.getElementById('pokemon-form').style.display = 'none';
    document.getElementById('pokemon-update-form').style.display = 'none';
}

// Fonction pour masquer le formulaire de mise à jour
function hideUpdateForm() {
    document.getElementById('pokemon-update-form').style.display = 'none';
}

// Fonction pour afficher un message de succès ou d'erreur
function displayMessage(message, success = true) {
    const result = document.getElementById('result');
    result.innerText = message;
    result.style.width = '300px';
    result.style.fontWeight = 'bold';
    result.style.padding = '10px';
    result.style.borderRadius = '5px';
    result.style.color = 'white';
    result.style.whiteSpace = 'nowrap';
    result.style.backgroundColor = success ? 'green' : 'red';

    setTimeout(() => {
        result.innerText = '';
        result.style.backgroundColor = '';
    }, 1500);
}

// Fonction pour soumettre le formulaire d'ajout d'un nouveau Pokémon
function submitForm() {
    const name = document.getElementById('pokemon-name').value;
    const type = document.getElementById('pokemon-type').value;
    const height = parseInt(document.getElementById('pokemon-height').value);
    const weight = parseInt(document.getElementById('pokemon-weight').value);
    const imageUrl = document.getElementById('pokemon-image-url').value;

    if (!name || !type || !height || !weight || !imageUrl) {
        displayMessage('Tous les champs doivent être remplis', false);
        return;
    }

    const pokemon = { name, type, height, weight, image_url: imageUrl };

    fetch('/pokemon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pokemon)
    })
    .then(response => response.json())
    .then(data => {
        displayMessage(data.message, true);
        if (data.message === 'Nouveau Pokémon ajouté') {
            const pokemonList = document.getElementById('pokemon-ul');
            const newPokemon = createPokemonListItem(name);
            pokemonList.appendChild(newPokemon);
        }
    })
    .catch(error => {
        displayMessage('Erreur lors de l\'ajout du Pokémon', false);
    });

    hideForm();
    resetForm();
}

// Fonction pour réinitialiser les champs du formulaire d'ajout
function resetForm() {
    document.getElementById('pokemon-name').value = '';
    document.getElementById('pokemon-type').value = '';
    document.getElementById('pokemon-height').value = '';
    document.getElementById('pokemon-weight').value = '';
    document.getElementById('pokemon-image-url').value = '';
}

// Fonction pour soumettre le formulaire de mise à jour d'un Pokémon
function submitUpdateForm() {
    const name = originalPokemon.name;
    const height = parseInt(document.getElementById('update-pokemon-height').value) || originalPokemon.height;
    const weight = parseInt(document.getElementById('update-pokemon-weight').value) || originalPokemon.weight;
    const imageUrl = document.getElementById('update-pokemon-image-url').value || originalPokemon.image_url;

    const pokemon = { height, weight, image_url: imageUrl };

    fetch(`/pokemon/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pokemon)
    })
    .then(response => response.json())
    .then(data => {
        displayMessage(data.message, true);
    })
    .catch(error => {
        displayMessage('Erreur lors de la mise à jour du Pokémon', false);
    });

    hideUpdateForm();
}

// Fonction pour supprimer un Pokémon
function deletePokemon() {
    const name = prompt("Nom du Pokémon à supprimer:");

    if (!name) {
        return; 
    }

    fetch(`/pokemon/${name}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Pokemon introuvable') {
            displayMessage(data.message, false); 
        } else {
            displayMessage(data.message, true); 
            const pokemonToDelete = document.getElementById(`pokemon-${name}`);
            if (pokemonToDelete) {
                pokemonToDelete.remove();
            }
        }
    })
    .catch(error => {
        displayMessage('Erreur lors de la suppression du Pokémon', false);
    });
}

// Fonction pour afficher les détails d'un Pokémon
function getPokemon() {
    hideAll();
    const name = prompt("Nom du Pokémon à afficher:");

    if (!name) {
        return; 
    }

    fetch(`/pokemon/${name}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            displayMessage(data.message, false);
        } else {
            document.getElementById('result').innerHTML = `
                <div class="card">
                    <img src="${data.image_url}" alt="${data.name}" class="card-image">
                    <div class="card-content">
                        <h2>${data.name}</h2>
                        <p>Type: ${data.type}</p>
                        <p>Hauteur: ${data.height} cm</p>
                        <p>Poids: ${data.weight} g</p>
                    </div>
                </div>
            `;
        }
    })
    .catch(error => {
        displayMessage('Erreur lors de la récupération du Pokémon', false);
    });
}
