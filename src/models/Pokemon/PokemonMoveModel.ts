class PokemonMoveModel {
  id: number;
  level: number;
  machine: string;
  move: string;
  type: string;
  category: string;
  power: number;
  accuracy: number;
  description: string;

  constructor(
    id: number,
    level: number,
    machine: string,
    move: string,
    type: string,
    category: string,
    power: number,
    accuracy: number,
    description: string
  ) {
    this.id = id;
    this.level = level;
    this.machine = machine;
    this.move = move;
    this.type = type;
    this.category = category;
    this.power = power;
    this.accuracy = accuracy;
    this.description = description;
  }
}
export default PokemonMoveModel;
