import React, { useState, useEffect } from "react";
import './Pokemon.css';
import { useParams } from "react-router-dom";
import poke_api from "./Poke-API";

export default () => {
    const [pokemon, setPokemon] = useState(null);

    let { name } = useParams();

    useEffect(async () => {
        let pokemon = await poke_api.getPokemonByID(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        setPokemon(pokemon);
    }, []);

    return (
        <div>
            {pokemon &&
                <h2>{pokemon.name}</h2>
            }
        </div>
    );
}