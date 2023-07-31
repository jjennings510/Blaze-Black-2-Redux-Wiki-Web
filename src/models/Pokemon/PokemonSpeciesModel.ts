class PokemonSpeciesModel {
  name: string;
  number: number;
  hasGenderDifferences: boolean;
  genus: string;
  isMythical: boolean;
  isLegendary: boolean;

  constructor(
    name: string,
    number: number,
    hasGenderDifferences: boolean,
    genus: string,
    isMythical: boolean,
    isLegendary: boolean
  ) {
    this.name = name;
    this.number = number;
    this.hasGenderDifferences = hasGenderDifferences;
    this.genus = genus;
    this.isMythical = isMythical;
    this.isLegendary = isLegendary;
  }
}
export default PokemonSpeciesModel;
