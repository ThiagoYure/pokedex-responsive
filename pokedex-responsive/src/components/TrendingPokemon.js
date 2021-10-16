import react, { useState, useEffect } from "react";
import './TrendingPokemon.css';
import poke_api from './Poke-API';

export default ({ pokemon }) => {
    const [description, setDescription] = useState("");
    useEffect(() => {
        const loadData = async () => {
            let specie = await poke_api.getPokemonSpecie(pokemon.species.url);
            let englishDescription = specie.flavor_text_entries.filter(i => i.language.name === 'en');
            setDescription(englishDescription[0].flavor_text);
        }

        loadData();
    }, []);
    return (
        <div className="Banner">
            <div className="Banner--img">
                <img src={pokemon.sprites.other["official-artwork"].front_default} alt="Imagem do Pokemon recomendado" />
            </div>
            <div className="Banner-info">
                <div className="Banner--name">
                    Nº {Math.floor(pokemon.id / 100) !== 0 ? pokemon.id :
                        Math.floor(pokemon.id / 10) !== 0 ? '0' + pokemon.id :
                            '00' + pokemon.id} {pokemon.species.name}
                </div>
                <div className="Banner--description">
                    {description && description}
                </div>
            </div>
            <div className="Banner-types">
                {pokemon.types.map((data, key) => {
                    return (
                        <div key={key} className="Banner-type">
                            {data.type.name}
                        </div>
                    );
                })}
            </div>
            <div className="Banner--buttons">
                <a className="buttonVerMais">+ Informações</a>
            </div>
        </div>
    );
}