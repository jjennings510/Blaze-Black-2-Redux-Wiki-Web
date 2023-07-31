class SpriteModel {
    id: number;
    name: string;
    spriteType: string;
    image: string;
    
    constructor(id: number, name: string, spriteType: string, image: string) {
        this.id = id;
        this.name = name;
        this.spriteType = spriteType;
        this.image = image;
    }
}
export default SpriteModel;