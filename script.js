const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Fetch Pokémon data
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            alert('Pokémon not found');
        });
});

function displayPokemon(pokemon) {
    document.getElementById('pokemon-name').textContent = pokemon.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `#${pokemon.id}`;
    document.getElementById('weight').textContent = `Weight: ${pokemon.weight}`;
    document.getElementById('height').textContent = `Height: ${pokemon.height}`;

    document.getElementById('hp').textContent = `${pokemon.stats[0].base_stat}`;
    document.getElementById('attack').textContent = `${pokemon.stats[1].base_stat}`;
    document.getElementById('defense').textContent = `${pokemon.stats[2].base_stat}`;
    document.getElementById('special-attack').textContent = `${pokemon.stats[3].base_stat}`;
    document.getElementById('special-defense').textContent = `${pokemon.stats[4].base_stat}`;
    document.getElementById('speed').textContent = `${pokemon.stats[5].base_stat}`;

    const sprite = document.getElementById('sprite');
    sprite.src = pokemon.sprites.front_default;
    sprite.alt = pokemon.name;
    sprite.style.visibility = "visible";

    const types = document.getElementById('types');
    types.innerHTML = pokemon.types
        .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
        .join('');
}