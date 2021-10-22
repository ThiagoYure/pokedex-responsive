import React, { useEffect, useState } from "react";
import './Header.css';
import { Link } from 'react-router-dom';

export default ({ headerColor }) => {
    return (
        <header className={headerColor ? 'HeaderWithColor' : ''}>
            <Link to="/">
                <div className="Nav--logo">
                    <img src="https://logodownload.org/wp-content/uploads/2017/08/pokemon-logo.png" alt="Logo Pokemon" />
                </div>
            </Link>
            <div className="Nav--pokebol">
                <img src="https://www.purarteadesivos.com.br/wp-content/uploads/2017/04/Pok%C3%A9mon-go.png" alt="Pokebola" />
            </div>
        </header>
    );
}