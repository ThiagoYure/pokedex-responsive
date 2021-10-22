import './App.css';
import Header from './components/Header';
import react, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Pokemon from './components/Pokemon';


//A7D3A6 CFE795 F7EF81 D4C685 https://pokeapi.co/api/v2/pokemon/?limit=898

export default () => {
  const [headerColor, setHeaderColor] = useState(false);

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

  return (
    <Router>
      <div className="PaginaInicial">
        <Header headerColor={headerColor} />
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/:name">
            <Pokemon/>
          </Route>
        </Switch>
        <section className="Footer">
          <div>Desenvolvido por Thiago Yure</div>
          <div>Todos os direitos de imagem reservados para <strong>The Pokemon Company</strong></div>
          <div>2021</div>
        </section>
      </div>
    </Router>
  );
}