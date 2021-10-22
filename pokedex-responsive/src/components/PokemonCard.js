import React, { useEffect, useState } from "react";
import poke_api from "./Poke-API";
import './PokemonCard.css';
import { Link } from 'react-router-dom';

export default ({ pokemon }) => {
    const [pokemonInfo, setPokemonInfo] = useState(null);

    useEffect(() => {
        let res = poke_api.getPokemonByID(pokemon.url)
        res.then((value) => {
            setPokemonInfo(value);
        })
    }, []);
    return (
        <Link to={"/"+pokemon.name}>
            <div>
                {pokemonInfo &&
                    <div className="PokemonCard">
                        <div className="Pokemon--img">
                            <div className="Pokemon--number">
                                <strong>Nº {Math.floor(pokemonInfo.id / 100) !== 0 ? pokemonInfo.id :
                                    Math.floor(pokemonInfo.id / 10) !== 0 ? '0' + pokemonInfo.id :
                                        '00' + pokemonInfo.id}</strong>
                            </div>
                            <img src={pokemonInfo.sprites.other["official-artwork"].front_default} alt="Imagem do Pokemon recomendado" />
                        </div>
                        <div className="Pokemon--name">
                            <strong>{pokemonInfo.species.name}</strong>
                        </div>
                        <div className="Pokemon--types">
                            {pokemonInfo.types.map((data, key) => {
                                return (
                                    <div key={key} className={data.type.name}>
                                        {data.type.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                }
            </div>
        </Link>
    );
}