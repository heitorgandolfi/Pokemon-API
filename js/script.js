const getPokemon = async (pokemon) => {
    const apiURL = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    const data = apiURL.json();
    return data;
}

const showPokemon = async (pokemon) => {
    const data = await getPokemon(pokemon);
    console.log(data);
}

showPokemon("pikachu");