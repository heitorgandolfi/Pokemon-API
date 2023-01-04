// Form

const form = document.querySelector(".form");
const inputSearch = document.querySelector(".inputSearch");
const btnSearch = document.getElementById("subBtn");

// Dados Pokedex

const pokemonName = document.getElementById("nome");
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
    const types = data.types.map(typeInfo => typeInfo.type.name).join("   |   ");

    pokemonName.innerHTML = data.name;
    pokeId.innerHTML = `#${data.id}`;

    pokemonImg.src = `https://raw.githubusercontent.com/RafaelSilva2k22/PokemonImages/main/images/${data.id}.png`;

    pokeType.innerHTML = types;

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