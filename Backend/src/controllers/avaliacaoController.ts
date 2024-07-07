import { Request, Response } from 'express';
import avaliacaoService from '../services/avaliacaoService';
import Joi from 'joi';

const avaliacaoSchema = Joi.object({
  avaliador_id: Joi.number().required(),
  equipe_id: Joi.number().required(),
  notas: Joi.object().required(),
});

class AvaliacaoController {
  async createAvaliacao(req: Request, res: Response): Promise<Response> {
    const { error, value } = avaliacaoSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const avaliacao = await avaliacaoService.createAvaliacao(value.avaliador_id, value.equipe_id, value.notas);
      return res.status(201).json(avaliacao);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao cadastrar avaliação!' });
    }
  }

  async getAllAvaliacoes(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacoes = await avaliacaoService.getAllAvaliacoes();
      return res.status(200).json(avaliacoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar avaliações!' });
    }
  }

  async getAvaliacoesByEquipe(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const avaliacoes = await avaliacaoService.getAvaliacoesByEquipe(Number(id));
      return res.status(200).json(avaliacoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar avaliações da equipe!' });
    }
  }

  async getAvaliacoesByAvaliador(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const avaliacoes = await avaliacaoService.getAvaliacoesByAvaliador(Number(id));
      return res.status(200).json(avaliacoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar avaliações do avaliador!' });
    }
  }
}

export default new AvaliacaoController();
