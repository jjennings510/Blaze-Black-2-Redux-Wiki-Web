class AbilityModel {
  id: number;
  name: string;
  shortEffect: string;
  hiddenAbility: boolean;

  constructor(
    id: number,
    name: string,
    shortEffect: string,
    hiddenAbility: boolean
  ) {
    this.id = id;
    this.name = name;
    this.shortEffect = shortEffect;
    this.hiddenAbility = hiddenAbility;
  }
}

export default AbilityModel;
