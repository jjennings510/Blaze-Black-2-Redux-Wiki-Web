class PokemonModel {
    id: number;
    name: string;
    formName: string;
    number: number;

    constructor(id: number, name: string, formName: string, number: number) {
        this.id = id;
        this.name = name;
        this.formName = formName;
        this.number = number;
    }
}
export default PokemonModel;