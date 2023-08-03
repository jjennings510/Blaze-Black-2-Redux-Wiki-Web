class GlobalSearchModel {
  entityId: number;
  name: string;
  descriptor: string;

  constructor(entityId: number, name: string, descriptor: string) {
    this.entityId = entityId;
    this.name = name;
    this.descriptor = descriptor;
  }
}
export default GlobalSearchModel;
