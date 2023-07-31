class MoveModel {
  id: number;
  name: string;
  effect: string;
  type: string;
  category: string;
  power: number;
  accuracy: number;

  constructor(
    id: number,
    name: string,
    effect: string,
    type: string,
    category: string,
    power: number,
    accuracy: number
  ) {
    this.id = id;
    this.name = name;
    this.effect = effect;
    this.type = type;
    this.category = category;
    this.power = power;
    this.accuracy = accuracy;
  }
}
export default MoveModel;
