import './App.css';
import { AppNavbar } from './layouts/NavbarAndFooter/Navbar';
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from './layouts/HomePage/HomePage';
import { PokedexPage } from './layouts/Pokedex/PokemonPage/PokedexPage';
import { PokemonDetail } from './layouts/Pokedex/PokemonPage/PokemonDetail';
import { AbilityDetail } from './layouts/Pokedex/AbilityPage/AbilityDetail';
import { AbilityDexPage } from './layouts/Pokedex/AbilityPage/AbilityDexPage';
import { MoveDexPage } from './layouts/Pokedex/MovePage/MoveDexPage';
import { MoveDetail } from './layouts/Pokedex/MovePage/MoveDetail';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />}/>
          <Route path="/pokemon" element={<PokedexPage />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonDetail />} />
          <Route path="/abilities" element={<AbilityDexPage />} />
          <Route path="/abilities/:abilityId" element={<AbilityDetail />} />
          <Route path="/moves" element={<MoveDexPage />} />
          <Route path="/moves/:moveId" element={<MoveDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
