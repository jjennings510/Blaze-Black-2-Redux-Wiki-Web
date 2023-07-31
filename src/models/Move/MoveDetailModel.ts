class MoveDetailModel {
  id: number;
  name: string;
  power: number;
  accuracy: number;
  priority: number;
  pp: number;
  generationAdded: number;
  effectChance: number;
  category: string;
  effect: string;
  flavorText: string;
  machine?: string;
  type: string;

  constructor(
    id: number,
    name: string,
    power: number,
    accuracy: number,
    priority: number,
    pp: number,
    generationAdded: number,
    effectChance: number,
    category: string,
    effect: string,
    flavorText: string,
    machine: string,
    type: string
  ) {
    this.id = id;
    this.name = name;
    this.power = power;
    this.accuracy = accuracy;
    this.priority = priority;
    this.pp = pp;
    this.generationAdded = generationAdded;
    this.effectChance = effectChance;
    this.category = category;
    this.effect = effect;
    this.flavorText = flavorText;
    this.machine = machine;
    this.type = type;
  }
}

export default MoveDetailModel;
