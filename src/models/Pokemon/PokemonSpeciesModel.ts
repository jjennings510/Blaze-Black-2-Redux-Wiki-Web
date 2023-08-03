class PokemonSpeciesModel {
  id: number;
  name: string;
  number: number;
  hasGenderDifferences: boolean;
  genus: string;
  isMythical: boolean;
  isLegendary: boolean;

  constructor(
    id: number,
    name: string,
    number: number,
    hasGenderDifferences: boolean,
    genus: string,
    isMythical: boolean,
    isLegendary: boolean
  ) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.hasGenderDifferences = hasGenderDifferences;
    this.genus = genus;
    this.isMythical = isMythical;
    this.isLegendary = isLegendary;
  }
}
export default PokemonSpeciesModel;
