import { Avaliacao, AvaliacaoModel } from '../models/avaliacaoModel';

class AvaliacaoService {
  private avaliacaoModel: AvaliacaoModel;

  constructor() {
    this.avaliacaoModel = new AvaliacaoModel();
  }

  async createAvaliacao(avaliador_id: number, equipe_id: number, notas: object): Promise<Avaliacao> {
    const avaliacaoData = { avaliador_id, equipe_id, notas };
    return this.avaliacaoModel.create(avaliacaoData);
  }

  async getAllAvaliacoes(): Promise<Avaliacao[]> {
    return this.avaliacaoModel.findAll();
  }

  async getAvaliacoesByEquipe(equipe_id: number): Promise<Avaliacao[]> {
    return this.avaliacaoModel.findByEquipe(equipe_id);
  }

  async getAvaliacoesByAvaliador(avaliador_id: number): Promise<Avaliacao[]> {
    return this.avaliacaoModel.findByAvaliador(avaliador_id);
  }
}

export default new AvaliacaoService();
