// Cores
const colors = {
  fire: "#F08030",
  grass: "#57B924",
  electric: "#FFFF87",
  water: "#6792FA",
  ground: "#F5D779",
  rock: "#B7A038",
  fairy: "#DBA4DA",
  poison: "#A63CA8",
  bug: "#A8B71F",
  dragon: "#7930FF",
  psychic: "#FF5690",
  flying: "#B59BFF",
  fighting: "#BE3129",
  normal: "#A9AA7A",
  dark: "#6F5847",
  steel: "#B8B8D1",
  ice: "#97D7D7",
  ghost: "#6F5895",
};

const mainTypes = Object.keys(colors);
const articleColor = document.querySelector("#article");

// Seletores
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".inputSearch");
const btnSearch = document.getElementById("subBtn");
const showArticle = document.querySelector("#article");
const showModal = document.querySelector(".modal");

// Dados Pokedex
const pokemonImg = document.getElementById("img");
const pokeType = document.querySelector(".type");
const pokemonName = document.getElementById("name");
const pokeId = document.querySelector(".id");
const pokeHeight = document.querySelector(".height");
const pokeWeight = document.querySelector(".weight");
const pokeHp = document.querySelector(".stat-hp");
const pokeAtk = document.querySelector(".stat-atk");
const pokeDef = document.querySelector(".stat-def");
const pokeSpcAtk = document.querySelector(".stat-spc-atk");
const pokeSpcDef = document.querySelector(".stat-spc-def");
const pokeSpd = document.querySelector(".stat-spd");

// Funções

const getPokemon = async (pokemon) => {
  try {
    const apiURL = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!apiURL.ok) {
      showModal.innerHTML =
        "Ops... Pokemon não localizado. Verifique se digitou o nome ou o ID corretamente.";
      modalInfo();
      throw new Error("O ID ou nome do Pokemon não foi localizado.");
    } else {
      const data = apiURL.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const showPokemon = async (pokemon) => {
  if (!inputSearch.value) {
    showModal.innerHTML =
      "Ops... Para prosseguir, digite o ID ou o nome do Pokemon.";
    modalInfo();
  } else {
    const data = await getPokemon(pokemon);
    const types = data.types
      ?.map((typeInfo) => typeInfo.type.name)
      .join("   |   ");
    const type = mainTypes.find((type) => types.indexOf(type) > -1);
    const color = colors[type];

    innerData(data, color, types);
  }
};

function innerData(data, color, types) {
  pokemonName.innerHTML = data.name;
  pokeId.innerHTML = `#${data.id.toString().padStart(3, "0")}`;
  pokemonImg.src = `https://raw.githubusercontent.com/RafaelSilva2k22/PokemonImages/main/images/${data.id}.png`;
  pokeType.innerHTML = types;
  articleColor.style.backgroundColor = color;
  pokeHeight.innerHTML = `
  <span class="bold">Height:</span> ${data.height / 10}m`.replace(".", ",");
  pokeWeight.innerHTML = `
  <span class="bold">Weight:</span> ${data.weight / 10}kg`.replace(".", ",");
  pokeHp.innerHTML = `<span class="bold">HP:</span> ${data.stats[0].base_stat} <br /><progress value="${data.stats[0].base_stat}" max="220" />`;
  pokeAtk.innerHTML = `<span class="bold">Attack:</span> ${data.stats[1].base_stat} <br /><progress value="${data.stats[1].base_stat}" max="220" />`;
  pokeDef.innerHTML = `<span class="bold">Defense:</span> ${data.stats[2].base_stat} <br /><progress value="${data.stats[2].base_stat}" max="220" />`;
  pokeSpcAtk.innerHTML = `<span class="bold">Special Attack:</span> ${data.stats[3].base_stat} <br /><progress value="${data.stats[3].base_stat}" max="220" />`;
  pokeSpcDef.innerHTML = `<span class="bold">Special Defense:</span> ${data.stats[4].base_stat} <br /><progress value="${data.stats[4].base_stat}" max="220" />`;
  pokeSpd.innerHTML = `<span class="bold">Speed:</span> ${data.stats[5].base_stat} <br /><progress value="${data.stats[5].base_stat}" max="220" />`;

  inputSearch.value = "";
  showArticle.style.display = "flex";
}

const modalInfo = () => {
  showArticle.style.display = "none";
  showModal.style.display = "block";
  setTimeout(() => {
    showModal.style.display = "none";
  }, 3000);
};

// Eventos
form.addEventListener("submit", (e) => {
  e.preventDefault();
  showPokemon(inputSearch.value.trim().toLowerCase());
});
