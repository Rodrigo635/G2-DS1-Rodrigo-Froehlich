import { Equipe, EquipeModel } from '../models/equipeModel';

class EquipeService {
  private equipeModel: EquipeModel;

  constructor() {
    this.equipeModel = new EquipeModel();
  }

  async createEquipe(nome: string): Promise<Equipe> {
    const equipeData = { nome };
    return this.equipeModel.create(equipeData);
  }

  async getAllEquipes(): Promise<Equipe[]> {
    return this.equipeModel.findAll();
  }

  async deleteEquipe(id: number): Promise<void> {
    return this.equipeModel.delete(id);
  }
}

export default new EquipeService();
