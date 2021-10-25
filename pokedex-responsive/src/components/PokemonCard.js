import React, { useEffect, useState } from "react";
import poke_api from "./Poke-API";
import './PokemonCard.css';
import { Link } from 'react-router-dom';

export default ({ urlPokemon, pokeScale }) => {
    const [pokemonInfo, setPokemonInfo] = useState(null);

    useEffect(() => {
        let res = poke_api.getPokemonByID(urlPokemon)
        res.then((value) => {
            setPokemonInfo(value);
        })
    }, []);
    return (
        <div>
            {pokemonInfo &&
                <Link to={"/" + pokemonInfo.species.name}>
                    <div className="PokemonCard" style={{
                        borderWidth: 4,
                        borderStyle: "solid",
                        borderColor: "#e1fdff",
                        padding: 10,
                        display: "flex",
                        marginLeft: 30,
                        marginTop: 50,
                        flexDirection: "column",
                        borderRadius: 20,
                        transitionProperty: "all",
                        transitionDuration: 0.15,
                        transitionTimingFunction: "ease",
                        transitionDelay: 0,
                        width: 250,
                        height: 370,
                        cursor: "pointer",
                        alignItems: "center",
                        color: "#d4d4d4",
                        scale: ""+pokeScale
                    }}>
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
                </Link>
            }
        </div>
    );
}