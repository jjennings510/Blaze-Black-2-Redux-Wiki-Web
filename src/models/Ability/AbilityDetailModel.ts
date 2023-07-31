class AbilityDetailModel {
  id: number;
  identifier: string;
  name: string;
  flavorText: string;
  effect: string;
  shortEffect: string;
  generationAdded: number;

  constructor(
    id: number,
    identifier: string,
    name: string,
    flavorText: string,
    effect: string,
    shortEffect: string,
    generationAdded: number
  ) {
    this.id = id;
    this.identifier = identifier;
    this.name = name;
    this.flavorText = flavorText;
    this.effect = effect;
    this.shortEffect = shortEffect;
    this.generationAdded = generationAdded;
  }
}

export default AbilityDetailModel;
