import React, { useEffect, useState } from "react";
import poke_api from "./Poke-API";
import './PokemonCard.css';

export default ({ pokemon }) => {
    const [pokemonInfo, setPokemonInfo] = useState(null);

    useEffect(() => {
        let res = poke_api.getPokemonByID(pokemon.url)
        res.then((value) => {
            setPokemonInfo(value);
        })
    }, []);
    return (
        <div className="PokemonCard">
            {pokemonInfo &&
                <div className="Pokemon--infos">
                    Nº {Math.floor(pokemonInfo.id / 100) !== 0 ? pokemonInfo.id :
                        Math.floor(pokemonInfo.id / 10) !== 0 ? '0' + pokemonInfo.id :
                            '00' + pokemonInfo.id} {pokemonInfo.name}
                </div>
            }
        </div>
    );
}