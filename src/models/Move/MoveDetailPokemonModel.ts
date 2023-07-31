import internal from "stream";
import SpriteModel from "../SpriteModel";
import BaseStatsModel from "../Pokemon/BaseStatsModel";

class MoveDetailPokemonModel {
  sprite: SpriteModel;
  name: string;
  formName: string;
  number: number;
  types: string[];
  machine: string;
  method: string;
  level: number;
  baseStats: BaseStatsModel;

  constructor(
    sprite: SpriteModel,
    name: string,
    formName: string,
    number: number,
    types: string[],
    machine: string,
    method: string,
    level: number,
    baseStats: BaseStatsModel
  ) {
    this.sprite = sprite;
    this.name = name;
    this.formName = formName;
    this.number = number;
    this.types = types;
    this.machine = machine;
    this.method = method;
    this.level = level;
    this.baseStats = baseStats;
  }
}

export default MoveDetailPokemonModel;
