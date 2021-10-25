import React, { useState, useEffect } from "react";
import './Pokemon.css';
import { useParams } from "react-router-dom";
import poke_api from "./Poke-API";
import PokemonCard from "./PokemonCard";

export default () => {
    const [pokemon, setPokemon] = useState(null);
    const [pokemonSpecie, setPokemonSpecie] = useState(null);
    const [description, setDescription] = useState();
    const [evolutions, setEvolutions] = useState([]);
    const [rootPokemon, setRootPokemon] = useState(null);
    const [pokeScale, setPokeScale] = useState(1);

    let { name } = useParams();

    useEffect(async () => {
        let scale = 1;

        let pokemon = await poke_api.getPokemonByID(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        setPokemon(pokemon);

        let specie = await poke_api.getPokemonSpecie(pokemon.species.url);
        let englishDescription = await specie.flavor_text_entries.filter(i => i.language.name === 'en');
        setDescription(englishDescription[0].flavor_text);
        setPokemonSpecie(specie);

        let evolutionChain = await poke_api.getPokemonEvolutionChain(specie.evolution_chain.url);
        let rootPokemon = await poke_api.getPokemonByID(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.chain.species.name}/`);
        let evolution = [];
        let evolution2 = [];
        let evolutions = [];
        setRootPokemon(rootPokemon);
        evolutionChain.chain.evolves_to.forEach(async element => {
            let pokemonChain = await poke_api.getPokemonByID(`https://pokeapi.co/api/v2/pokemon/${element.species.name}/`);
            evolution.push(pokemonChain);
            const result = await element.evolves_to.forEach(async e => {
                let pokemonChain2 = await poke_api.getPokemonByID(`https://pokeapi.co/api/v2/pokemon/${e.species.name}/`);
                evolution2.push(pokemonChain2);
                scale = scale - 0.2;
                setPokeScale(scale);
                console.log(scale);
            });
            scale = scale - 0.2;
            setPokeScale(scale);
            console.log(scale);
        });
        evolutions.push(evolution);
        evolutions.push(evolution2);
        setEvolutions(evolutions);
        console.log(evolutions);
    }, []);

    return (
        <div>
            {pokemon && pokemonSpecie && rootPokemon &&
                <div className="PokemonBanner">
                    <div className="PokemonBanner--title">
                        <div className="PokemonBanner--number">
                            <strong>Nº {Math.floor(pokemon.id / 100) !== 0 ? pokemon.id :
                                Math.floor(pokemon.id / 10) !== 0 ? '0' + pokemon.id :
                                    '00' + pokemon.id}</strong>
                        </div>
                        <div className="PokemonBanner--name">
                            <strong>{pokemon.species.name}</strong>
                        </div>
                    </div>
                    <div className="PokemonBanner--main">
                        <div className="PokemonBanner--img">
                            <img src={pokemon.sprites.other["official-artwork"].front_default} alt="Imagem do Pokemon recomendado" />
                        </div>
                        <div className="PokemonBanner--infos">
                            <div className="PokemonBanner--description">
                                {description && description}
                            </div>
                            <div className="PokemonBanner--stats">
                                <div><strong>Height : </strong>{pokemon.height / 10} m</div>
                                <div><strong>Weight : </strong>{pokemon.weight / 10} kg</div>
                            </div>
                            <div className="PokemonBanner--secondary">
                                <div className="title"><strong>Abilities :</strong></div>
                                <div className="PokemonBanner--abilities">
                                    {pokemon.abilities.map((data, key) => {
                                        return (
                                            <div key={key}>
                                                {data.ability.name}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="title"><strong>Types :</strong></div>
                                <div className="PokemonBanner--types">
                                    {pokemon.types.map((data, key) => {
                                        return (
                                            <div key={key} className={data.type.name}>
                                                {data.type.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="PokemonBanner--evolutions">
                        <div className="title"><strong>Evoluções :</strong></div>
                        <div className="cards">
                            <div className="Evolutions--root">
                                <PokemonCard urlPokemon={`https://pokeapi.co/api/v2/pokemon/${rootPokemon.species.name}/`} pokeScale={pokeScale} />
                            </div>
                            {evolutions[0] &&
                                <div className="sequence">
                                    {evolutions[0].length > 0 ?
                                        <div className="EvolutionDirection">►</div> :
                                        <div></div>
                                    }
                                    <div className="Evolutions--secondary">
                                        {
                                            evolutions[0].map((evolution, key) => {
                                                return (
                                                    <PokemonCard key={key} urlPokemon={`https://pokeapi.co/api/v2/pokemon/${evolution.species.name}/`} pokeScale={pokeScale} />
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            }
                            {evolutions[1] &&
                                <div className="sequence">
                                    {evolutions[1].length > 0 ?
                                        <div className="EvolutionDirection">►</div> :
                                        <div></div>
                                    }
                                    <div className="Evolutions--ultimate">
                                        {evolutions[1].map((evolution, key) => {
                                            return (
                                                <PokemonCard key={key} urlPokemon={`https://pokeapi.co/api/v2/pokemon/${evolution.species.name}/`} pokeScale={pokeScale} />
                                            );
                                        })}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}