import BaseStatsModel from "./BaseStatsModel";
import PokemonModel from "./PokemonModel";
import SpriteModel from "../SpriteModel";

class PokemonDetailModel {
  pokemon: PokemonModel;
  types: string[];

  constructor(pokemon: PokemonModel, types: string[]) {
    (this.pokemon = pokemon), (this.types = types);
  }
}
export default PokemonDetailModel;
