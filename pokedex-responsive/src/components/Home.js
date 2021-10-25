import react, { useState, useEffect } from "react";
import './Home.css';
import poke_api from './Poke-API';
import PokemonCard from './PokemonCard';
import TrendingPokemon from './TrendingPokemon';

const POKEMON_MAXIMUM_LENGTH = 898;

export default () => {
    const [pokemons, setPokemons] = useState([]);
    const [trendingPokemon, setTrendingPokemon] = useState(null);
    const [query, setQuery] = useState("");
    const [offset, setOffset] = useState(40);
    const [disabled, setDisabled] = useState(false);
    const [heightY, setHeightY] = useState(2135);

    useEffect(() => {
        const loadData = async () => {
            let list = await poke_api.getPokemons(`https://pokeapi.co/api/v2/pokemon/?limit=${offset}`);
            let results = await list.results;
            setPokemons(results);
            let randomID = Math.floor(Math.random() * POKEMON_MAXIMUM_LENGTH -1);
            let chosenPokemon = await poke_api.getTrendingPokemon(randomID);
            setTrendingPokemon(chosenPokemon);
        }

        loadData();
    }, []);

    const generateRandomPokemon = async () => {
        let randomID = Math.floor(Math.random() * POKEMON_MAXIMUM_LENGTH);
        let chosenPokemon = await poke_api.getTrendingPokemon(randomID);
        setTrendingPokemon(chosenPokemon);
    }

    const carregarMais = async () => {
        const diferenca = offset - POKEMON_MAXIMUM_LENGTH
        if (diferenca < 20) {
            if (diferenca > 0 && diferenca < 4) {
                setHeightY(heightY + 2100);
            } else if (diferenca >= 4 && diferenca < 8) {
                setHeightY(heightY + 1680);
            } else if (diferenca >= 8 && diferenca < 12) {
                setHeightY(heightY + 1260);
            } else if (diferenca >= 12 && diferenca < 16) {
                setHeightY(heightY + 840);
            } else if (diferenca >= 16 && diferenca < 20) {
                setHeightY(heightY + 420);
            } else {
                setHeightY(heightY + 2100);
            }
        }
        const newOffset = offset + 20;
        if (newOffset > POKEMON_MAXIMUM_LENGTH && diferenca < 0) {
            let list = await poke_api.getPokemons(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${Math.abs(diferenca)}`);
            let results = await list.results;
            let pokemonsList = pokemons.concat(results);
            setPokemons(pokemonsList);
            setOffset(offset + 20);
        } else if (newOffset < POKEMON_MAXIMUM_LENGTH && diferenca < 0) {
            let list = await poke_api.getPokemons(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}`);
            let results = await list.results;
            let pokemonsList = pokemons.concat(results);
            setPokemons(pokemonsList);
            setOffset(offset + 20);
        } else if (diferenca < 20) {
            setOffset(newOffset);
            setDisabled(true);
        }
    }

    return (
        <>
            {trendingPokemon &&
                <TrendingPokemon pokemon={trendingPokemon} />
            }
            {/*<div className="SearchForm">
        <form>
          <div className="SearchForm--bar">
            <label>
              <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
            </label>
          </div>
        </form>
        <a>Pesquisar</a>
    </div>*/}
            <section>
                {pokemons &&
                    <div className="PokemonList" style={{
                        marginTop: 50,
                        marginLeft: 90,
                        marginRight: 90,
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        height: heightY,
                        overflowY: 'hidden'
                    }}>
                        {pokemons.map((pokemon, key) => {
                            return (
                                <PokemonCard key={key} urlPokemon={pokemon.url} pokeScale={1}/>
                            );
                        })}
                    </div>
                }
            </section>
            {disabled ?
                <div className="ButtonCarregarDisabled">
                    <a>Carregar +</a>
                </div> :
                <div className="ButtonCarregar">
                    <a onClick={carregarMais}>Carregar +</a>
                </div>
            }
        </>
    );
}