import AbilityModel from "../Ability/AbilityModel";
import SpriteModel from "../SpriteModel";
import BaseStatsModel from "./BaseStatsModel";

class PokemonRowModel {
  sprite: SpriteModel;
  name: string;
  formName?: string;
  number: number;
  types: string[];
  abilities: AbilityModel[];
  baseStats?: BaseStatsModel;

  constructor(
    sprite: SpriteModel,
    name: string,
    formName: string,
    number: number,
    types: string[],
    abilities: AbilityModel[],
    baseStats: BaseStatsModel
  ) {
    this.sprite = sprite;
    this.name = name;
    this.formName = formName;
    this.number = number;
    this.types = types;
    this.abilities = abilities;
    this.baseStats = baseStats;
  }
}
 export default PokemonRowModel;