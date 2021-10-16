import './App.css';
import Header from './components/Header';
import react, { useState, useEffect } from 'react';
import poke_api from './components/Poke-API';
import PokemonCard from './components/PokemonCard';
import TrendingPokemon from './components/TrendingPokemon';

//A7D3A6 CFE795 F7EF81 D4C685 https://pokeapi.co/api/v2/pokemon/?limit=898

const POKEMON_MAXIMUM_LENGTH = 898;

export default () => {
  const [pokemons, setPokemons] = useState([]);
  const [trendingPokemon, setTrendingPokemon] = useState(null);
  const [query, setQuery] = useState("");
  const [headerColor, setHeaderColor] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      let list = await poke_api.getPokemons(`https://pokeapi.co/api/v2/pokemon/`);
      setPokemons(list.results);
      let randomID = Math.floor(Math.random() * POKEMON_MAXIMUM_LENGTH);
      let chosenPokemon = await poke_api.getTrendingPokemon(randomID);
      setTrendingPokemon(chosenPokemon);
    }

    loadData();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 5) {
        setHeaderColor(true);
      } else {
        setHeaderColor(false);
      }
    };

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  const generateRandomPokemon = async () => {
    let randomID = Math.floor(Math.random() * POKEMON_MAXIMUM_LENGTH);
    let chosenPokemon = await poke_api.getTrendingPokemon(randomID);
    setTrendingPokemon(chosenPokemon);
  }

  return (
    <div className="PaginaInicial">
      <Header headerColor={headerColor} />
      {trendingPokemon &&
        <TrendingPokemon pokemon={trendingPokemon} />
      }
      <div className="SearchForm">
        <form>
          <div className="SearchForm--bar">
            <label>
              <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
            </label>
          </div>
        </form>
        <a>Pesquisar</a>
      </div>
      <section className="PokemonList">
        {pokemons.map((pokemon, key) => {
          return (
            <PokemonCard key={key} pokemon={pokemon} />
          );
        })}
      </section>
    </div>
  );
}