import BaseStatsModel from "./BaseStatsModel";
import PokemonModel from "./PokemonModel";
import SpriteModel from "../SpriteModel";

class PokemonDetailModel {
  pokemon: PokemonModel;
  sprites: SpriteModel[];
  types: string[];
  abilities: string[];
  baseStats: BaseStatsModel;

  constructor(
    pokemon: PokemonModel,
    sprites: SpriteModel[],
    types: string[],
    abilities: string[],
    baseStats: BaseStatsModel
  ) {
    (this.pokemon = pokemon),
      (this.sprites = sprites),
      (this.types = types),
      (this.abilities = abilities),
      (this.baseStats = baseStats);
  }
}
export default PokemonDetailModel;
