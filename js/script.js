// Form

const form = document.querySelector(".form");
const inputSearch = document.querySelector(".inputSearch");
const btnSearch = document.getElementById("subBtn");

// Cores

const colors = {
    fire: '#F08030',
    grass: '#57B924',
    electric: '#FFFF87',
    water: '#6792FA',
    ground: '#F5D779',
    rock: '#B7A038',
    fairy: '#DBA4DA',
    poison: '#A63CA8',
    bug: '#A8B71F',
    dragon: '#7930FF',
    psychic: '#FF5690',
    flying: '#B59BFF',
    fighting: '#BE3129',
    normal: '#A9AA7A',
    dark: '#6F5847',
    steel: '#B8B8D1',
    ice: '#97D7D7',
    ghost: '#6F5895'
};

const mainTypes = Object.keys(colors);
const imgContainer = document.querySelector(".img-container");

// Dados Pokedex

const pokemonName = document.getElementById("name");
const pokeId = document.querySelector(".id");
const pokemonImg = document.getElementById("img")
const pokeType = document.querySelector(".type");
const pokeHeight = document.querySelector(".height");
const pokeWeight = document.querySelector(".weight");

const pokeHp = document.querySelector(".stat-hp");
const pokeAtk = document.querySelector(".stat-atk")
const pokeDef = document.querySelector(".stat-def")
const pokeSpcAtk = document.querySelector(".stat-spc-atk")
const pokeSpcDef = document.querySelector(".stat-spc-def")
const pokeSpd = document.querySelector(".stat-spd")


// Funções

const getPokemon = async (pokemon) => {
    const apiURL = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = apiURL.json();
    return data;
}

const showPokemon = async (pokemon) => {
    const data = await getPokemon(pokemon);
    const types = data.types.map((typeInfo) => typeInfo.type.name).join("   |   ");

    pokemonName.innerHTML = data.name;
    pokeId.innerHTML = `#${data.id.toString().padStart(3, '0')}`;

    pokemonImg.src = `https://raw.githubusercontent.com/RafaelSilva2k22/PokemonImages/main/images/${data.id}.png`;

    pokeType.innerHTML = types;
    const type = mainTypes.find(type => types.indexOf(type) > - 1);
    const color = colors[type];
    imgContainer.style.backgroundColor = color;

    pokeHeight.innerHTML = `Height: ${data.height / 10} m`.replace(".", ",");
    pokeWeight.innerHTML = `Weight: ${data.weight / 10} kg`.replace(".", ",");

    pokeHp.innerHTML = `HP: ${data.stats[0].base_stat}`;
    pokeAtk.innerHTML = `Attack: ${data.stats[1].base_stat}`;
    pokeDef.innerHTML = `Defense: ${data.stats[2].base_stat}`;
    pokeSpcAtk.innerHTML = `Special Attack: ${data.stats[3].base_stat}`;
    pokeSpcDef.innerHTML = `Special Defense: ${data.stats[4].base_stat}`;
    pokeSpd.innerHTML = `Speed: ${data.stats[5].base_stat}`;

    inputSearch.value = "";
    // console.log(data);
}

// Eventos

form.addEventListener("submit", (e) => {
    e.preventDefault();
    showPokemon(inputSearch.value.toLowerCase());
})