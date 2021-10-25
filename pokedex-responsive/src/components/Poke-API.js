const fetchData = async (endpoint) => {
    const req = await fetch(endpoint);
    const json = await req.json(); 
    return json;
}

const poke_api = {
    getPokemons: async (endpoint) => {
        return await fetchData(endpoint);
    },
    getTrendingPokemon: async (id) => {
        return await fetchData(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    },
    getPokemonByID: async (endpoint) => {
        return await fetchData(endpoint);
    },
    getPokemonSpecie: async (endpoint) => {
        return await fetchData(endpoint);
    },
    getPokemonEvolutionChain: async (endpoint) => {
        return await fetchData(endpoint);
    }
}

export default poke_api;