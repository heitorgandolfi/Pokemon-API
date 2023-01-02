const form = document.querySelector(".form");
const inputSearch = document.querySelector(".inputSearch");
const nome = document.getElementById("nome");
const img = document.getElementById("img")
const botao = document.getElementById("botao");


const getPokemon = async (pokemon) => {
    const apiURL = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    const data = apiURL.json();
    return data;
}

const showPokemon = async (pokemon) => {
    const data = await getPokemon(pokemon);

    nome.innerHTML = data.name;
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
    inputSearch.value = "";

    console.log(data);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    showPokemon(inputSearch.value)
})